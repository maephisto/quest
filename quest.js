/**
 * Created by Marius Mischie <marius.mischie@softgames.de> on 26/11/15.
 * Copyright © Softgames 2015
 */

'use strict';

var request = require('request'),
    _ = require('underscore');

function init(args) {
    if (args) {
        return new Quest(args);
    } else {
        return {
            with: function(plugins) {
                if (_.isArray(plugins)) {
                    predefinedPlugins.concat(plugins);
                } else {
                    predefinedPlugins.push(plugins);
                }
            }
        };
    }
}

var predefinedPlugins = [];

class Quest {

    constructor(options, predefinedPlugins) {
        this.options = options;
        this.pluginFunctions = predefinedPlugins || [];
    }

    use (pluginFunction) {
        if (_.isArray(pluginFunction)) {
            this.pluginFunctions.concat(pluginFunction);
        } else {
            this.pluginFunctions.push(pluginFunction);
        }

        return this;
    }

    then (finalCallbackFunction) {
        this.finalCallbackFunction = finalCallbackFunction;

        return this;
    }

    catch (catchCallbackFunction) {
        this.catchCallbackFunction = catchCallbackFunction;

        return this;
    }

    finally (finalFunction) {
        this.finalFunction = finalFunction;

        return this;
    }

    done () {
        try {
            request(this.options, ((err, res, body) => {

                this.result = {res: res, body: body};

                if (!err) {
                    _.each(this.pluginFunctions, ((plugin) => {
                        this.result = plugin(this.result);
                    }));

                    if (this.finalCallbackFunction && typeof this.finalCallbackFunction === 'function') {
                        this.finalCallbackFunction();
                    }
                } else {
                    this.catchCallbackFunction(err);
                }
            }));

        } catch (ex) {
            this.catchCallbackFunction(ex);
        } finally {
            if (this.finalFunction && typeof this.finalFunction === 'function') {
                this.finalFunction();
            }
        }
    }
}

module.exports = init;
