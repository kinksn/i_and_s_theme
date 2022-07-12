<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php bloginfo('name'); ?> <?php wp_title('|'); ?> | I&S Production</title>
  <meta name="description" content="<?php echo get_description(); ?>">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:site_name" content="<?php bloginfo('name'); ?> <?php wp_title('|'); ?>">
  <meta property="og:title" content="<?php bloginfo('name'); ?> <?php wp_title('|'); ?>">
  <meta property="og:description" content="<?php echo get_description(); ?>">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:domain" content="https://www.ins-production.com">
  <?php if ( has_post_thumbnail() && ( !is_home() && !is_front_page() )) : ?>
  <meta roperty="og:image" content="<?php the_post_thumbnail_url(); ?>">
  <meta name="twitter:image" content="<?php the_post_thumbnail_url(); ?>">
  <?php else: ?>
  <meta property="og:image" content="https://www.ins-production.com/assets/img/common/ogp.png">
  <meta name="twitter:image" content="https://www.ins-production.com/assets/img/common/ogp.png">
  <?php endif; ?>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&amp;family=Noto+Sans+JP:wght@400;700&amp;display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
  <link href="<?php bloginfo( 'stylesheet_directory' ); ?>/dist/assets/css/style.css" rel="stylesheet">
  <?php
    if(has_action('wp_head', '_admin_bar_bump_cb' )) remove_action('wp_head', '_admin_bar_bump_cb');
        wp_head();
  ?>
   <?php wp_head(); ?>
</head>
<body>
<header class="l-header">ヘッダー</header>
<main class="l-page"><iframe width="560" height="315" src="https://www.youtube.com/embed/1OKZOV-iLj4"></iframe></main>