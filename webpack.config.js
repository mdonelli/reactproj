var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");


var config = {
    mode: 'development',
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: [
                        "@babel/react",
                        [ "@babel/preset-env", {"useBuiltIns": "entry"} ],
                        {'plugins': ['@babel/plugin-proposal-class-properties']}
                    ]
                }
            },
            { 
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]        
    }
};

module.exports = config;