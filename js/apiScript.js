/**
 * esta es nuestra APIKEY publica
 */
var apikeyEbay = 'Aymediac-TiendaDE-PRD-3134e8f72-be150970';
var apikeyBestBuy = 'A0iJvovzx1h8jN9IXhGSCwjm';
var apiKeyForex = 'CLgVZ2SmUW1P0EEa2ryKYZf7yeXRUL58';

var pageSize = '10';
var minPrice = 0;
maxPrice = 99999;
var page = 1;
var searchEbay = '';
var searchBesBuy = '';
// var sortOrderType = [
//     'BestMatch', 'BidCountFewest', 'BidCountMost',
//     'CountryAscending', 'CountryDescending', 'CurrentPriceHighest',
//     'DistanceNearest', 'EndTimeSoonest', 'PricePlusShippingHighest',
//     'PricePlusShippingLowest', 'StartTimeNewest', 'WatchCountDecreaseSort'
// ];

// BestBuy filter
var attributes = ''; //'&(categoryPath.id=abcat0800000))';

// Create a JavaScript array of the item filters you want to use in your request
var filterArray = [{
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
let productCategory = {
    'all': 'trending',
    'tv': 'TV',
    'health': 'Health',
    'phone': 'Smartphone',
};
let category = '';

// Define global variable for the URL filter
var urlFilter = "";

// Generates an indexed URL snippet from the array of item filters
function buildURLArray() {
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
// Construct the request Replace MyAppID with your Production AppID
// var url = "http://svcs.ebay.com/services/search/FindingService/v1" +
//     "?SECURITY-APPNAME=" + apikeyEbay + "&OPERATION-NAME=findItemsByKeywords" +
//     "&SERVICE-VERSION=1.0.0" + "&RESPONSE-DATA-FORMAT=JSON" +
//     "&REST-PAYLOAD" + "&keywords=" + searchEbay +
//     "&paginationInput.entriesPerPage=" + pageSize +
//     "&paginationInput.pageNumber=" + page +
//     "&GLOBAL-ID=EBAY-ES" + urlFilter +
//     `&sortOrder=${sortOrderType[0]}`;

// var urlBB = "https://api.bestbuy.com/v1/products(" +
//     "(search=" + searchBesBuy + ")" + attributes +
//     // "&manufacturer=samsung" +
//     // "&(categoryPath.name=abcat0101000))" +
//     "?apiKey=" + apikeyBestBuy + "&sort=salePrice.asc" +
//     "&show=image,salePrice,modelNumber,longDescription,thumbnailImage,shortDescription,name,modelNumber,categoryPath.name,categoryPath.id" +
//     "&format=json";
function setUrl() {
    var urlList = {
        'BestBuy': {
            'trending': 'https://api.bestbuy.com/beta/products/trendingViewed?apiKey=A0iJvovzx1h8jN9IXhGSCwjm',
            'category': `https://api.bestbuy.com/v1/products${searchBesBuy}?apiKey=${apikeyBestBuy}&show=image,salePrice,modelNumber,longDescription,thumbnailImage,shortDescription,name,modelNumber,categoryPath.name,categoryPath.id&format=json`,
        },
        'Ebay': {
            'trending': `http://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=${apikeyEbay}&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=trending&paginationInput.entriesPerPage=10&paginationInput.pageNumber=1&GLOBAL-ID=EBAY-ES&itemFilter(0).name=HideDuplicateItems&itemFilter(0).value=true&sortOrder=BestMatch`,
            'category': `http://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=${apikeyEbay}&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${searchEbay}&paginationInput.entriesPerPage=${pageSize}&paginationInput.pageNumber=1&GLOBAL-ID=EBAY-ES${urlFilter}&sortOrder=BestMatch`
        }
    }
}

//#endregion

//#region - Api request
/**
 * It makes the requests to get the products
 * @param platform - Store name
 * @param url - url with the parameters
 * @param callback - Function to know when the data is loaded
 * @param callbackError - Function to know if have been an error
 */
function ajaxRequest(platform, callback, callbackError, data) {
    // Execute the function to build the URL filter
    buildURLArray(filterArray);
    let type;
    category === 'trending' ? type = category : type = 'category';
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
function getCurrency(callback, callbackError, data) {
    productCategory[data.categoria] ? category = productCategory[data.categoria] : category = productCategory.all;
    maxPrice = data.maxPrice;
    minPrice = data.minPrice;
    searchEbay = data.search.split(' ').join('%20') + '%20' + category;
    data.search.length !== 0 ? searchEbay = data.search.split(' ').join('%20') + `%20 ${category}` : searchEbay = category;
    data.search.length !== 0 ? searchBesBuy = '((search=' + data.search.split(' ').join('&search=') + '))' : searchBesBuy = category;
    setUrl();
    
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