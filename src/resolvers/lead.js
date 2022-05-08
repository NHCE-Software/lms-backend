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

            for (let i = 0; i < leads.length; i++) {
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

                    leadData.loadedbyname.indexOf(user.name) === -1
                        ? leadData.loadedbyname.push(user.name)
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
                    leads[i].loadedbyname = [user.name];
                    let newLead = new Lead({ ...leads[i] });
                    await newLead.save();
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    },
};

const addOneLead = {
    name: 'addOneLead',
    type: 'JSON',
    args: { record: 'JSON' },

    resolve: async ({ args, context: { user } }) => {
        try {
            let onelead = args.record;
            const leadData = await Lead.findOne({
                $or: [
                    { email: onelead.email },
                    { phonenumber: onelead.phonenumber },
                ],
            });

            if (leadData) {
                // Send count to analytics
                console.log('I am here');
                console.log(leadData);
                leadData.loadedby.indexOf(user._id.toString()) === -1
                    ? leadData.loadedby.push(user._id)
                    : console.log('f');

                leadData.loadedbyname.indexOf(user.name) === -1
                    ? leadData.loadedbyname.push(user.name)
                    : console.log('f');

                for (let i = 0; i < onelead.course.length; i++) {
                    leadData.course.indexOf(onelead.course[i]) === -1
                        ? leadData.course.push(onelead.course[i])
                        : console.log('k');
                }
                leadData.source.indexOf(onelead.source) === -1
                    ? leadData.source.push(onelead.source)
                    : console.log('j');

                // Add First Call Data
                leadData.calls.push({
                    remark: onelead.remark,
                    updatedby: user._id,
                    updatedbyname: user.name,
                    followup: onelead.followup,
                })
                leadData.phonenumber2 = onelead.phonenumber2;
                leadData.admcateg = onelead.admcateg;
                leadData.address = onelead.address;
                leadData.reference = onelead.reference;
                leadData.nameofboard = onelead.nameofboard;
                leadData.regnum12 = onelead.regnum12;

                console.log(leadData);
                leadData.save();
                return { message: 'success',id:leadData._id };
            } else {
                console.log('I am there');
                onelead.loadedby = [user._id];
                onelead.calls = [
                    {
                        remark: onelead.remark,
                        updatedby: user._id,
                        updatedbyname: user.name,
                        followup: onelead.followup,
                    },
                ];
                onelead.loadedbyname = [user.name];
                delete onelead.remark;
                delete onelead.followup;
                let newLead = new Lead({ ...onelead });

                const res = await newLead.save();
                console.log(res);
                return { message: 'success', id: res._id };
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
                const leads = await Lead.find({
                    loadedby: { $elemMatch: { $eq: args.record.callerid } },
                });
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
    addOneLead,
};
