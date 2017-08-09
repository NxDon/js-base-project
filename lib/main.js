const decode = require('./postNumberDecode');
const encode = require('./postNumberEncode');

function transformPOSTNET(str) {
    if(/\d+/.test(str)){//input has post number
        return encode(str);
    }else{//input is barcode
        return decode(str);
    }
}


module.exports = transformPOSTNET;

