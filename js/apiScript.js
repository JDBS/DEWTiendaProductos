/**
 * esta es nuestra APIKEY publica
 */
var apikeyEbay = 'Aymediac-TiendaDE-PRD-3134e8f72-be150970';
var apikeyBestBuy = 'A0iJvovzx1h8jN9IXhGSCwjm';// '0ZD1P0g0K4sJCdFLz79yKKnG';
var apiKeyForex = 'CLgVZ2SmUW1P0EEa2ryKYZf7yeXRUL58';

var pageSize = '100';
var page = 1;
var searchEbay = '';
var searchBesBuy = '';
var urlList = '';
let count = 0;
let productList = [];
var filterArray = [];
let category = '';

let productCategory = {
    'all': 'trending',
    'tv': {
        'name': 'TV',
        'id': 'abcat0101000',
    },
    'health': {
        'name': 'Health',
        'id': 'pcmcat242800050021'
    },
    'phone': {
        'name': 'Smartphone',
        'id': 'pcmcat209400050001'
    },
};

// Define global variable for the URL filter
var urlFilter;

/**
 * Generates an indexed URL snippet from the array of item filters
 */
function buildURLArray() {
    urlFilter = "";
    for (var i = 0; i < filterArray.length; i++) {
        var itemFilter = filterArray[i];
        for (var index in itemFilter) {
            if (itemFilter[index] !== "") {
                if (itemFilter[index] instanceof Array) {
                    for (var r = 0; r < itemFilter[index].length; r++) {
                        var value = itemFilter[index][r];
                        urlFilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value;
                    }
                } else {
                    urlFilter += "&itemFilter\(" + i + "\)." + index + "=" + itemFilter[index];
                }
            }
        }
    }
}
// End buildURLArray() function

//#region - Api Url
/**
 * Its function is to prepare and set the parameters to send in the url for the Api
 * @param  {object} data - Object that contains a series of filters and the text to search
 */
function setUrl(data) {
    let maxPrice = data.maxPrice;
    let minPrice = data.minPrice;
    productCategory[data.category] ? category = productCategory[data.category] : category = productCategory.all;
    data.search.length !== 0 ? searchEbay = data.search.split(' ').join('%20') : searchEbay = category.name;
    data.search.length !== 0 ? searchBesBuy = '(search=' + data.search.split(' ').join('&search=') + ')' : searchBesBuy = `(categoryPath.id=${category.id})`;
    // Create a JavaScript array of the item filters you want to use in your request
    filterArray = [{
        "name": "MinPrice",
        "value": minPrice,
        "paramName": "Currency",
        "paramValue": "EUR"
    }, {
        "name": "MaxPrice",
        "value": maxPrice,
        "paramName": "Currency",
        "paramValue": "EUR"
    }, {
        "name": "FreeShippingOnly",
        "value": "true",
        "paramName": "",
        "paramValue": ""
    }, {
        "name": "ListingType",
        "value": [
            "AuctionWithBIN", "FixedPrice", "StoreInventory"
        ],
        "paramName": "",
        "paramValue": ""
    }, {
        "name": "HideDuplicateItems",
        "value": "true"
    }];
    /**
     *  Execute the function to build the URL filter
     * @param  {object} filterArray
     */
    buildURLArray(filterArray);
    urlList = {
        'BestBuy': {
            'trending': 'https://api.bestbuy.com/beta/products/trendingViewed?apiKey=A0iJvovzx1h8jN9IXhGSCwjm',
            'category': `https://api.bestbuy.com/v1/products(${searchBesBuy}&salePrice>${minPrice}&salePrice<${maxPrice})?apiKey=${apikeyBestBuy}&sort=salePrice.asc&show=image,salePrice,modelNumber,longDescription,thumbnailImage,shortDescription,name,categoryPath.name,categoryPath.id&format=json`,
        },
        'Ebay': {
            'trending': `https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=${apikeyEbay}&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=trending&paginationInput.entriesPerPage=10&paginationInput.pageNumber=1&GLOBAL-ID=EBAY-ES&itemFilter(0).name=HideDuplicateItems&itemFilter(0).value=true&sortOrder=BestMatch`,
            'category': `https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=${apikeyEbay}&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${searchEbay}&paginationInput.entriesPerPage=${pageSize}&paginationInput.pageNumber=1&GLOBAL-ID=EBAY-ES${urlFilter}&sortOrder=BestMatch`
        }
    };
}
//#endregion

//#region - Api request
/**
 * It makes the requests to get the products
 * @param  {string}  platform - Store name
 * @param  {string}  url - url with the parameters
 * @param  {function}  callback - Function to know when the data is loaded
 * @param  {function}  callbackError - Function to know if have been an error
 * @param  {object} data - Object that contains a series of filters and the text to search
 */
