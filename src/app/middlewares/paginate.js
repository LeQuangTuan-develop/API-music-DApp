
const pagination = (req, res, next) => {
    const pageAsNumber = Number.parseInt(req.query._page)-1
    const sizeAsNumber = Number.parseInt(req.query._size)

    let _page = 0
    let _size = 0
    const sizeMax = 30

    if(Number.isNaN(pageAsNumber)){
        _page = 0
    }

    if(Number.isNaN(sizeAsNumber)){
        _size = 10
    }

    if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
        _size = sizeAsNumber
    }

    if(sizeAsNumber>sizeMax){
        _size = sizeMax
    }

    req.query._size = _size
    req.query._page = _page

   return next()
}


module.exports = {
    pagination
}