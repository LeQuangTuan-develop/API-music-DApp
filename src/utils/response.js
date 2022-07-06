const errorResponse = (code, message) => {
    return {
        code,
        message,
    }
}

const dataResponse = (code, data, message) => {
    return {
        code,
        data,
        message,
    }
}

module.exports = {
    errorResponse,
    dataResponse,
}
