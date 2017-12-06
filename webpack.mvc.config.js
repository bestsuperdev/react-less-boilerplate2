var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.js')

function setView(options){
	let template = options.template || 'blank.cshtml'
	let entry = options.entry || 'main'
	let controller =  options.controller || 'Home'
	let action = options.action || 'Index'
	let version = options.version || +new Date
	return new HtmlWebpackPlugin({
		version : version,
		template : path.join(__dirname,'templates/' + template ),
		inject: false,
		filename : path.join(__dirname,'../Views/' + controller + '/' + action + '.cshtml'),
		chunks : ['commons',entry],
		entry : entry
	})
}


module.exports = merge(baseConfig,{
	output: {
		path: path.join(__dirname,'../bundles'),
		// publicPath: "/bundles/",
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js'
	},
	externals : {
		'react' : 'React',
		'react-dom' : 'ReactDOM'
	},


	plugins : [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.DefinePlugin({
			'process.env' : {
				NODE_ENV : JSON.stringify('production')
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names : ['commons'],
			filename :  '[name].bundle.js'
		}),
		setView({entry :'main',controller : 'Home',action : 'Index'})
	]

})
