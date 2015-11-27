/**
 * Created by Marius Mischie <marius.mischie@softgames.de> on 26/11/15.
 * Copyright © Softgames 2015
 */

'use strict';

var request = require('request');

var quest = function (params) {

    function doStuff(err, res, body) {
        return ({err: err, res: res, body: body});
    }

    return new Promise(function(resolve, reject) {
        request(params, function(err, res, body) {
            var result = doStuff(err, res, body);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = quest;
