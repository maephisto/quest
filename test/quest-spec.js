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

var options = {
    url: 'http://localhost:' + PORT
};


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

    xit('should make a request to url', function (done) {
        quest(options).then(function(result) {
            expect(result.body).to.equal(MSG);
            done();
        });
    });

    it('should transform result with plugin', function (done) {

        quest(options)
            .then(function(result) {
                console.log('here - plugin 1');
                return result;
            })
            .then(function(result) {
                result.body = result.body.toUpperCase();
                return result;
            })
            .then(function(result) {
                console.log('final callback', result.body);
                done();
            })
    });

    it('should catch when there is an error in req', function (done) {
        quest({url:'your mom'})
            .catch(function(error) {
                expect(error).to.be.not(null);
                done();
            });
    });
});
