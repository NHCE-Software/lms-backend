import { Lead, LeadTC } from '../models/lead';
import { User } from '../models/user';

/**
 * Add Leads to Mongo
 * Get all the values from record and split them into two different sets
 * One with original data and the other with duplicates
 * Push the original
 * Update the rest -> Add loadedby array
 */

const addLeads = {
    name: 'addLeads',
    type: 'JSON',
    args: { record: '[JSON]' },

    resolve: async ({ args, context: { user } }) => {
        try {
            let leads = args.record;
            // leads.map(async (lead) => {
            //     const leadData = await Lead.findOne({
            //         $or: [
            //             { email: lead.email },
            //             { phonenumber: lead.phonenumber },
            //         ],
            //     });

            //     if (leadData) {
            //         console.log('I am here');
            //         console.log(leadData);
            //         leadData.loadedby.indexOf(user._id.toString()) === -1
            //             ? leadData.loadedby.push(user._id)
            //             : console.log('f');
            //         leadData.source.indexOf(lead.source) === -1
            //             ? leadData.source.push(lead.source)
            //             : console.log('j');
            //         leadData.course.indexOf(lead.course) === -1
            //             ? leadData.course.push(lead.course)
            //             : console.log('k');
            //         console.log(leadData);
            //         leadData.save();
            //     } else {
            //         console.log('I am there');
            //         lead.loadedby = [user._id];
            //         let newLead = new Lead({...lead})
            //         await newLead.save()

            //     }
            // });
            for(let i = 0;i<leads.length;i++){
                const leadData = await Lead.findOne({
                            $or: [
                                { email: leads[i].email },
                                { phonenumber: leads[i].phonenumber },
                            ],
                        });
        
                        if (leadData) {
                            console.log('I am here');
                            console.log(leadData);
                            leadData.loadedby.indexOf(user._id.toString()) === -1
                                ? leadData.loadedby.push(user._id)
                                : console.log('f');
                            leadData.source.indexOf(leads[i].source) === -1
                                ? leadData.source.push(leads[i].source)
                                : console.log('j');
                            leadData.course.indexOf(leads[i].course) === -1
                                ? leadData.course.push(leads[i].course)
                                : console.log('k');
                            console.log(leadData);
                            leadData.save();
                        } else {
                            console.log('I am there');
                            leads[i].loadedby = [user._id];
                            let newLead = new Lead({...leads[i]})
                            await newLead.save()
        
                        }

            }
        } catch (error) {
            throw new Error(error);
        }
    },
};

// Add Calls to Lead
const addCall = {
    name: 'addCall',
    type: 'JSON',
    args: { record: 'JSON' },
    resolve: async ({ args, context: { user } }) => {
        try {
            let calldata = args.record;

            const call = await Lead.findOneAndUpdate(
                { _id: calldata.leadid },
                {
                    $push: {
                        calls: {
                            remark: calldata.remark,
                            updatedby: user._id,
                            updatedbyname: user.name,
                            followup: calldata.followup,
                        },
                    },
                }
            );
            return {
                message: 'success',
            };
        } catch (error) {}
    },
};

const getLeads = {
    name: 'getLeads',
    type: '[Lead]',
    args: { record: 'JSON' },
    resolve: async ({ args, context: { user } }) => {
        try {
            if (user.role === 'admin') {
                console.log('heww');
                const leads = await Lead.find();
                return leads;
            } else if (user.role === 'admin' && args.record.callerid) {
                const leads = await Lead.find({ _id: args.record.callerid });
                return leads;
            } else {
                const leads = await Lead.find({
                    loadedby: { $elemMatch: { $eq: user._id } },
                });
                return leads;
            }
        } catch (error) {}
    },
};

module.exports = {
    addLeads,
    addCall,
    getLeads,
};
