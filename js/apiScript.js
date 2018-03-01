/**
 * esta es nuestra APIKEY publica
 */
var apikeyEbay = 'Aymediac-TiendaDE-PRD-3134e8f72-be150970';
var apikeyBestBuy = 'A0iJvovzx1h8jN9IXhGSCwjm';
var apiKeyForex = 'CLgVZ2SmUW1P0EEa2ryKYZf7yeXRUL58';

var pageSize = 10;
var minPrice = '';
var maxPrice = '';
var toSearch = 'samsung 4k';
var searchEbay = toSearch.split(' ').join('%20');
var searchBesBuy = toSearch.split(' ').join('&search=');
var sortOrderType = [
    'BestMatch', 'BidCountFewest', 'BidCountMost',
    'CountryAscending', 'CountryDescending', 'CurrentPriceHighest',
    'DistanceNearest', 'EndTimeSoonest', 'PricePlusShippingHighest',
    'PricePlusShippingLowest', 'StartTimeNewest', 'WatchCountDecreaseSort'
];
// var bestBuyTmp = [];

// BestBuy filter
var attributes = "&salePrice>800" +
    "&salePrice<1500" +
    "&(categoryPath.id=abcat0101000))";

// Create a JavaScript array of the item filters you want to use in your request
var filterarray = [
    {
        "name": "MinPrice",
        "value": "250",
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
    }
];


// Define global variable for the URL filter
var urlfilter = "";

// Generates an indexed URL snippet from the array of item filters
function buildURLArray() {
    // Iterate through each filter in the array
    for (var i = 0; i < filterarray.length; i++) {
        //Index each item filter in filterarray
        var itemfilter = filterarray[i];
        // Iterate through each parameter in each item filter
        for (var index in itemfilter) {
            // Check to see if the paramter has a value (some don't)
            if (itemfilter[index] !== "") {
                if (itemfilter[index] instanceof Array) {
                    for (var r = 0; r < itemfilter[index].length; r++) {
                        var value = itemfilter[index][r];
                        urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value;
                    }
                } else {
                    urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
                }
            }
        }
    }
} // End buildURLArray() function

// Execute the function to build the URL filter
buildURLArray(filterarray);
//#region - Api Url
// Construct the request Replace MyAppID with your Production AppID
var url = "http://svcs.ebay.com/services/search/FindingService/v1"
    + "?SECURITY-APPNAME=" + apikeyEbay
    + "&OPERATION-NAME=findItemsByKeywords"
    + "&SERVICE-VERSION=1.0.0"
    + "&RESPONSE-DATA-FORMAT=JSON"
    + "&REST-PAYLOAD"
    + "&keywords=" + searchEbay
    + "&paginationInput.entriesPerPage=" + pageSize
    + "&GLOBAL-ID=EBAY-ES"
    + urlfilter
    + `&sortOrder=${sortOrderType[0]}`;

var urlBB = "https://api.bestbuy.com/v1/products(" +
    "(search=" + searchBesBuy + ")" +
    attributes +
    // "&manufacturer=samsung" +
    // "&(categoryPath.id=abcat0101000))" +
    "?apiKey=" + apikeyBestBuy +
    "&sort=salePrice.asc" +
    "&show=image,salePrice,modelNumber,longDescription,thumbnailImage,shortDescription,name,modelNumber,categoryPath.name,categoryPath.id" +
    "&format=json";
//#endregion

getCurrency();

//#region - Api request
function ajaxRequest(platform, url, callback, callbackError) {
    if (platform === 'Ebay')
        $.ajax({
            url: url,
            jsonp: 'callback',
            dataType: 'jsonp',
            success: function (response) {
                getProducts(response, 'Ebay');
            },
            error: function (jqXHR, status) {
                callbackError(jqXHR, status);
            },
            complete: function (jqXHR, status) {
                if (callback)
                    callback();
            }
        });
    if (platform === 'BestBuy')
        $.ajax({
            url: urlBB,
            type: 'GET',
            dataType: 'json',
            timeout: 3000,
            success: function (data) {
                getProducts(data, 'BestBuy');
            },
            error: function (jqXHR, status) {
                callbackError(jqXHR, status);
            },
            complete: function (jqXHR, status) {
                if (callback)
                    callback();
            }
        });
}

function getCurrency(callback) {
    $.ajax({
        url: `https://forex.1forge.com/1.0.3/quotes?pairs=USDEUR&api_key=${apiKeyForex}`,
        type: 'GET',
        dataType: 'json',
        timeout: 3000,
        success: function (data) {
            localStorage.setItem('convertFactor', data[0].price);
        },
        error: function (jqXHR, status, error) { //función error
            callbackError(jqXHR, status);
        },
        complete: function (jqXHR, status) {
            ajaxRequest('Ebay', url, callback);
            ajaxRequest('BestBuy', urlBB, callback);
        }
    });
}

//#endregion