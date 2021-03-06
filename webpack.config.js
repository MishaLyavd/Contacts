const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
	entry: {
		main: ["babel-polyfill", "./src/index.js"]
	},
	output: {
		publicPath: '/',
		path: __dirname + '/public/index.html'
	},
	devServer: {
		historyApiFallback: true
	},
    module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader"
					}
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: 'style-loader'
						},
						{
							loader: 'css-loader',
							options: {
								modules: true,
								localIdentName: '[name]__[local]',
								sourceMap: false,
								context: '/'
							}
						}
					]
        },
        {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]',
        }
      },
				{
					test: /\.html$/,
					use: [
						{
							loader: "html-loader",
							options: { minimize: true }
						}
					]
				}
			]
	},
		plugins: [
			new HtmlWebPackPlugin({
				template: "./public/index.html",
				filename: "./index.html"
			})
		]
};