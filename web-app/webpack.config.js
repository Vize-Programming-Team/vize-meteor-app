const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
	entry: "./src/index.tsx",
	mode: "development",
	// Enable sourcemaps for debugging Webpack's output
	devtool: "source-map",
	devServer: {
		compress: true,
		port: 3000,
		proxy: {
			"/api": "http://localhost:3001",
		},
		historyApiFallback: true,
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, "src/"),
			generated: path.resolve(__dirname, "generated/"),
		},
		extensions: [".ts", ".tsx", ".js", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|woff)$/i,
				loader: "file-loader",
				options: {
					outputPath: "assets",
					publicPath: "/assets",
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "ts-loader",
				options: {
					transpileOnly: true,
				},
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: "javascript/auto",
			},
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: "graphql-tag/loader",
			},
		],
	},
	plugins: [
		new ProgressBarPlugin(),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
			base: "/",
		}),
		new FaviconsWebpackPlugin("./src/images/VizeLogoThinny.ico"),
	],
};
