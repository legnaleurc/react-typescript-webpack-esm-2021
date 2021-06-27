import process from 'process';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';


export default function factory () {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const config: webpack.Configuration = {
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              getCustomTransformers() {
                return {
                  before: isDevelopment ? [ReactRefreshTypeScript()] : [],
                };
              },
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(),
    ],
  };

  if (config.plugins && isDevelopment) {
    config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  return config;
};
