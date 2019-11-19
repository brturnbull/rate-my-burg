const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

// a js object that mirrors the query, mutation, and subscription types and their fields from the app schema. Each field in the app schema is represented by a function with the same name in that object.
const resolvers = {
    Query: {
        info: () => `this is the api of the Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.prisma.burgers()
        },
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createBurger({
                name: args.name,
                description: args.description
            })
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma }
});

server.start(() => console.log(`Server is running on port 4000`));