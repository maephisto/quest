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
        server.listen(PORT);
    });

    after(function () {
        server.close();
    });

    it('should initialize', function (done) {
        var v = quest({});
        expect(v).not.to.be.null();
        done();
    });

    xit('should inject a plugin', function (done) {
        quest(options)
            .use(plugins.logSomething)
            .then(function(result) {
                console.log('final callback here >>', result);
            })
            .catch(function(err) {
                console.log('there was an error', err);
            })
            .finally(function(result) {
                done();
            })
            .done();
    });

    it('should inject a final', function (done) {
        quest(options)
        .then(function(result) {
            expect(result).not.to.be.null();
            done();
        })
        .done();


    });

    it('should go to catch when having error', function (done) {

        quest(options)
            .use(plugins.logSomething)
            .use(plugins.upperCase)
            .then(function(result) {
                console.log('final callback here also', result.body);
            })
            .catch(function(err) {
                console.log('error', err);
            })
            .finally(function(result) {
                console.log('finally ', result.body);
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
