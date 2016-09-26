var webpack = require('webpack');
var path = require('path');                 //引入node的path库
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

//开发与真实环境分开
var env = process.env.WEBPACK_ENV;
var outputFile;
var plugins = [
	new HtmlwebpackPlugin({
		title: 'React Biolerplate by Linghucong',
		template: path.resolve(__dirname, 'templates/index.ejs'),
		inject: 'body'
	}),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin(),
	new ExtractTextPlugin("[name]-[hash].css")
];
if (env === 'build') {
	var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
	plugins.push(new UglifyJsPlugin({ minimize: true }));
	outputFile = 'bundle.min.js';
} else {
	outputFile = 'bundle.js';
}


var config = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:3000',
		'./app/index.jsx'      //入口文件
	],                //入口文件
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: outputFile
	},
	module: {
		loaders: [
			// 为webpack指定loaders
			//{ test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
			},
			{
				test: /\.less$/,
				loaders: ['style', 'css', 'less'],
				include: path.resolve(__dirname, 'app')
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=25000'
			},
		]
	},
	postcss: [
		require('autoprefixer')//调用autoprefixer插件
	],
	plugins: plugins
}

module.exports = config;