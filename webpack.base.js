var path = require('path')
// var webpack = require('webpack')

module.exports = {
	context: path.join(__dirname,'./src/entries'),
	entry: {
		main : './main.js',
		commons : ['react','react-dom']
	},

	module: {

		rules : [
			{test : /\.jsx?$/, loader : 'babel-loader' , exclude: /node_modules/},
			{test: /\.(png|jpg|jpeg|gif)$/, use:[{loader : 'url-loader', options : {limit : 30000}}]},
			{test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/, loader : 'file-loader'}
		]
	},
	
	resolve : {
		modules: [path.join(__dirname, 'src'),'node_modules']
	}
}