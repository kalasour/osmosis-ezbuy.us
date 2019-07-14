async function main() {
    var { data } = require('./data/CONTAINERS')
    await data.forEach(item => {
        if (item.imgs.length == 0) item.imgs.push(item.img)
        item.code = 'B' + item.code
        item.price = parseFloat(item.price)
        
    })
    console.log(data)
}
main()