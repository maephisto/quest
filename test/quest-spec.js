/**
 * Created by Marius Mischie <marius.mischie@softgames.de> on 26/11/15.
 * Copyright © Softgames 2015
 */

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    quest = require('../quest');

describe('Quest library specification:', function () {

    it('should test quest initialization', function (done) {
        quest({})
            .then(function(result) {
                done();
            });
    });

    it('should test plugin injection', function (done) {

        done();
    });

    it('should test final injection', function (done) {

        done();
    });

});