/**
 * store all barcode ,index is the counterpart number
 * @type {[string,string,string,string,string,string,string,string,string,string]}
 */
const BARCODEARRAY = ["||:::", ":::||", "::|:|", "::||:", ":|::|", ":|:|:", ":||::", "|:::|", "|::|:", "|:|::"];

/**
 * test for correct post number format
 * @param str
 * @returns {boolean}
 */
function isCorrectPostNumber(str) {
    return /\d{5}|\d{5}-\d{4}/.test(str);
}

/**
 * return sum of a string
 * @param str
 * @returns {*}
 */
function countStrSum(str) {
    return str.split('').reduce((num1, num2) => {
        return parseInt(num1) + parseInt(num2);
    });
}

/**
 * count cd of the given postNumber sum
 * @param num
 * @returns {number}
 */
function countCD(num) {
    const magicNum = 100;//since sum is definitely less than 100;
    return (magicNum - parseInt(num)) % 10;
}

/**
 * construct a barcode with given post string and cd
 * @param str
 * @param cd
 * @returns {string}
 */
function formatBarcode(str, cd) {
    return "|" + str.split('').map((num) => {
        return BARCODEARRAY[num];
    }).join("") + BARCODEARRAY[cd] + "|";
}

/**
 * remove '-' from postNumber string
 * @param postNumberStr
 * @returns {void|string|*|XML}
 */
function getNineDigitPostNumber(postNumberStr) {
    return postNumberStr.replace("-", "");
}

/**
 * transform string into barcode
 * @param postNumberStr
 */
function postalNumericEncode(postNumberStr) {
    if (!isCorrectPostNumber(postNumberStr)) {
        return 'plz input correct format post number';
    }
    if (postNumberStr.length === 5 || postNumberStr.length === 9) {
        let cd = 0;
        let sum = countStrSum(postNumberStr);
        cd = countCD(sum);
        return formatBarcode(postNumberStr, cd);
    } else if (postNumberStr.length === 10) {
        let nineDigitPostNumber = getNineDigitPostNumber(postNumberStr);
        return postalNumericEncode(nineDigitPostNumber);
    }
}


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
        result = result.concat(BARCODEARRAY.indexOf(barcode));
    });
    if(result.length === 9){
        result = result.substr(0,5) + '-' + result.substring(5);
    }
    return result;
}


/**
 * transform unreadable barcode into post number
 * @param barcode
 */
function postalNumericDecode(barcode) {

    if (barcode.length === 32 || barcode.length === 52) {
        let realBarcode = getRealBarcode(barcode);
        let barcodeArr = splitBarcodeToArr(realBarcode);
        return concatPostNum(barcodeArr);
    }
    return 'plz input an correct barcode'//wrong format
}

console.log(postalNumericDecode("||:|:::|:|:|:::|:::||::||:|:|:::|:|:|:::|:::||::||:|"))

module.exports = {
    postEncode: postalNumericEncode,
    postDecode: postalNumericDecode
};
