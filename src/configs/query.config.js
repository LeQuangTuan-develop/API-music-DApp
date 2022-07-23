const orderType = {
    ASC: 'ASC',
    DESC: 'DESC',
    ORDER_TYPE_DEFAULT: 'DESC',
}

const pagination = {
    PAGE_DEFAULT: 1,
    SIZE_DEFAULT: 8,
    SIZE_MAX: 50,
}

const filter = {
    GREATER_THAN_EQUAL: '_gte_',
    LESS_THAN_EQUAL: '_lte_',
    GREATER_THAN: '_gt_',
    LESS_THAN: '_lt_',
    LIKE: '_like_',
    NOT_EQUAL: '_ne_',
    IN: '_in_',
}

module.exports = {
    orderType,
    pagination,
    filter,
}
