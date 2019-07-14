var osmosis = require('osmosis');
var fs = require("fs");
function GetData(url, name) {
    var out = []
    var input = {
        url: url + '?searching=Y&sort=13&cat=130&show=300&page=1',
        file: name + '.js'
    }
    osmosis.get('https://www.ezbuy.us/Login.asp').login('nnn@nnn.com', 'Nuntawat').get(input.url)
        .find('a.v-product__img').follow('@href').set({
            img: 'img.vCSS_img_product_photo > @src',
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
            if (out.length == 0) GetData2(url, name)
            else
                fs.writeFile('./data/' + input.file, JSON.stringify(out).replace(/\/\/cdn/g, "http://cdn"), (err) => {
                    if (err) console.log(err);
                    console.log("Successfully Written to " + name + " File. " + out.length);
                });
        })
    // .log(console.log)
    // .error(console.log)
    // .debug(console.log)
}

function GetData2(url, name) {
    var out = []
    var input = {
        url: url + '?searching=Y&sort=13&cat=130&show=300&page=1',
        file: name + '.js'
    }
    osmosis.get('https://www.ezbuy.us/Login.asp').login('nnn@nnn.com', 'Nuntawat').get(input.url)
        .find('td > a').follow('@href').set({
            img: 'img.vCSS_img_product_photo > @src',
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
            fs.writeFile('./data/' + input.file, JSON.stringify(out).replace(/\/\/cdn/g, "http://cdn"), (err) => {
                if (err) console.log(err);
                console.log("Successfully Written to " + name + " File. " + out.length);
            });
        })
    // .log(console.log)
    // .error(console.log)
    // .debug(console.log)
}
var list = []
osmosis.get('https://www.ezbuy.us/Login.asp').login('nnn@nnn.com', 'Nuntawat').get('http://www.ezbuy.us/default.asp')
    .find('div.menu').set({
        name: ['li.vnav__item > a.vnav__link'],
        url: ['li.vnav__item > a.vnav__link > @href']
    }).data(res => {
        list.push(res)
    }).done(() => {
        list[0].name.forEach(async (item, index) => {
            await console.log(list[0].name[index] + ' ' + list[0].url[index])
            await GetData(list[0].url[index], list[0].name[index])
        })
    })
    // .log(console.log)
    // .error(console.log)
    // .debug(console.log)