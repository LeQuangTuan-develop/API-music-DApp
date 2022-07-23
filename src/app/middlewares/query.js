const { pagination, filter, orderType } = require('../../configs/query')

let page = pagination.PAGE_DEFAULT
let size = pagination.SIZE_DEFAULT
let sizeMax = pagination.SIZE_MAX

const handlePaginateQuery = (req) => {
    if (req.query._page) {
        if (Number(req.query._page) > 0) {
            page = Number(req.query._page)
        }
    }

    if (req.query._size) {
        if (Number(req.query._size) > 0 && Number(req.query._size) <= sizeMax) {
            size = Number(req.query._size)
        }

        if (Number(req.query._size) > sizeMax) {
            size = sizeMax
        }
    }

    req.query._size = size
    req.query._page = page
}

const handleSortQuery = (req) => {
    if (req.query._sort) {
        let fieldArr = req.query._sort.split(',')
        let orderTypeArray = []
        let orderByArray = []

        if (req.query._order) {
            let orderTypeArr = req.query._order.split(',')

            orderTypeArray = orderTypeArr.map((type) => {
                type = type.toUpperCase()
                if (type !== orderType.ASC && type !== orderType.DESC) {
                    return orderType.ORDER_TYPE_DEFAULT
                }
                return type
            })
        }

        orderByArray = fieldArr.map((field, index) => {
            let orderType = 'desc'
            if (orderTypeArray[index]) {
                orderType = orderTypeArray[index]
            }
            return [field, orderType]
        })

        req.query.orderBy = orderByArray
    }
}

const handleConditionQuery = (req) => {
    let query = req.query
    let conditions = []

    Object.entries(query).forEach((item) => {
        let field = item[0].toLowerCase()
        let value = item[1]
        if (
            field !== '_page' &&
            field !== '_size' &&
            field !== '_sort' &&
            field !== '_order' &&
            field !== '_q'
        ) {
            if (/_gte_/i.test(field)) {
                field = field.replace(filter.GREATER_THAN_EQUAL, '')
                conditions.push({
                    field,
                    value,
                    operator: '>=',
                })
                return
            }
            if (/_lte_/i.test(field)) {
                field = field.replace(filter.LESS_THAN_EQUAL, '')
                conditions.push({
                    field,
                    value,
                    operator: '<=',
                })
                return
            }
            if (/_gt_/i.test(field)) {
                field = field.replace(filter.GREATER_THAN, '')
                conditions.push({
                    field,
                    value,
                    operator: '>',
                })
                return
            }
            if (/_lt_/i.test(field)) {
                field = field.replace(filter.LESS_THAN, '')
                conditions.push({
                    field,
                    value,
                    operator: '<',
                })
                return
            }
            if (/_like_/i.test(field)) {
                field = field.replace(filter.LIKE, '')
                conditions.push({
                    field,
                    value,
                    operator: '<=>',
                })
                return
            }
            if (/_ne_/i.test(field)) {
                field = field.replace(filter.NOT_EQUAL, '')
                conditions.push({
                    field,
                    value,
                    operator: '!=',
                })
                return
            }
            if (/_in_/i.test(field)) {
                field = field.replace(filter.IN, '')
                conditions.push({
                    field,
                    value,
                    operator: '{in}',
                })
                return
            }

            conditions.push({
                field,
                value,
                operator: '=',
            })
        }
    })

    req.query.conditions = conditions
}

const handleQuery = (req, res, next) => {
    handleConditionQuery(req)
    handlePaginateQuery(req)
    handleSortQuery(req)

    return next()
}

module.exports = {
    handleQuery,
}
