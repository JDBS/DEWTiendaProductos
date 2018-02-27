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
var url = "http://svcs.ebay.com/services/search/FindingService/v1";
url += "?SECURITY-APPNAME=" + apikeyEbay;
url += "&OPERATION-NAME=findItemsByKeywords";
url += "&SERVICE-VERSION=1.0.0";
url += "&RESPONSE-DATA-FORMAT=JSON";
url += "&REST-PAYLOAD";
url += "&keywords=" + searchEbay;
url += "&paginationInput.entriesPerPage=" + pageSize;
url += "&GLOBAL-ID=EBAY-ES";
url += urlfilter;
url += `&sortOrder=${sortOrderType[0]}`;

var urlBB = "https://api.bestbuy.com/v1/products(" +
    "(search=" + searchBesBuy + ")" +
    attributes +
    // "&manufacturer=samsung" +
    // "&(categoryPath.id=abcat0101000))" +
    "?apiKey=" + apikeyBestBuy +
    "&sort=salePrice.asc" +
    "&show=image,salePrice,modelNumber,longDescription,thumbnailImage,shortDescription,name,modelNumber,categoryPath.name,categoryPath.id" +
    "&format=json";
ajaxRequest('Ebay', url);
ajaxRequest('BestBuy', urlBB);
//#endregion
//#region - Api request
function ajaxRequest(platform, url) {
    if (platform === 'Ebay')
        $.ajax({
            url: url,
            jsonp: 'callback',
            dataType: 'jsonp',
            beforeSend: function () {
                // $('#loader').show();
            },
            success: function (response) {
                console.log(response);
                getProducts(response, 'Ebay');
            },
            error: function (jqXHR, status, error) { //función error
                console.error('Can\'t do because: ' + jqXHR, status, error);
            },
            complete: function (jqXHR, status) {
                if (jqXHR.status === 409) {
                    // $('#loader').hide();
                    // $divCharacters.children().remove();
                    // $divCharacters.append($('<span>There has been a problem with the server. Please try again later.</span>'));
                    // $divComics.children().remove();
                    // $divComics.append($('<span>There has been a problem with the server. Please try again later.</span>'));
                }
                else {
                    console.log('Done');
                }
            }
        });
    if (platform === 'BestBuy')
        $.ajax({
            url: urlBB,
            type: 'GET',
            dataType: 'json',
            timeout: 3000,
            beforeSend: function () {
                // $('#loader').show();
            },
            success: function (data) {
                getProducts(data, 'BestBuy');
            },
            error: function (jqXHR, status, error) { //función error
                console.error('Can\'t do because: ' + jqXHR.responseJSON.code + ' , ' + jqXHR.responseJSON.message);
            },
            complete: function (jqXHR, status) {
                if (jqXHR.status === 409) {
                    // $('#loader').hide();
                    // $divCharacters.children().remove();
                    // $divCharacters.append($('<span>There has been a problem with the server. Please try again later.</span>'));
                    // $divComics.children().remove();
                    // $divComics.append($('<span>There has been a problem with the server. Please try again later.</span>'));
                }
                else {
                    console.log('Done');
                }
            }
        });

}

function convertCurrency(list) {
    let times = 0;
    // var forexUrl = `https://forex.1forge.com/1.0.3/convert?from=USD&to=EUR&quantity=${value}&api_key=${apiKeyForex}`;
    list.forEach(e => {
        if (e.platform === 'BestBuy')
            $.ajax({
                url: `https://forex.1forge.com/1.0.3/convert?from=USD&to=EUR&quantity=${Math.ceil(e.price)}&api_key=${apiKeyForex}`,
                type: 'GET',
                dataType: 'json',
                timeout: 3000,
                beforeSend: function () {
                    // $('#loader').show();
                },
                success: function (data) {
                    if (data.value !== null || data.value !== undefined)
                        e.price = Math.round(data.value * 100) / 100;
                },
                error: function (jqXHR, status, error) { //función error
                    console.error('Can\'t do because: ' + jqXHR.responseJSON.code + ' , ' + jqXHR.responseJSON.message);
                },
                complete: function (jqXHR, status) {
                    if (jqXHR.status === 409) {
                        // $('#loader').hide();
                        // $divCharacters.children().remove();
                        // $divCharacters.append($('<span>There has been a problem with the server. Please try again later.</span>'));
                        // $divComics.children().remove();
                        // $divComics.append($('<span>There has been a problem with the server. Please try again later.</span>'));
                    }
                    else {
                        times++;
                        if (times === (list.length / 2))
                            localStorage.setItem('productList', JSON.stringify(list));
                        // return price;

                    }
                }
            });
    });

}
//#endregion