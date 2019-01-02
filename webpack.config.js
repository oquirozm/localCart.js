// TODO
// - create a vendor structure for both styles and scripts in a separate branch

// basic dependencies
const path = require('path');
const webpack = require('webpack');

// basic plugins
const plugins = {
  progress: require('webpackbar'),
  clean: require('clean-webpack-plugin'),
  sri: require('webpack-subresource-integrity'),
  notifier: require('webpack-notifier'),
};

// start of module.exports

module.exports = (env = {}, argv) => {
  const isProduction = argv.mode === 'production';

  let config = {
    // context
    context: path.resolve(__dirname, 'src'),

    // entry
    entry: {
      app: ['./scripts/app.ts'],
    },

    // output
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '',
      filename: 'scripts/[name].js',
      crossOriginLoading: 'anonymous',
    },

    // module
    module: {
      rules: [
        // typescript
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },

    // plugins
    plugins: (() => {
      let common = [
        // webpack progress bar
        new plugins.progress({
          color: '#5c95ee',
        }),
        new plugins.notifier({
          alwaysNotify: true,
        }),
      ];
      const production = [
        new plugins.clean(['dist']),
        new plugins.sri({
          hashFuncNames: ['sha384'],
          enabled: true,
        }),
      ];

      return isProduction ? common.concat(production) : common;
      // return common;
    })(),

    // resolve
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.tsx', '.ts', '.js'],
    },
  };

  return config;
};
