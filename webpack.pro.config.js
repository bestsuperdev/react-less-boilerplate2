var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig,{
	output: {
		path: path.join(__dirname,'dist'),
		// publicPath: "/bundles/",
		filename: '[name].[chunkhash].bundle.js',
		chunkFilename: '[id].[chunkhash].chunk.js'
	},
	externals : {
		'react' : 'React',
		'react-dom' : 'ReactDOM'
	},
	module: {
		rules : [
			{test : /\.less$/, use : ExtractTextPlugin.extract({
				fallback : 'style-loader',
				use : ['css-loader',{loader : 'postcss-loader', options : {
					plugins : function(){
						return [ require('autoprefixer')]
					}
				}},'less-loader'],
				publicPath : ''
			})},
			{test : /\.css$/, use : ExtractTextPlugin.extract({
				fallback : 'style-loader',
				use : 'css-loader',
				publicPath : ''
			})}
		]
	},

	plugins : [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.DefinePlugin({
			'process.env' : {
				NODE_ENV : JSON.stringify('production')
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names : ['commons','manifest'],
			filename :  '[name].[hash].bundle.js'
		}),
		new ExtractTextPlugin({
			filename : '[name].[chunkhash].bundle.css',
			allChunks : true,
			disable : false
		}),
		new HtmlWebpackPlugin({
			template : path.join(__dirname,'src/dist.html'),
			inject: true,
			chunks : ['manifest','commons','main']
		})
	]

})
