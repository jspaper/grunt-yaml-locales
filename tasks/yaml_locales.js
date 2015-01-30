/*
 * grunt-yaml-locales
 * https://github.com/changchaiyi/grunt-yaml-locales
 *
 * Copyright (c) 2015 josh
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('locales', 'YAML locales generator', function () {
        var options = this.options({
            srcDir: null,
            destDir: null
        });

        var cb = this.async();

        var cmd = 'ruby locales.rb ' + options.srcDir + ' ' + options.destDir;

        var cp = exec(cmd, options.execOptions, function (err, stdout, stderr) {
            if (typeof options.callback === 'function') {
                options.callback.call(this, err, stdout, stderr, cb);
            } else {
                if (err) {
                    grunt.warn(err);
                }
                cb();
            }
        }.bind(this));

        cp.stdout.pipe(process.stdout);

    });

};
