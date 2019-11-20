// context.prisma exposes a $subscribe property which proxies the subsciptions from the Prisma API
// Prisma also takes care of all the complexities

function newBurgerSubscribe(parent, arg, context, info) {
    return context.prisma.$subscribe.burger({ mutation_in: ['CREATED',]}).node()
}

function updateBurgerSubscribe(parent, arg, context, info) {
    return context.prisma.$subscribe.burger({ mutation_in: ['UPDATED',]}).node()
}

function newVoteSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node()
}

// a subscription resolver is provided as the value for a subscribe field inside a plain JS object
const newBurger = {
  subscribe: newBurgerSubscribe,
  resolve: payload => {
      return payload
  }
};

const updatedBurger = {
    subscribe: updateBurgerSubscribe,
    resolve: payload => {
        return payload
    }
};

const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
        return payload
    },
};

module.exports = {
    newBurger,
    updatedBurger,
    newVote
};