const { Op } = require('sequelize')
const { pagination } = require('../../configs/query.config')

class BaseRepository {
    constructor(model) {
        this.model = model
        this.query = {
            where: {},
        }
    }

    order(orderBy) {
        this.query.order = orderBy
    }

    limit(limit) {
        this.query.limit = limit
    }

    take(take) {
        this.query.limit = this.query.limit || pagination.SIZE_DEFAULT
        this.query.offset = (take - 1) * this.query.limit
    }

    handleConditions(conditions) {
        conditions.forEach((con) => {
            if (Array.isArray(con.value)) {
                con.value.forEach((value) => {
                    this.query.where[Op.or].push({
                        [con.field]: value,
                    })
                })
            } else {
                if (con.operator === '=') {
                    this.query.where[con.field] = con.value
                    return
                }
                if (con.operator === '>=') {
                    this.query.where[con.field] = {
                        [Op.gte]: con.value,
                    }
                    return
                }
                if (con.operator === '<=') {
                    this.query.where[con.field] = {
                        [Op.lte]: con.value,
                    }
                    return
                }
                if (con.operator === '>') {
                    this.query.where[con.field] = {
                        [Op.gt]: con.value,
                    }
                    return
                }
                if (con.operator === '<') {
                    this.query.where[con.field] = {
                        [Op.lt]: con.value,
                    }
                    return
                }
                if (con.operator === '<=>') {
                    this.query.where[con.field] = {
                        [Op.like]: `%${con.value}%`,
                    }
                    return
                }
                if (con.operator === '!=') {
                    this.query.where[con.field] = {
                        [Op.ne]: con.value,
                    }
                    return
                }
                if (con.operator === '{in}') {
                    this.query.where[con.field] = {
                        [Op.in]: con.value.split(','),
                    }
                    return
                }
            }
        })
    }

    handleFieldAllow(conditions, orderBy, fieldAllow) {
        let conditionsAllow = []
        let orderByAllow = []
        if (fieldAllow.length) {
            conditionsAllow = conditions.filter((condition) => {
                for (const field of fieldAllow) {
                    if (condition.field === field) return true
                }
                return false
            })

            orderByAllow = orderBy.filter((condition) => {
                for (const field of fieldAllow) {
                    if (condition[0] === field) return true
                }
                return false
            })
        }

        return {
            conditionsAllow,
            orderByAllow,
        }
    }

    clearQuery() {
        this.query = {
            where: {},
            order: null,
            limit: null,
            offset: null,
        }
    }

    async findAndPaginate(
        conditions = [],
        orderBy = [],
        page,
        size,
        fieldAllow = [],
    ) {
        console.log('page', page)
        console.log('size', size)
        const { conditionsAllow, orderByAllow } = this.handleFieldAllow(
            conditions,
            orderBy,
            fieldAllow,
        )
        this.handleConditions(conditionsAllow)
        this.order(orderByAllow)
        this.take(page)
        this.limit(size)

        const result = await this.model.findAndCountAll(this.query)

        if (page > Math.ceil(result.count / size)) {
            size = 0
        }

        const paginate = {
            total: result.count,
            take: size,
            page: page,
            totalPages: Math.ceil(result.count / size),
            data: result.rows,
        }

        this.clearQuery()

        return paginate
    }
}

module.exports = BaseRepository
