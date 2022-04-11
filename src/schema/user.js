import { authMiddleware } from '../middleware/authMiddleware';
import { User, UserTC } from '../models/user';
import { hello, signIn } from '../resolvers/user';

UserTC.addResolver(hello);
UserTC.addResolver(signIn);

const UserQuery = {
    userById: UserTC.getResolver('findById'),
    userByIds: UserTC.getResolver('findByIds'),
    userOne: UserTC.getResolver('findOne'),
    userMany: UserTC.getResolver('findMany'),
    userCount: UserTC.getResolver('count'),
    userConnection: UserTC.getResolver('connection'),
    userPagination: UserTC.getResolver('pagination'),
    hello: UserTC.getResolver('hello', [authMiddleware.isAdmin]),
};

const UserMutation = {
    signIn: UserTC.getResolver('signIn', [authMiddleware.isGuest]),
    userCreateOne: UserTC.getResolver('createOne', [authMiddleware.isAdmin]),
    userCreateMany: UserTC.getResolver('createMany', [authMiddleware.isAdmin]),
    userUpdateById: UserTC.getResolver('updateById', [authMiddleware.isAdmin]),
    userUpdateOne: UserTC.getResolver('updateOne', [authMiddleware.isAdmin]),
    userUpdateMany: UserTC.getResolver('updateMany', [authMiddleware.isAdmin]),
    userRemoveById: UserTC.getResolver('removeById', [authMiddleware.isAdmin]),
    userRemoveOne: UserTC.getResolver('removeOne', [authMiddleware.isAdmin]),
    userRemoveMany: UserTC.getResolver('removeMany', [authMiddleware.isAdmin]),
};

export { UserQuery, UserMutation };
