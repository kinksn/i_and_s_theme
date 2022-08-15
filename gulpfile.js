const dotenv = require( 'dotenv' ).config();

const { src, dest, lastRun, watch, series, parallel } = require('gulp'); // gulp

const bs = require('browser-sync').create(); // ローカルサーバ＆ブラウザオートリロード
const plumber = require('gulp-plumber'); // エラーによる強制停止を防止
const notify  = require('gulp-notify'); // エラー通知
const rename = require('gulp-rename');
const zip = require('gulp-zip');

const sass = require('gulp-sass')(require('sass')), // sassコンパイル
      sassGlob = require("gulp-sass-glob-use-forward"), // sassでglob指定できるように
      autoprefixer = require('gulp-autoprefixer'); // ベンダープレフィックス

const pug = require('gulp-pug');

const postcss = require('gulp-postcss') // taiwind.cssを使うために追加

const imagemin = require('gulp-imagemin'), // 画像圧縮
      mozjpeg = require( 'imagemin-mozjpeg' ),
      gifsicle = require( 'imagemin-gifsicle' ),
      pngquant = require('imagemin-pngquant'); // png圧縮true

const rimraf = require('rimraf'); //ファイル削除
const del = require('del');

const webpack = require( 'webpack' ),
      webpackStream = require( 'webpack-stream' );



// ディレクトリ・ファイル
const projectDir    = './';
const devDir        = projectDir + 'src/'; // 開発ディレクトリ
const destDir       = projectDir + 'dist/';
const assetsDir     = 'assets/';
const dir = {
  js    : assetsDir + 'js/',
  css   : assetsDir + 'css/',
  sass  : assetsDir + 'scss/',
  pug  : assetsDir + 'pug/',
  img   : assetsDir + 'img/',
};
const phpFile = projectDir + '**/*.php';
const imgFiles = [
  devDir + dir.img + '**/*.jpg',
  devDir + dir.img + '**/*.jpeg',
  devDir + dir.img + '**/*.png',
  devDir + dir.img + '**/*.svg',
  devDir + dir.img + '**/*.gif'
];
const copyFileList = [
  devDir + '**/*.ico',
  devDir + '**/*.pdf',
  devDir + '**/*.xml',
  devDir + '**/*.eps',
  devDir + '**/*.zip',
  devDir + '**/!(_)*.json',
  devDir + '**/*.mp4',
  devDir + '**/*.html',
  devDir + '**/*.woff',
  devDir + '**/*.woff2'
];
const copyJS = [
  devDir + dir.js + 'static/**/*.js',
];



/*
-----------------------------------------
　タスク一覧
-----------------------------------------
*/

//  【 Compiles 】

//Sassコンパイル
const sassCompile = () => { 
    return src( devDir + dir.sass + '**/*.scss' )
        .pipe(plumber({
        errorHandler: notify.onError("Error Sass: <%= error.message %>")
        }))
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle: 'compressed'// Minify
        }))
        .pipe(autoprefixer())
        .pipe(postcss([
          require('tailwindcss'),
          require('autoprefixer')
         ]))
        .pipe(dest( destDir + dir.css )); // 開発ディレクトリにcss書き出し
};

const pugCompile = () => {
    const option = {
      pretty: true,
      filters: {
        'php': text => {
          text = `<?php ${ text } ?>`;
          return text;
        }
      }
    };

    return src( devDir + dir.pug + '**/*.pug' )
      .pipe(plumber())
      .pipe(pug(option))
      .pipe(rename({
        extname: '.php'
      }))
      .pipe(dest( projectDir )); // 開発ディレクトリにphp書き出し
}

// JavaScriptコンパイル
const jsCompile = () => {
    const webpackConfig = require( './webpack.config.js' )( devDir, destDir, dir.js );
    return webpackStream( webpackConfig, webpack )
          .pipe( dest( destDir + dir.js ) );
}




//  【 Utils 】

//ローカルサーバ起動タスク
const hostname = process.env.LOCAL_HOST; // .envのLOCAL_HOSTをhostnameに代入
const browserSync =  done => { 
    bs.init({
        proxy: hostname,
        port: 8000
    });
    done();
};

// theme zip
const zipFiles = () => {
    return src( [ './**/*.php', './dist**/assets/**/*', './style.css', './screenshot.png' ] )
      .pipe( zip( 'i_and_s_theme.zip' ) )
      .pipe( dest( projectDir ) );

};

// dist php clean
const cleanFiles = () => {
  return del([
    './dist',
    './**.php',
    '!./functions.php'
  ]);
};

// コピータスク
const copyFiles = () => { // distディレクトリにコピータスク
  return src( copyFileList )
      .pipe( dest( destDir ) ); // 開発ディレクトリにコピー
};

// jsをコンパイルせずそのままコピー
const copyStaticJS = () => {
return src( copyJS )
  .pipe( dest( destDir + dir.js + 'static/' )) ;
};

// 画像圧縮
const imageMin = () => {
    return src( imgFiles, { since: lastRun( imageMin ) })
      .pipe( imagemin([
        pngquant(),
        mozjpeg({
          quality: 80,
        }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: false },
            { removeMetadata: false },
            { removeUnknownsAndDefaults: false },
            { convertShapeToPath: false },
            { collapseGroups: false },
            { cleanupIDs: false }
          ]
        }),
        gifsicle({
          interlaced: false,
          optimizationLevel: 3,
          colors: 180
        })
      ], {
        verbose: true
      }))
      .pipe(dest( destDir + dir.img ));
};

// watch時に監視するファイル一覧
const watchFiles = done => {
    const browserReload = () => {
        bs.reload();
        done();
    };
    watch( devDir + dir.sass + '**/*.scss').on( 'change', series( sassCompile, browserReload ) );
    watch( devDir + dir.js + '**/*.js' ).on( 'change', series( jsCompile, browserReload ) );
    watch( devDir + dir.pug + '**/*.pug' ).on( 'change', series( pugCompile, browserReload ) );
    watch( phpFile ).on( 'change', browserReload );
    watch( imgFiles, imageMin );
    watch( copyFileList, copyFiles );
    watch( copyJS, copyStaticJS );
    done();
};




/*
-----------------------------------------
　gulp実行タスク一覧
-----------------------------------------
*/

// gulpタスク
exports.default = series( cleanFiles, sassCompile, jsCompile, imageMin, pugCompile, copyStaticJS, copyFiles );

// watchタスク
exports.watch = series( pugCompile, sassCompile, jsCompile, parallel( watchFiles, browserSync ) );

// zipタスク
exports.zip = series( cleanFiles, sassCompile, jsCompile, imageMin, pugCompile, copyFiles, copyStaticJS, zipFiles );
