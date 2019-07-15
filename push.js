var { firestore, firebase } = require('./firebase')

var cate = ['WzxfUto15zec1qmWNdBS']
var subCate = []
var tag = cate.concat(subCate)
async function main() {
    var { data } = require('./data/SMALL WARE/KITCHEN')
    // var child = require('./data/BEVERAGE & BAR').data.concat(require('./data/CONTAINERS').data)
    // console.log(data.length)
    var child = []
    await data.forEach(item => {
        if (item.imgs.length == 0) item.imgs.push(item.img)
        item.code = 'B' + item.code
        item.price = parseFloat(item.price)
        item.cate = cate
        item.subCate = subCate
        item.tag = tag
        item.createdAt = firebase.firestore.FieldValue.serverTimestamp()
        if (child.findIndex((ele) => { return ('B' + ele.code) == item.code }) == -1) {
            firestore.collection('Stock').add(item)
        }
    })
}
main()