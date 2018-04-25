"use strict";
module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: [ "karma-typescript", "jasmine"],

        files: [
            { pattern: "app/**/*.spec.ts" }
        ],

        preprocessors: {
            "app/**/*.ts": ["karma-typescript"]
        },

        reporters: ["dots", "karma-typescript"],

        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json"
        },

        browsers: ["Chrome"],
        singleRun: false,
        concurrency: Infinity
    });
};
