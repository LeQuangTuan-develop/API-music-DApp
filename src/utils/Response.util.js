const dataResponse = (code, data, message) => {
    return {
        code,
        data,
        message,
    }
}

module.exports = {
    dataResponse,
}
