var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var LessPluginAutoPrefix = require('less-plugin-autoprefix')
var autoprefixPlugin = new LessPluginAutoPrefix()
var extractLess = new ExtractTextPlugin({
	filename: '[name].bundle.css',
	allChunks: true,
	ignoreOrder: true,
	disable: process.env.NODE_ENV !== 'production'
})
// var webpack = require('webpack')

module.exports = {
	context: path.join(__dirname,'./src/entries'),
	entry: {
		main : './main.js'
		// commons : ['react','react-dom']
	},

	module: {

		rules : [
			{test : /\.jsx?$/, loader : 'babel-loader' , exclude: /node_modules/},
			{
				test: /\.less$/,
				exclude : path.join(__dirname,'./src/styles'),
				use: extractLess.extract({
					use: [{
						loader: 'css-loader',
						options : {
							sourceMap: true,
							modules: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]'
						}
					}, {
						loader: 'less-loader',
						options : {
							// sourceMap: true,
							plugins : [autoprefixPlugin]
						}
					}],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.less$/,
				include : path.join(__dirname,'./src/styles'),
				use: extractLess.extract({
					use: [{
						loader: 'css-loader',
						options : {
							sourceMap: true,
						}
					}, {
						loader: 'less-loader',
						options : {
							// sourceMap: true,
							plugins : [autoprefixPlugin]
						}
					}],
					fallback: 'style-loader'
				})
			},
			{test: /\.(png|jpg|jpeg|gif)$/, use:[{loader : 'url-loader', options : {limit : 30000}}]},
			{test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/, loader : 'file-loader'}
		]
	},
	
	resolve : {
		modules: [path.join(__dirname, 'src'),'node_modules']
	},
	plugins: [
		extractLess
	]
}