var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	context: path.join(__dirname,'./src/entries'),
	entry: {
		main : './main.js'
	},
	output: {
		path: path.join(__dirname,'hot'),
		publicPath: "/",
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js'
	},
	module: {

		rules : [
			{test : /\.less$/, use : ['style-loader','css-loader','less-loader']},
			{test : /\.css$/, use : ['style-loader','css-loader']},
			{test : /\.jsx?$/, loader : 'babel-loader' , exclude: /node_modules/},
			{test: /\.(png|jpg|jpeg|gif)$/, use:[{loader : 'url-loader', options : {limit : 30000}}]},
			{test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/, loader : 'file-loader'}
		]
	},

	resolve : {
		modules: [path.join(__dirname, "src"),"node_modules"]
	},

	// postcss: function () {
	// 	return [require('autoprefixer'),require('postcss-filter-gradient')];
	// },
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
		// new webpack.optimize.CommonsChunkPlugin('commons', '[name].bundle.js'),
		new webpack.optimize.CommonsChunkPlugin({
			name : 'commons',
			filename :  '[name].bundle.js'
		}),
		new HtmlWebpackPlugin({
			template : path.join(__dirname,'src/dev.html'),
			inject: true,
			chunks : ['commons','main']
		})
	],
	devtool : '#inline-source-map'
// 	devServer: {
// 		hot: true,
// 		// enable HMR on the server

// 		contentBase: path.resolve(__dirname,'./'),
// 		// match the output path

// 		publicPath: '/'
// 		// match the output `publicPath`
//   },

	//devServer 配置在webpack.dev.server.js 中
}