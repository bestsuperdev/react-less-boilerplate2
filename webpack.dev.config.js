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
	module: {

		rules : [
			{test : /\.less$/, use : ['style-loader','css-loader',{loader : 'postcss-loader', options : {
				plugins : function(){
					return [ require('autoprefixer')]
				}
			}},'less-loader']},
			{test : /\.css$/, use : ['style-loader','css-loader']}
		]
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
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name : 'commons',
		// 	filename :  '[name].bundle.js'
		// }),
		new HtmlWebpackPlugin({
			template : path.join(__dirname,'src/dev.html'),
			inject: true
			// chunks : ['commons','main']
		})
	],
	devtool : '#inline-source-map'
})


console.log(module.exports.module.rules)