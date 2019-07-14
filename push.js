var { firestore } = require('./firebase')

var cate = ['oqTtHoVmgIj8LWcCYVCV']
var subCate = ['SxZeYTTlu4otSrbhzRrb']
var tag = cate.concat(subCate)

async function main() {
    var { data } = require('./data/CONTAINERS')
    await data.forEach(item => {
        if (item.imgs.length == 0) item.imgs.push(item.img)
        item.code = 'B' + item.code
        item.price = parseFloat(item.price)
        item.cate = cate
        item.subCate = subCate
        item.tag = tag
        firestore.collection('Stock').add(item)
    })

}
main()