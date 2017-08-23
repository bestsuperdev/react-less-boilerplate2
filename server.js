
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');
var opn = require('opn');
var ip = '0.0.0.0';
var port = 9000;


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var proxy = require('express-http-proxy');

if (typeof config.entry === 'string') {
	config.entry = ["react-hot-loader/patch", "webpack-dev-server/client?http://" + ip + ":" + port, "webpack/hot/only-dev-server", config.entry];
} else if (typeof config.entry === 'object') {
	for (var k in config.entry) {
		var main = config.entry[k]
		config.entry[k] = ["react-hot-loader/patch", "webpack-dev-server/client?http://" + ip + ":" + port, "webpack/hot/only-dev-server"].concat(main)
	}
}

var server = new WebpackDevServer(webpack(config), {
	contentBase: path.resolve(__dirname, './'),
	hot: true,
	//设置webpack-dev-server启动的时候，bundles的输出的路径，打包的时候这个publicPath没有作用
	publicPath: config.output.publicPath,
	historyApiFallback: false,
	// /api/* 会指向  http://127.0.0.1:9001/api/*  如  /api/users 就会指向  http://127.0.0.1:9001/api/users
	// proxy: {
	// 	'/weixinapi/*': {
	// 		target: 'http://127.0.0.1:9001',
	// 	}
	// }
})

server.use('/api', proxy('http://127.0.0.1:9001', {
	forwardPath: function (req, res) {
		console.log(req.url);   // 删除这行会出问题，暂时别删除
		var redirect = require('url').parse(req.url).path;
		console.log(redirect);  // 删除这行会出问题，暂时别删除
		return '/api' + redirect;
	},
	https: false,
	reqBodyEncoding: null
}));

server.use(bodyParser.json({limit : '1000000kb'})); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true ,limit : '1000000kb'})); // for parsing application/x-www-form-urlencoded
server.use(cookieParser());

server.listen(port, function (err) {
	if (err) {
		console.log(err); //eslint-disable-line no-console
	} else {
		opn('http://127.0.0.1:' + port);
		console.log('Listening at http://127.0.0.1:' + port); //eslint-disable-line no-console
	}

});
