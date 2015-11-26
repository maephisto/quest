/**
 * Created by Marius Mischie <marius.mischie@softgames.de> on 26/11/15.
 * Copyright © Softgames 2015
 */

'use strict';

var request = require('request'),
    Q = require('q');

var quest = function (params) {
    var deferred = Q.defer();
    deferred.resolve();
    return deferred.promise;
};

module.exports = quest;