/**
 * store all barcode ,index is the counterpart number
 * @type {[string,string,string,string,string,string,string,string,string,string]}
 */
const BARCODESARRAY = ["||:::", ":::||", "::|:|", "::||:", ":|::|", ":|:|:", ":||::", "|:::|", "|::|:", "|:|::"];

/**
 * strap first and last '|' and cd
 * @returns {string}
 */
function getRealBarcode(barcodeStr) {
    return barcodeStr.substr(1, barcodeStr.length - 6);
}

/**
 * split barcode string to barcode array
 * @param realBarcode
 */
function splitBarcodeToArr(realBarcode) {
    return realBarcode.match(/[|:]{5}/g);
}

/**
 *
 * @param array
 * @returns {*}
 */
function concatPostNum(array) {
    let result = "";
    array.forEach((barcode) => {
        result = result.concat(BARCODESARRAY.indexOf(barcode));
    });
    if (result.length === 9) {
        result = result.substr(0, 5) + '-' + result.substring(5);
    }
    return result;
}

function isLegitBarCode(barcode) {
    return /[|:]{32}|[|:]{52}/.test(barcode)
}

/**
 * transform unreadable barcode into post number
 * @param barcode
 */
function postNumberDecode(barcode) {
    if (!isLegitBarCode(barcode)) {
        return 'plz input correctly';
    }
    let realBarcode = getRealBarcode(barcode);
    let barcodeArr = splitBarcodeToArr(realBarcode);
    return concatPostNum(barcodeArr);
}

module.exports = postNumberDecode;