import { Lead, LeadTC } from '../models/lead';
import { User } from '../models/user';

const addLeads = {
    name: 'addLeads',
    type: 'JSON',
    args: {record:"[JSON]"},
    
    resolve: async ({
        args
    }) => {
        try {
           

            let leads = args.record
            leads.map()
        } catch (error) {
            throw new Error(error);
        }
    },
};
module.exports={
    addLeads
}