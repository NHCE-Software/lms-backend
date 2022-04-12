import { authMiddleware } from '../middleware/authMiddleware';
import { LeadTC } from '../models/lead';
import { hello, signIn } from '../resolvers/user';

LeadTC.addResolver(hello);
LeadTC.addResolver(signIn);

const LeadQuery = {
    leadById: LeadTC.getResolver('findById'),
    leadByIds: LeadTC.getResolver('findByIds'),
    leadOne: LeadTC.getResolver('findOne'),
    leadMany: LeadTC.getResolver('findMany'),
    leadCount: LeadTC.getResolver('count'),
    leadConnection: LeadTC.getResolver('connection'),
    leadPagination: LeadTC.getResolver('pagination'),
    hello: LeadTC.getResolver('hello', [authMiddleware.isAdmin]),
};

const LeadMutation = {
    
    leadCreateOne: LeadTC.getResolver('createOne'),
    leadCreateMany: LeadTC.getResolver('createMany', [authMiddleware.isAdmin]),
    leadUpdateById: LeadTC.getResolver('updateById', [authMiddleware.isAdmin]),
    leadUpdateOne: LeadTC.getResolver('updateOne', [authMiddleware.isAdmin]),
    leadUpdateMany: LeadTC.getResolver('updateMany', [authMiddleware.isAdmin]),
    leadRemoveById: LeadTC.getResolver('removeById', [authMiddleware.isAdmin]),
    leadRemoveOne: LeadTC.getResolver('removeOne', [authMiddleware.isAdmin]),
    leadRemoveMany: LeadTC.getResolver('removeMany', [authMiddleware.isAdmin]),
};

export { LeadQuery, LeadMutation };
