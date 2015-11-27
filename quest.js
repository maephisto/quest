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
        try {
            request(options, ((err, res, body) => {

                this.result = {err: err, res: res, body: body};

                if (!this.result.err) {
                    _.each(this.pluginFunctions, ((plugin) => {
                        this.result = plugin(this.result);
                    }));
                } else {
                    this.catchCallbackFunction(this.result.err);
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

    then (pluginFunction) {
        this.pluginFunctions.push(pluginFunction);

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
}

module.exports = function (options) {
    return new Quest(options);
};
