// import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';

const root = path.resolve(__dirname);

module.exports = {
	entry: {
		client: './lib/client.js',
		server: './lib/server.js',
	},
	target: 'node',
	devtool: 'source-map',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(root, 'dist'),
		filename: '[name].js',
		library: 'auth',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [
								['es2015', {loose: true, modules: false}],
								'stage-1',
								'flow',
							],
						},
					},
				],
			},
		],
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		// 	},
		// 	sourceMap: true,
		// }),
	],
};
