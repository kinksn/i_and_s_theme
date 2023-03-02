const fs = require( 'fs' ); // ファイルIOモジュール




// 操作対象のファイル
const targetFile = './style.css';
// string replaceする条件
const replaceDateRegExp = /\d+\.\d+\.\d+/;




/**
 * 現在の日付（YYYYMMDD）を取得する関数
 * @returns { string }
 */
const getYYYYMMDD = () => {
    // 西暦_月_日付を取得
    const dt = new Date();
    const year = dt.getFullYear();
    const month = ( '0' + ( dt.getMonth() + 1 ) ).slice( -2 );
    const date = ( '0' + dt.getDate()).slice( -2 );
    return ( year + '.' + month + '.' + date ); // 西暦_月_日付を連結
}

/**
 * `targetFile`に書き込みを行う関数
 * @param { string } path 
 * @param { string } data 
 */
const updateStyleCSS = ( path, data ) => {
    fs.writeFile( path, data, err => {
        if ( err ) {
            console.log( err.message );
            throw err;
        }
    });
};



// `replaceDateRegExp`の条件で`targetFile`のテキストをreplace
const replaceDateToday = fs.readFileSync( targetFile, 'utf-8')
                         .replace( replaceDateRegExp, getYYYYMMDD() );




// targetFileの書き換えを実行                     
updateStyleCSS( targetFile, replaceDateToday );