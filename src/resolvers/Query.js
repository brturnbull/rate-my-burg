async function feed(parent, args, context, info) {
    const where = args.filter ? {
        OR: [
            {description_contains: args.filter},
            {name_contains: args.filter},
            {restaurant_contains: args.filter},
        ],
    } : {};
    const burgers = await context.prisma.burgers({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy
    });
    return burgers
}

module.exports = {
    feed
};