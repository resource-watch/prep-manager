require('dotenv').load();

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  webpack: (config, { dev }) => {
    if (dev) config.devtool = 'cheap-eval-source-map';

    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      }
      ,
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }
      ,
      {
        test: /\.s(a|c)ss$/,
        use: [
          'babel-loader',
          'raw-loader',
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    );

    // Images task
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader?prefix=image/&limit=5000&context=/static/images'
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.facebookUser': JSON.stringify(process.env.FACEBOOK_USER),
        'process.env.twitterUser': JSON.stringify(process.env.TWITTER_USER),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.APPLICATIONS': JSON.stringify(process.env.APPLICATIONS),
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
        'process.env.API_ENV': JSON.stringify(process.env.API_ENV),
        'process.env.BASEMAP_TILE_URL': JSON.stringify(process.env.BASEMAP_TILE_URL),
        'process.env.CALLBACK_URL': JSON.stringify(process.env.CALLBACK_URL),
        'process.env.CONTROL_TOWER_URL': JSON.stringify(process.env.CONTROL_TOWER_URL),
        'process.env.WRI_API_URL': JSON.stringify(process.env.WRI_API_URL),
        'process.env.STATIC_SERVER_URL': JSON.stringify(process.env.STATIC_SERVER_URL),
        'process.env.ADD_SEARCH_KEY': JSON.stringify(process.env.ADD_SEARCH_KEY),
        'process.env.TRANSIFEX_LIVE_API': JSON.stringify(process.env.TRANSIFEX_LIVE_API)
      }),
      new CopyWebpackPlugin([
        {
          from: 'node_modules/widget-editor/dist/images',
          to: 'static/images/widget-editor/'
        }
      ])
    );

    return config;
  }
};
