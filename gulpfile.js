'user strict';
var gulp = require('gulp');
var bump = require('gulp-bump');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var _ = require('lodash');
var git = require('git-rev');
var fs = require('fs');
var path = require('path');
var semver = require('semver');
var merge = require('merge-stream');

// Build browser bundle for deployment
gulp.task('build', ['git:version', 'copy:version', 'build:browser']);

// Put environment to index.html when building bundle
// for browser with yarn
gulp.task('build:browser', function() {
  gulp
    .src(['./build/index.html'])
    .pipe(
      printEnv({
        ENV: 'production',
        API_HOST: 'https://gofore-glue-api.herokuapp.com',
        APP_HOST: 'https://gofore-glue.herokuapp.com',
        SLACK_BASE_URL: 'https://lets-dev.slack.com',
        SLACK_IMAGE_BASE_URL: 'https://platform.slack-edge.com/img'
      })
    )
    .pipe(gulp.dest('./build'));
});

// Build mobile bundle for Cordova
gulp.task('build:mobile', [
  'git:version',
  'copy:version:mobile',
  'bump:minor',
  'copy:mobile'
]);

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

gulp.task('copy:mobile', function() {
  var copyAll = gulp
    .src([
      './build/**/*',
      '!./build/*.html',
      '!./build/static/css/*.css',
      '!./build/static/css/*.map',
      '!./build/static/js/*.js',
      '!./build/static/js/*.map'
    ])
    .pipe(gulp.dest('./mobile'));

  var copyIndex = gulp
    .src(['./build/mobile_index.html'])
    .pipe(
      printEnv({
        ENV: 'mobile',
        API_HOST: 'https://gofore-glue-api.herokuapp.com',
        APP_HOST: 'https://gofore-glue.herokuapp.com',
        SLACK_BASE_URL: 'https://lets-dev.slack.com',
        SLACK_IMAGE_BASE_URL: 'https://platform.slack-edge.com/img'
      })
    )
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./mobile'));

  var copyCss = gulp
    .src(['./build/static/css/*.css'])
    .pipe(rename('main.css'))
    .pipe(gulp.dest('./mobile/static/css'));

  var copyCssMap = gulp
    .src(['./build/static/css/*.map'])
    .pipe(rename('main.css.map'))
    .pipe(gulp.dest('./mobile/static/css'));

  var copyJs = gulp
    .src(['./build/static/js/*.js'])
    .pipe(rename('main.js'))
    .pipe(gulp.dest('./mobile/static/js'));

  var copyJsMap = gulp
    .src(['./build/static/js/*.map'])
    .pipe(rename('main.js.map'))
    .pipe(gulp.dest('./mobile/static/js'));
  return merge(copyAll, copyIndex, copyCss, copyCssMap, copyJs, copyJsMap);
});

gulp.task('copy:version', function() {
  gulp.src(['./version.txt']).pipe(gulp.dest('./build'));
});

gulp.task('copy:version:mobile', function() {
  gulp.src(['./version.txt']).pipe(gulp.dest('./mobile'));
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
