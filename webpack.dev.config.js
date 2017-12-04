var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.js')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseConfig,{

	output: {
		path: path.join(__dirname,'hot'),
		publicPath: '/',
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js'
	},


	plugins : [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({
			debug: true
		}), 
		new webpack.DefinePlugin({
			'process.env' : {
				NODE_ENV : JSON.stringify('development')
			}
		}),

		new HtmlWebpackPlugin({
			template : path.join(__dirname,'src/dev.html'),
			inject: true,
			chunks : ['main']
		})
	],
	devtool : '#inline-source-map'
})