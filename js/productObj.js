/**
 * Object to unify the product data provide by the apis
 * @param  {number} id
 * @param  {string} name
 * @param  {string} description
 * @param  {number} price
 * @param  {string} typeId
 * @param  {string} typeName
 * @param  {string} image
 * @param  {string} platform
 */
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