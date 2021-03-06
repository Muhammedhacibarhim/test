var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {

    entry: {
        app:'./src/index.js'
    },

    output: {
        path: path.join(__dirname, "/dist"),
        filename: "main.js"
    },

    mode: "development",

    devServer: {
        contentBase: path.join(__dirname, "/dist"),
        port: 8202,
        open: true,
        writeToDisk: true
    },

    module: {
        rules: [
            {
                test:/\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize:true,
                        }
                    }
                ]
            },

            {
                test: require.resolve("jquery"),
                loader: "expose-loader",
                options: {
                  exposes: ["$", "jQuery"],
                },
              },


              {
                test: /\.(sa|sc|c)ss$/,
                  use: [
                    {
                      loader: MiniCssExtractPlugin.loader, 
                      options: {
                        publicPath: '../' 
                      }
                    },
                    'css-loader',
                    'sass-loader'
                  ]
              },
              

                    


        ],
    },

    plugins: [

        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
        }),

        new HtmlWebpackPlugin({
            filename: "product.html",
            template: "./src/product.html",
        }),

        new HtmlWebpackPlugin({
            filename: "checkout.html",
            template: "./src/checkout.html",
        }),

        new HtmlWebpackPlugin({
            filename: "payment.html",
            template: "./src/payment.html",
        }),

        new HtmlWebpackPlugin({
            filename: "search.html",
            template: "./src/search.html",
        }),

        new HtmlWebpackPlugin({
            filename: "contact.html",
            template: "./src/contact.html",
        }),
        new MiniCssExtractPlugin({filename: "css/style.css"}),
        new OptimizeCssAssetsWebpackPlugin({}),

    ],


    




};