function ajaxRequest(platform, callback, callbackError, data) {
    setUrl(data);
    let type;
    category === 'trending' && data.search.length === 0 ? type = category : type = 'category';
    if (platform === 'Ebay')
        $.ajax({
            url: urlList[platform][type],
            jsonp: 'callback',
            dataType: 'jsonp',
            success: function (response) {
                getProducts(response, 'Ebay', callback);
            },
            error: function (jqXHR, status) {
                callbackError(jqXHR, status);
            },
        });
    if (platform === 'BestBuy')
        $.ajax({
            url: urlList[platform][type],
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                getProducts(response, 'BestBuy', callback);
            },
            error: function (jqXHR, status) {
                callbackError(jqXHR, status);
            },
        });
}

/**
 * It gets money change factor, then call the stores ajax call
 * @param callback - Function to know when the data is loaded
 * @param data - Array of items to search
 */
/**
 * It gets money change factor, then call the stores ajax call
 * @param  {function} callback - Function to know when the data is loaded
 * @param  {function} callbackError
 * @param  {object} data - Object that contains a series of filters and the text to search
 */
function getCurrency(callback, callbackError, data) {
    $.ajax({
        url: `https://forex.1forge.com/1.0.3/quotes?pairs=USDEUR&api_key=${apiKeyForex}`,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            localStorage.setItem('convertFactor', response[0].price);
        },
        error: function (jqXHR, status, error) { //función error
            callbackError(jqXHR, status);
        },
        complete: function (jqXHR, status) {
            ajaxRequest('Ebay', callback, callbackError, data);
            ajaxRequest('BestBuy', callback, callbackError, data);
        }
    });
}
//#endregion
//#region - Object creation
/**
 * @param  {object} data - Object list of items
 * @param  {string} platform - Store name
 * @param  {function} callback - Function to know when the data is loaded
 */
function getProducts(data, platform, callback) {
    let id, product, items, name, manufacture, img, price, description, typeId, typeName;

    if (platform === 'BestBuy') {
        let cF = localStorage.getItem('convertFactor');
        items = data.products;
        if (items)
            for (let i = 0; i < items.length; ++i) {
                id = items[i].modelNumber;
                name = items[i].name;
                if (items[i].image)
                    img = items[i].image;
                else
                    img = items[i].thumbnailImage;
                price = (items[i].salePrice * cF).toFixed(2);
                items[i].shortDescription ? description = items[i].shortDescription : description = 'Descripción no disponible';
                items[i].categoryPath[1] ? typeId = items[i].categoryPath[1].id : typeId = 'id-' + new Date().getTime();
                items[i].categoryPath[1] ? typeName = items[i].categoryPath[1].name : typeName = null;
                if (null != name) {
                    product = new Product(id, name, description, price, typeId, typeName, img, 'BestBuy');
                }
                productList.push(product);
            }
        else {
            items = data.results;
            for (let i = 0; i < items.length; ++i) {
                id = items[i].sku;
                name = items[i].names.title;
                img = items[i].images.standard;
                price = (items[i].prices.current * cF).toFixed(2);
                description = items[i].descriptions.short;
                typeId = 0;
                typeName = 'Trending';
                if (null != name) {
                    product = new Product(id, name, description, price, typeId, typeName, img, 'BestBuy');
                }
                productList.push(product);
            }
        }
    } else {
        if (!data.findItemsByKeywordsResponse[0].errorMessage) {
            items = data.findItemsByKeywordsResponse[0].searchResult[0].item || [];
            for (let i = 0; i < items.length; ++i) {
                id = items[i].itemId[0] + '-' + new Date().getTime();
                name = items[i].title[0];
                items[i].galleryURL !== undefined ? img = items[i].galleryURL[0] : img = items[i].galleryPlusPictureURL[0];
                if (items[i].sellingStatus[0].currentPrice[0]["@currencyId"] === 'EUR')
                    price = items[i].sellingStatus[0].currentPrice[0].__value__;
                else
                    price = items[i].sellingStatus[0].convertedCurrentPrice[0].__value__;
                description = items[i].title[0];
                typeId = items[i].primaryCategory[0].categoryId[0];
                typeName = items[i].primaryCategory[0].categoryName[0];
                if (null != name) {
                    product = new Product(id, name, description, price, typeId, typeName, img, 'Ebay');
                }
                productList.push(product);
            }
        }
    }

    count++;
    if (count === 2) {
        count = 0;
        localStorage.setItem('productList', JSON.stringify(productList));
        productList = [];
        callback();
    }
}

//#endregion