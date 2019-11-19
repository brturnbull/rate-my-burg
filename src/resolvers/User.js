function burgers(parent, args, context) {
    return context.prisma.user({id: parent.id}).burgers()
}

module.exports = {
    burgers
};