'user strict';
let gulp = require('gulp');
let bump = require('gulp-bump');
let replace = require('gulp-replace');
let _ = require('lodash');
let git = require('git-rev');
let fs = require('fs');
let semver = require('semver');
let merge = require('merge-stream');
let webpack = require('webpack');
let gutil = require('gulp-util');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let WebpackDevServer = require('webpack-dev-server');

let webpackConfig = require('./webpack.config');

let webpackProductionConfig = Object.create(webpackConfig);
webpackProductionConfig.debug = false;
webpackProductionConfig.devtool = 'source-map';
webpackProductionConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new ExtractTextPlugin('[name].css')
];
webpackProductionConfig.entry = {
  app: './src/index.js'
};

gulp.task('default', ['webpack-dev-server']);
gulp.task('build', ['webpack:build:production', 'build:production']);

gulp.task('webpack:build:production', function(callback) {
  webpack(webpackProductionConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({ colors: true }));
    callback();
  });
  gulp.src(['src/assets/images/**/*']).pipe(gulp.dest('dist/assets/images'));
});

gulp.task('build:production', function() {
  gulp
    .src(['./index.html'])
    .pipe(
      printEnv({
        ENV: 'production',
        API_HOST: 'http://113.161.40.128:3000',
        APP_HOST: 'http://113.161.40.128:3001'
      })
    )
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack-dev-server', function() {
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    hot: true,
    watch: true,
    lazy: false,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }).listen(3000, '0.0.0.0', function(err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log(
      '[webpack-dev-server]',
      'http://localhost:3000/webpack-dev-server/'
    );
  });
});

// Log version with git commit hash everytime bundle is built
gulp.task('git:version', function() {
  let fileContent = '';
  git.long(function(version) {
    fileContent += ['Git commit hash:', version].join(' ');
    fileContent += '\r\n';
    git.tag(function(tag) {
      fileContent += ['Git tag:', tag].join(' ');
      fs.writeFileSync('version.txt', fileContent);
    });
  });
});

gulp.task('bump:minor', function() {
  return bumpVersion('minor');
});

gulp.task('copy:version', function() {
  gulp.src(['./version.txt']).pipe(gulp.dest('./build'));
});

// Helpers
function printEnv(env) {
  var str = '';
  _.forOwn(env, function(value, key) {
    if (value) {
      str += 'window.' + key + ' = "' + value + '";\n';
    }
  });
  return replace(/__ENV__/g, str);
}

function bumpVersion(type) {
  var pkg = getPackageJson();
  var newVer = semver.inc(pkg.version, type);

  var packageJson = gulp
    .src(['./package.json'])
    .pipe(
      bump({
        version: newVer
      })
    )
    .pipe(gulp.dest('./'));

  var replaceVersionCode = function(match) {
    var number = match.match(/\d+/);
    return '" versionCode="' + (parseInt(number[0]) + 1) + '"';
  };

  var configXml = gulp
    .src(['./mobile/config.xml'])
    .pipe(replace(/"\s+version=".*?"/gim, '" version="' + newVer + '"'))
    .pipe(replace(/"\s+versionCode=".*?"/gim, replaceVersionCode))
    .pipe(gulp.dest('./mobile/'));

  return merge(packageJson, configXml);
}

function getPackageJson() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
}
