import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';


export default function factory () {
  const config: webpack.Configuration = {
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(),
    ],
  };

  return config;
};
