const NodemonPlugin = require("nodemon-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	entry: "./src/index.ts",
	mode: "production",
	target: "node",
	resolve: {
		extensions: [".ts", ".js"],
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "awesome-typescript-loader",
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
	plugins: [new NodemonPlugin(), new ProgressBarPlugin()],
};
