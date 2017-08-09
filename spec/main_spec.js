"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var POSTNET = require("../lib/main.js");


describe("POSTNET encode", function () {
    sinon.spy(console, 'log');

    it("input a empty string return error", function () {

        var result = POSTNET.postEncode();
        var expect_string = 'plz input correct format post number';

        expect(expect_string).to.equal(result);
    });
    it("input a wrong formatted string return error", function () {

        var result = POSTNET.postEncode("1234");
        var expect_string = 'plz input correct format post number';

        expect(expect_string).to.equal(result);
    });
    it("input a length 5 string return barcode", function () {

        var result = POSTNET.postEncode("95713");
        var expect_string = '||:|:::|:|:|:::|:::||::||::|:|:|';

        expect(expect_string).to.equal(result);
    });
    it("input a length 9 string return barcode", function () {

        var result = POSTNET.postEncode("957139571");
        var expect_string = '||:|:::|:|:|:::|:::||::||:|:|:::|:|:|:::|:::||::||:|';

        expect(expect_string).to.equal(result);
    });
    it("input a length 10 string return barcode", function () {

        var result = POSTNET.postEncode("95713-9571");
        var expect_string = '||:|:::|:|:|:::|:::||::||:|:|:::|:|:|:::|:::||::||:|';

        expect(expect_string).to.equal(result);
    });

});

// describe("POSTNET decode", function(){
//     sinon.spy(console, 'log');
//
//     it("input a empty string return error", function(){
//
//         var result = POSTNET.postEncode();
//         var expect_string = '';
//
//         expect(expect_string).to.equal(result);
//     });
// });