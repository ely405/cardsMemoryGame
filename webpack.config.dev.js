const webpack = require('webpack');
const	path = require('path');
const	HtmlWebpackPlugin = require('html-webpack-plugin');
const	ReloadPlugin = require('reload-html-webpack-plugin');

const	srcDir = path.resolve(__dirname, 'src');
const	publicDir = path.resolve(__dirname, 'public');

module.exports = {
	context: srcDir,
	// devtool: 'hidden-source-map',
	devtool: 'inline-sourcemap',
	entry: {
		script: ['babel-polyfill', './index.js'],
	},
	output: {
		path: publicDir,
		filename: '[name].js',
		publicPath: './',
		sourceMapFilename: 'main.map',
	},
	devServer: {
		contentBase: srcDir,
		publicPath: '/',
		historyApiFallback: true,
		compress: true,
		open: true,
		hot: true,
		stats: 'errors-only',
		port: 3000,
		openPage: '',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.json$/,
				exclude: /node_modules/,
				use: 'json-loader',
			},
			{
				test: /\.scss$/,
				exclude: /style.scss/,
				use: [
					'style-loader',
					// 'css-loader',
					'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]',
					'resolve-url-loader',
					'sass-loader?sourceMap',
				],
			},
			{
				test: /style.scss/,
				use: [
					'style-loader',
					'css-loader',
					'resolve-url-loader',
					'sass-loader?sourceMap',
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg|webp)$/i,
				use: [
					'file-loader?name=[path][name].[ext]',
					'image-webpack-loader?bypassOnDebug',
				],
			},
			{
				test: /\.(ttf|eot|woff2?|mp4|txt|xml)$/,
				use: 'file-loader?name=[path][name].[ext]',
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new ReloadPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(srcDir, 'template.html'),
			filename: 'index.html',
			title: 'Cards Game',
			chunks: ['script'],
		}),
	],
};