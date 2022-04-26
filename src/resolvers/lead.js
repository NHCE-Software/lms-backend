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

    resolve: async ({ args }) => {
        try {
            let leads = args.record;
            leads.map();
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
            return{
                message:"success"
            }
        } catch (error) {}
    },
};

const getLeads  = {
    name: 'getLeads',
    type: '[Lead]',
    args: { record: 'JSON' },
    resolve: async ({ context: { user } }) => {
        try {
            

            if (user.role==="admin") {
                console.log("heww")
                const leads = await Lead.find();
                return leads;
            } else {
                
                const leads = await Lead.find({loadedby:{$elemMatch:{$eq:user._id}}});
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
