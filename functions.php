<?php


//  管理画面以外でのadmin barを非表示
add_filter( 'show_admin_bar', '__return_false' );
//アイキャッチを有効
add_theme_support('post-thumbnails');
//カテゴリ名を取得する関数を登録
add_action( 'rest_api_init', 'register_category_name' );
function register_category_name() {
// register_rest_field関数を用いget_category_name関数からカテゴリ名を取得し、追加する
   register_rest_field( 'post',
       'category_name',
       array(
           'get_callback'    => 'get_category_name'
       )
   );
}
add_action( 'rest_api_init', 'api_add_fields' );
function api_add_fields() {
 register_rest_field( 'post',
   'thumbnail_url',
    array(
     'get_callback'    => 'register_fields',
     'update_callback' => null,
     'schema'          => null,
   )
 );
}
function register_fields( $post, $name ) {
 return get_the_post_thumbnail_url($post['id'], 'full');
}
//$objectは現在の投稿の詳細データが入る
function get_category_name( $object ) {
   $category = get_the_category($object[ 'id' ]);
   $cat_name = $category[0]->cat_name;
   return $cat_name;
}
// ページネーションのHTMLカスタマイズ
function pagenation($pages = '', $range = 5){
   $showitems = ($range);
   global $paged;
   if(empty($paged)) $paged = 1;
   if($pages == ''){
       global $wp_query;
       $pages = $wp_query->max_num_pages;
       if(!$pages){
           $pages = 1;
       }
   }
   if(1 != $pages){
       echo "<nav class=\"c-pagination\"><ul class=\"c-pagination__list\">";
       // 「前へ」を表示
       if($paged > 1) echo "<li class=\"c-pagination__prev\"><a class=\"link\" href='".get_pagenum_link($paged - 1)."'><svg class=\"svg svg--default\"><use xlink:href=\"#leftIconBC\"></svg><svg class=\"svg svg--over\"><use xlink:href=\"#leftIcon\"></svg><span class=\"u-for-pc\">前のページ</span></a></li>";
       // ページ番号を出力
       echo "<li class=\"c-pagination__item\">\n";
       for ($i=1; $i < $pages; $i++){
           if (1 != $pages &&( !($i >= $paged+$range || $i <= $paged-($range-4)) || $pages <= $showitems )){
               echo ($paged == $i)? "<li class=\"c-pagination__item\"><span>".$i."</span></li>": // 現在のページの数字はリンク無し
                   "<li class=\"c-pagination__item\"><a class=\"link\" href='".get_pagenum_link($i)."'>".$i."</a></li>";
           }
       }
 
       echo "</li>\n";
       // 「次へ」を表示
       if($paged < $pages) echo "<li class=\"c-pagination__next\"><a class=\"link\" href='".get_pagenum_link($paged + 1)."'><span class=\"u-for-pc\">次のページ</span><svg class=\"svg svg--default\"><use xlink:href=\"#rightIconBC\"></svg><svg class=\"svg svg--over\"><use xlink:href=\"#rightIcon\"></svg></a></li>";
       echo "</ul></nav>\n";
   }
}
function get_description() {
  // 記事ページの場合
 if(is_single()) {
 
   // 投稿画面で入力した抜粋を出力用の変数へ代入
   $description = get_the_excerpt();
 }

 // 抜粋が無い場合は通常通りキャッチフレーズを出力
 if(empty($description)) {
   $description = bloginfo('description');
 }

 return $description;
}
function mytheme_breadcrumb() {
	//HOME>と表示
	$sep = '<span>/</span>';
	echo '<li><a href="'.get_bloginfo('url').'" >トップページ</a></li>';
	echo $sep;
 
	//投稿記事ページとカテゴリーページでの、カテゴリーの階層を表示
	$cats = '';
	$cat_id = '';
	if ( is_single() ) {
		$cats = get_the_category();
		if( isset($cats[0]->term_id) ) $cat_id = $cats[0]->term_id;
	}
	else if ( is_category() ) {
		$cats = get_queried_object();
		$cat_id = $cats->parent;
	}
	$cat_list = array();
	while ($cat_id != 0){
		$cat = get_category( $cat_id );
		$cat_link = get_category_link( $cat_id );
		array_unshift( $cat_list, '<a href="'.$cat_link.'">'.$cat->name.'</a>' );
		$cat_id = $cat->parent;
	}
	foreach($cat_list as $value){
		echo '<li>'.$value.'</li>';
		echo $sep;
	}

	//現在のページ名を表示
	if ( is_singular() ) {
		if ( is_attachment() ) {
			previous_post_link( '<li>%link</li>' );
			echo $sep;
		}
		the_title( '<li>', '</li>' );
	}
	else if( is_archive() ) the_archive_title( '<li>', '</li>' );
	else if( is_search() ) echo '<li>検索 : 「'.get_search_query().'」</li>';
	else if( is_404() ) echo '<li>ページが見つかりません</li>';
}

// 記事内の先頭にある画像を取得
function catch_that_image() {
  global $post, $posts;
  $first_img = '';
  ob_start();
  ob_end_clean();
  $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);
  $first_img = $matches[1][0];

  if(empty($first_img)){ //Defines a default image
    $first_img = get_bloginfo('url')."/dist/assets/img/common/no-image.svg";
  }
  return $first_img;
}

/*	カスタム投稿のパーマリンク設定
https://libre-co.com/wordpress/custom_taxonomy_permalink/
-----------------------------------------------------*/
//カスタム投稿タイプのパーマリンクを投稿IDに変更する。
add_filter('post_type_link', 'generateCustomPostLink', 1, 2);
add_filter('rewrite_rules_array', 'addRewriteRules');

function generateCustomPostLink($link, $post){
 if($post->post_type === 'works'){
 //投稿IDに書き換えたパーマリンク文字列を返す
  return home_url('/works/'.$post->ID);
 } else {
  return $link;
 }
}

//投稿IDに書き換えたパーマリンクに対応したクエリルールを追加
function addRewriteRules($rules){
 $new_rule = array(
  'works/([0-9]+)/?$' => 'index.php?post_type=works&p=$matches[1]'
 );
 //ルール配列に結合
 return $new_rule + $rules;
}

//カスタム投稿（撮影事例）の「撮影事例」カテゴリを自動チェック



?>