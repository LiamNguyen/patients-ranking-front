'user strict';
var gulp = require('gulp');
var bump = require('gulp-bump');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var _ = require('lodash');
var git = require('git-rev');
var fs = require('fs');
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
        API_HOST: 'http://113.161.40.128:3000',
        APP_HOST: 'http://113.161.40.128:3001'
      })
    )
    .pipe(gulp.dest('./build'));
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
