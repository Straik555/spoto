const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { withSentryConfig } = require('@sentry/nextjs')

const disableSentry = process.env.DISABLE_SENTRY === '1'
const nextConfigs = withBundleAnalyzer({
  images: {
    domains: ['via.placeholder.com'],
  },
  devtool: "source-map",
  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      })
    )

    config.plugins.push(new OptimizeCSSAssetsPlugin({}))

    return config
  },
  sentry: {
    widenClientFileUpload: !disableSentry,
    disableServerWebpackPlugin: disableSentry,
    disableClientWebpackPlugin: disableSentry,
  }
})

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  debug: true,
  url: 'https://sentry.io/',
  org: "spoto",
  project: "spotoui",
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(nextConfigs, sentryWebpackPluginOptions);
