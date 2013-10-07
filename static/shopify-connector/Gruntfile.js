/**
 * shopify-connector
 * http://shopify-connector.appspot.com/
 *
 **/

'use strict';

var src = [
    'src/shopify-connector.js',
    'src/jsonp.js',
    'src/handlebars.js',
    'src/helpers.js'
    ];

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        license: grunt.file.read('src/license.js'),
        concat: {
            options: {
                //separator: 'src/;',
                banner: '<%= license %>'
            },
            main: {
                src: src,
                dest: 'shopify-connector.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= license %>'
            },
            main: {
                files: {
                    'shopify-connector.min.js': ['shopify-connector.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['concat'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    //Load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Default task(s).
    grunt.registerTask('default', ['concat:main', 'uglify:main']);
};
