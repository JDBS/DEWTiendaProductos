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

//#region - Ebay
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

// Construct the request Replace MyAppID with your Production AppID
var url = "http://svcs.ebay.com/services/search/FindingService/v1";
url += "?OPERATION-NAME=findItemsByKeywords";
url += "&SERVICE-VERSION=1.0.0";
url += "&SECURITY-APPNAME=" + apikeyEbay;
url += "&GLOBAL-ID=EBAY-ES";
url += "&RESPONSE-DATA-FORMAT=JSON";
url += "&callback=getProducts";
// url += "&callback=_cb_findItemsByKeywords";
url += "&REST-PAYLOAD";
url += "&keywords=" + searchEbay;
url += "&paginationInput.entriesPerPage=" + pageSize;
url += urlfilter;
url += `&sortOrder=${sortOrderType[0]}`;

// Submit the request
var s = document.createElement('script'); // create script element
s.src = url;
document.body.appendChild(s);
// #endregion
// region - BestBuy

// var bestBuy = {
//     'baseURL': 'https://api.bestbuy.com/v1/products',
//     'categoryId': '(categoryPath.id=abcat0101000)',
//     'attribute': '(manufacturer=samsung)',
//     'keyword': '(search=4k)',
//     'apiKey': '?apiKey=A0iJvovzx1h8jN9IXhGSCwjm',
//     'sortOptions': '&sort=salePrice.asc',
//     'showOptions': '&show=image,salePrice,modelNumber,longDescription,shortDescription,name,categoryPath.name,categoryPath.id',
//     'responseFormat': '&format=json'
// };

var urlBB = "https://api.bestbuy.com/v1/products(" +
    "(search=" + searchBesBuy + ")" +
    attributes +
    // "&manufacturer=samsung" +
    // "&(categoryPath.id=abcat0101000))" +
    "?apiKey=" + apikeyBestBuy +
    "&sort=salePrice.asc" +
    "&show=image,salePrice,modelNumber,longDescription,shortDescription,name,categoryPath.name,categoryPath.id" +
    "&format=json";

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
//#endregion
//#region - Forex
function converCurrency(list) {
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
                            localStorage.setItem('productList2', JSON.stringify(list));
                        // return price;

                    }
                }
            });
    });

}

//#endregion
// function _cb_findItemsByKeywords(root, api) {
//     var html = [];
//     var items = [];
//     if (api === 'bb') {
//         items = root.products;
//         html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
//         html.push(`<tr><th>BestBuy</th></tr>`);
//         for (let i = 0; i < items.length; ++i) {
//             let item = items[i];
//             let title = item.name;
//             let manufacture = item.manufacturer;
//             let pic = item.image;
//             let salePrice = item.salePrice;
//             let shortDescription = item.shortDescription;
//             let viewitem = item.url;
//             if (null != title && null != viewitem) {
//                 html.push(`<tr>
//                 <td><img src="${pic}" width="140px" border="0"></td>
//                 <td>Precio: "${salePrice}</td>
//                 <td><a href="${viewitem}" target="_blank">${title}</a></td>
//                 </tr>`);
//             }
//         }
//     } else {
//         items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
//         html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
//         html.push(`<tr><th>Ebay</th></tr>`);
//         for (let i = 0; i < items.length; ++i) {
//             let item = items[i];
//             let title = item.title;
//             let pic = item.galleryURL;
//             let viewitem = item.viewItemURL;
//             if (null != title && null != viewitem) {
//                 html.push('<tr><td><img src="' + pic + '" border="0"></td><td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
//             }
//         }
//     }
//     html.push('</tbody></table>');
//     document.getElementById("results").innerHTML += html.join("");
//
// } //End _cb_findItemsByKeyWords() function
