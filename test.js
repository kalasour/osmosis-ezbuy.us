var osmosis = require('osmosis');
var fs = require("fs");
var out = []
var url = 'http://www.ezbuy.us/category-s/127.htm'
var name = 'JANITORIAL'


var input = {
    url: url + '?searching=Y&sort=13&cat=130&show=300&page=1',
    file: name + '.js'
}
osmosis.get('https://www.ezbuy.us/Login.asp').login('nnn@nnn.com', 'Nuntawat').get(input.url)
    .find('td > a').follow('@href').set({
        // img: 'img.vCSS_img_product_photo > @src',
        code: 'span.product_code',
        imgs: ['span#altviews > a > @href']
    })
    .find('td.vCSS_breadcrumb_td').set({
        name: 'span'
    })
    .find('div > span#product_description').set('description')
    // .find('span#altviews').set({ listImg: ['a > @href'] })
    .find('table#v65-product-parent').set({ price: 'table.colors_pricebox[0] > span' })
    .data(res => { out.push(res) }).done(() => {
        fs.writeFile('./data/' + input.file, JSON.stringify(out), (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to " + name + " File. " + out.length);
        });
    })
    .log(console.log)
    .error(console.log)
    .debug(console.log)