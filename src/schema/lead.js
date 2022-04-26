import { authMiddleware } from '../middleware/authMiddleware';
import { LeadTC } from '../models/lead';
import { addLeads, addCall } from '../resolvers/lead';

LeadTC.addResolver(addLeads);
LeadTC.addResolver(addCall);

const LeadQuery = {
    leadById: LeadTC.getResolver('findById'),
    leadByIds: LeadTC.getResolver('findByIds'),
    leadOne: LeadTC.getResolver('findOne'),
    leadMany: LeadTC.getResolver('findMany'),
    leadCount: LeadTC.getResolver('count'),
    leadConnection: LeadTC.getResolver('connection'),
    leadPagination: LeadTC.getResolver('pagination'),
    
};

const LeadMutation = {
    addleads: LeadTC.getResolver("addLeads"),
    addCall: LeadTC.getResolver("addCall"),
    leadCreateOne: LeadTC.getResolver('createOne'),
    leadCreateMany: LeadTC.getResolver('createMany'),
    leadUpdateById: LeadTC.getResolver('updateById', [authMiddleware.isAdmin]),
    leadUpdateOne: LeadTC.getResolver('updateOne', [authMiddleware.isAdmin]),
    leadUpdateMany: LeadTC.getResolver('updateMany', [authMiddleware.isAdmin]),
    leadRemoveById: LeadTC.getResolver('removeById', [authMiddleware.isAdmin]),
    leadRemoveOne: LeadTC.getResolver('removeOne', [authMiddleware.isAdmin]), // Cann
    leadRemoveMany: LeadTC.getResolver('removeMany', [authMiddleware.isAdmin]),
};

export { LeadQuery, LeadMutation };
