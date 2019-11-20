function burger(parent, args, context) {
    return context.prisma.vote({ id: parent.id }).burger()
}

function user(parent, args, context) {
    return context.prisma.vote({ id: parent.id }).user()
}

module.exports = {
    burger,
    user
};