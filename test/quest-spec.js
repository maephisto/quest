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
    url: 'http://echo.jsontest.com/key/value/one/two'
};

var plugins = {};

function handleRequest(req, response) {
    response.end(MSG);
}

var server = http.createServer(handleRequest);

describe('Quest library specification:', function () {

    before(function() {
        plugins.logSomething = function (result) {
            //console.log('Logging plugin...', result);
            return result;
        };
        plugins.upperCase = function(result) {
            result.body = result.body.toUpperCase();
            return result;
        };
        plugins.matchToMessage = function (result) {
            return result;
        };
        plugins.addTogether = function (result) {
            result.body = 'hello';
            return result;
        };
        server.listen(PORT);
    });

    after(function () {
        server.close();
    });

    it('should initialize with no plugins', function (done) {
        var v = quest();
        expect(v).not.to.be.null();
        done();
    });

    it('should initialize with 1 plugin', function (done) {

        var v = quest.with(plugins.addTogether);

        v(options)
            .then(function(result) {
                expect(result.body).to.be(MSG);
                done();
            }).done();

        done();
    });

    it('should initialize with an array of plugins', function (done) {
        done();
    });

    it('should inject a plugin', function (done) {

        quest(options)
            .use(plugins.matchToMessage)
            .then(function(result) {
                console.log('final callback here >>', result);
            })
            .finally(function(result) {
                done();
            })
            .done();
    });

    it('should inject a final', function (done) {
        quest(options)
        .then(function(result) {
            expect(result).to.be(MSG);
            done();
        })
        .done();


    });

    it('should go to catch when having error', function (done) {

        quest(options)
            .use(plugins.logSomething)
            .use(plugins.upperCase)
            .then(function(result) {

            })
            .catch(function(err) {
                console.log('error', err);
            })
            .finally(function() {
                done();
            })
            .done();
    });

    it('should catch when there is an error in req', function (done) {

        quest({url:'your mom'})
            .use(function(result) {
                result.body = result.body.toUpperCase();
                return result;
            })
            .catch(function(error) {
                expect(error).not.to.be.null();
                done();
            })
            .done();
    });
});
