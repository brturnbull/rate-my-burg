const feed = (parent, args, context) => {
    return context.prisma.burgers();
};

module.exports = {
    feed
};