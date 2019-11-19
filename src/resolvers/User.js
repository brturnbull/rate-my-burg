function burgers(parent, args, context) {
    return context.prisma.user({if: parent.id}).burgers()
}

module.exports = {
    burgers
};