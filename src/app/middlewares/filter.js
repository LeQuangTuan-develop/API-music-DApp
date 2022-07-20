const filters = (req,res,next) =>{

const cateAsNumber = Number.parseInt(req.query._cate)

let cate = 1

if(Number.isNaN(cateAsNumber)){
    cate = 1
}

if(!Number.isNaN(cateAsNumber) && cateAsNumber > 0) {
    cate = cateAsNumber
}

req.query._cate = cate
return next()
}

module.exports ={
filters
}