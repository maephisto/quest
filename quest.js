/**
 * Created by Marius Mischie <marius.mischie@softgames.de> on 26/11/15.
 * Copyright © Softgames 2015
 */

'use strict';

var request = require('request'),
    _ = require('underscore');

class Quest {

    constructor(options) {
        this.pluginFunctions = [];

        request(options, ((err, res, body) => {
            this.result = {err: err, res: res, body: body};
            console.log('>> r', this.result.body);
            _.each(this.pluginFunctions, ((plugin) => {
                console.log('>> plugging in', this.result.body);
                this.result = plugin(this.result);
            }));
        }));
    }

    then (pluginFunction) {
        this.pluginFunctions.push(pluginFunction);

        return this;
    }
}

module.exports = function (options) {
    return new Quest(options);
};
