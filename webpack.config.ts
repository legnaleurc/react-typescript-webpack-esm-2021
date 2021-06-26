import webpack from 'webpack';


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
  };

  return config;
};
