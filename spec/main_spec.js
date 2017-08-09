"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var transformStr = require("../lib/main.js");


describe("POSTNET encode", function () {
    sinon.spy(console, 'log');

    it("input a empty string return error", function () {

        var result = transformStr();
        var expect_string = 'plz input correctly';

        expect(expect_string).to.equal(result);
    });
    it("input a wrong formatted string return error", function () {

        var result = transformStr("1234");
        var expect_string = 'plz input correctly';

        expect(expect_string).to.equal(result);
    });
    it("input a length 5 string return barcode", function () {

        var result = transformStr("95713");
        var expect_string = '||:|:::|:|:|:::|:::||::||::|:|:|';

        expect(expect_string).to.equal(result);
    });
    it("input a length 9 string return barcode", function () {

        var result = transformStr("957139571");
        var expect_string = '||:|:::|:|:|:::|:::||::||:|:|:::|:|:|:::|:::||::||:|';

        expect(expect_string).to.equal(result);
    });
    it("input a length 10 string return barcode", function () {

        var result = transformStr("95713-9571");
        var expect_string = '||:|:::|:|:|:::|:::||::||:|:|:::|:|:|:::|:::||::||:|';

        expect(expect_string).to.equal(result);
    });

    console.log.restore();//此处需解除对console的监视

});

describe("POSTNET decode", function () {
    sinon.spy(console, 'log');

    it("input empty return an error message", function () {

        var result = transformStr("");
        var expect_string = 'plz input correctly';

        expect(expect_string).to.equal(result);
    });
    it("input 32 length barcode return an 5 length post number", function () {

        var result = transformStr("||:|:::|:|:|:::|:::||::||::|:|:|");
        var expect_string = '95713';

        expect(expect_string).to.equal(result);
    });
    it("input 52 length barcode return an 9 length post number split by '-'", function () {

        var result = transformStr("||:|:::|:|:|:::|:::||::||:|:|:::|:|:|:::|:::||::||:|");
        var expect_string = '95713-9571';

        expect(expect_string).to.equal(result);
    });
});