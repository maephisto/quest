/**
 * Created by Marius Mischie <marius.mischie@softgames.de> on 26/11/15.
 * Copyright © Softgames 2015
 */

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    http = require('http'),
    quest = require('../quest');

const PORT = 8888;
const MSG = 'Hello World!';

function handleRequest(req, response) {
    response.end(MSG);
}

var server = http.createServer(handleRequest);

describe('Quest library specification:', function () {

    before(function() {
        server.listen(PORT);
    });

    after(function () {
        server.close();
    });

    xit('should initialize', function (done) {
        quest({});
    });

    it('should inject a plugin', function (done) {

        done();
    });

    it('should inject a final', function (done) {

        done();
    });

    it('should make a request to url', function (done) {
        quest({
            url: 'http://localhost:' + PORT
        }).then(function(result) {
            expect(result.body).to.equal(MSG);
            done();
        });
    });

    xit('should transform result with plugin', function (done) {
    });
});
