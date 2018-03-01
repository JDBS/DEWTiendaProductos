Product = function (id, name, description, price, typeId, typeName, image, platform) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.productType = {
        'typeId': typeId,
        'typeName': typeName
    };
    this.image = image;
    this.platform = platform;
};
let count = 0;
let productList = [];

function getProducts(data, api) {
    let id, product, items, name, manufacture, img, price, description, typeId, typeName;

    if (api === 'BestBuy') {
        let cF = localStorage.getItem('convertFactor');
        items = data.products;
        for (let i = 0; i < items.length; ++i) {
            id = items[0].modelNumber;// + '-' + new Date().getTime();
            name = items[i].name;
            // manufacture = items[i].manufacturer;
            img = items[i].image;
            price = (items[i].salePrice * cF).toFixed(2);
            description = items[i].shortDescription;
            typeId = items[i].categoryPath[1].id;
            typeName = items[i].categoryPath[1].name;
            if (null != name) {
                product = new Product(id, name, description, price, typeId, typeName, img, 'BestBuy');
            }
            productList.push(product);
        }
    } else {
        items = data.findItemsByKeywordsResponse[0].searchResult[0].item || [];
        for (let i = 0; i < items.length; ++i) {
            id = items[0].itemId[0]; // + '-' + new Date().getTime();
            name = items[i].title[0];
            items[i].galleryURL !== undefined ? img = items[i].galleryURL[0] : img = items[i].galleryPlusPictureURL[0];
            price = items[i].sellingStatus[0].currentPrice[0].__value__;
            description = items[i].title[0];
            typeId = items[i].primaryCategory[0].categoryId[0];
            typeName = items[i].primaryCategory[0].categoryName[0];
            if (null != name) {
                product = new Product(id, name, description, price, typeId, typeName, img, 'Ebay');
            }
            productList.push(product);
        }
    }

    count++;
    if (count === 2) {
        localStorage.setItem('productList', JSON.stringify(productList));
    }
}
