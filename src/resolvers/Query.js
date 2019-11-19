const feed = () => {
    return context.prisma.burgers();
};

module.exports = {
    feed
};