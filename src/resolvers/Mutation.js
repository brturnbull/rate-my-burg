const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

function post(root, args, context) {
    const userId = getUserId(context);
    return context.prisma.createBurger({
        name: args.name,
        restaurant: args.restaurant,
        description: args.description,
        rating: args.rating,
        postedBy: { connect: { id: userId } },
    })
}

function update(root, args, context) {
    return context.prisma.updateBurger({
        data: {
            name: args.name,
            restaurant: args.restaurant,
            description: args.description,
            rating: args.rating,
        },
        where: {
            id: args.id
        }
    })
}

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({ ...args, password });

    const token = jwt.sign({userId: user.id}, APP_SECRET);

    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user({email: args.email});
    if (!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({userId: user.id}, APP_SECRET);

    return {
        token,
        user,
    }
}

async function voteForBurger(parent, args, context, info) {
    const userId = getUserId(context);

    const burgerVoteExists = await context.prisma.$exists.vote({
        // comes from authorization bearer in the header
        user: { id: userId },
        // sent in the info
        burger: { id: args.id },
    });

    if (burgerVoteExists) {
        throw new Error('You\'ve already voted for this burger! Sorry, you can\'t vote twice');
    }

    return context.prisma.createVote({
        user: { connect: { id: userId } },
        burger: { connect: { id: args.id } },
    });

}

module.exports = {
    signup,
    login,
    post,
    update,
    voteForBurger
};