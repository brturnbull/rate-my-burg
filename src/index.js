const {GraphQLServer} = require('graphql-yoga');
const {prisma} = require('./generated/prisma-client');
const Query = require('./resolvers/Query.js');
const Burger = require('./resolvers/Burger.js');
const Mutation = require('./resolvers/Mutation.js');
const User = require('./resolvers/User.js');

const resolvers = {
    User,
    Query,
    Mutation,
    Burger,
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