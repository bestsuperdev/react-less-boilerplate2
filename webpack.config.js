var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var es3ifyPlugin = require('es3ify-webpack-plugin')

module.exports = {
	context: path.join(__dirname,'./src/entries'),
	entry: {
		main : './main.js',
		commons : ['react','react-dom']
	},
	output: {
		path: path.join(__dirname,'dist'),
		// publicPath: "/bundles/",
		filename: '[name].[hash].bundle.js',
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
			})},
			{test : /\.jsx?$/, loader : 'babel-loader' , exclude: /node_modules/},
			{test: /\.(png|jpg|jpeg|gif)$/, use:[{loader : 'url-loader', options : {limit : 30000}}]},
			{test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/, loader : 'file-loader'}
		]
	},

	resolve : {
		modules: [path.join(__dirname, "src"),"node_modules"]
	},
	// postcss: function () {
	// 	return [require('autoprefixer'),require('postcss-filter-gradient')]
	// },
	plugins : [
		new es3ifyPlugin(),		
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: true,
				properties  : false
			},
			mangle: {
				except: ['$super', '$', 'exports', 'require'],
			},
			output : {
				keep_quoted_props: true
			}
		}),
		new webpack.DefinePlugin({
			'process.env' : {
				NODE_ENV : JSON.stringify('production')
			}
		}),
		// new webpack.optimize.CommonsChunkPlugin('commons', '[name].[hash].bundle.js'),
		new webpack.optimize.CommonsChunkPlugin({
			name : 'commons',
			filename :  '[name].bundle.js'
		}),
		// new ExtractTextPlugin('[name].[hash].bundle.css',{allChunks: true}),
		new ExtractTextPlugin({
			filename : '[name].[hash].bundle.css',
			allChunks : true,
			disable : false
		}),
		new HtmlWebpackPlugin({
			template : path.join(__dirname,'src/dist.html'),
			inject: true,
			chunks : ['commons','main']
		})
	]

}