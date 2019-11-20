const {GraphQLServer} = require('graphql-yoga');
const {prisma} = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Burger = require('./resolvers/Burger');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote')

const resolvers = {
    User,
    Query,
    Mutation,
    Burger,
    Subscription,
    Vote,
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        }
    }
});

server.start(() => console.log(`Server is running on port 4000`));