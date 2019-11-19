function postedBy(parent, args, context) {
    return context.prisma.burger({ id: parent.id }).postedBy()
}

module.exports = {
    postedBy,
};