const webpack = require('webpack');
const	path = require('path');
const	glob = require('glob-all');
const	HtmlWebpackPlugin = require('html-webpack-plugin');
const	ExtractTextPlugin = require('extract-text-webpack-plugin');
const	OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const	PurifyCSSPlugin = require('purifycss-webpack');

const	srcDir = path.resolve(__dirname, 'src');
const	publicDir = path.resolve(__dirname, 'public');

module.exports = {
	context: srcDir,
	// devtool: 'hidden-source-map',
	devtool: 'source-map',
	entry: {
		script: './index.js',
	},
	output: {
		path: publicDir,
		filename: '[name].js',
		publicPath: './',
		sourceMapFilename: 'main.map',
	},
	devServer: {
		contentBase: publicDir,
		publicPath: '/',
		historyApiFallback: true,
		compress: true,
		open: true,
		port: process.env.PORT || 5000,
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
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]',
						'resolve-url-loader',
						'postcss-loader?sourceMap',
						'sass-loader?sourceMap',
					],
					publicPath: './',
				}),
			},
			{
				test: /style.scss/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						'resolve-url-loader',
						'postcss-loader?sourceMap',
						'sass-loader?sourceMap',
					],
					publicPath: './',
				}),
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
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			output: {
				comments: false,
			},
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new ExtractTextPlugin({
			filename: 'style.css',
			disable: false,
			allChunks: true,
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorOptions: { discardComments: { removeAll: true } },
		}),
		new PurifyCSSPlugin({
			paths: glob.sync([
				path.join(__dirname, 'src/*.html'),
				path.join(__dirname, 'src/**/*.js'),
			]),
			purifyOptions: { whitelist: ['.fa-github'] },
		}),
		new HtmlWebpackPlugin({
			template: path.join(srcDir, 'template.html'),
			filename: 'index.html',
			title: 'Cards Game',
			description: 'Un juego de cartas en la que te divertirás muchp mostrando tus habilidades de memoria.',
			// favicon: './assets/img/favicon.ico',
			hash: true,
			minify: {
				collapseWhitespace: true,
				removeComments: true,
			},
			chunks: ['script'],
		}),
	],
};