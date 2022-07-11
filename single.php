<?php get_header(); ?>




    <!-- main -->
    <main class="single">




        <nav class="c-breadcrumbs local-breadcrumbs">
            <div class="c-breadcrumbs__inner">
                <div class="c-breadcrumbs__inline">
                    <ol class="c-breadcrumbs__list">
                        <li class="c-breadcrumbs__item"><a href="https://www.unipos.co.jp/" class="c-breadcrumbs__link">トップ<span class="for-pc">ページ</span></a><svg class="c-breadcrumbs__icon">
                                <use xlink:href="#rightIcon">
                            </svg></li>
                        <li class="c-breadcrumbs__item"><a href="https://www.unipos.co.jp/recruit/" class="c-breadcrumbs__link">採用情報</span></a><svg class="c-breadcrumbs__icon">
                                <use xlink:href="#rightIcon">
                            </svg></li>

                        <li class="c-breadcrumbs__item"><a href="/" class="c-breadcrumbs__link">Unipos Blog</span></a><svg class="c-breadcrumbs__icon">
                                <use xlink:href="#rightIcon">
                            </svg></li>


                        <li class="c-breadcrumbs__item"><span class="c-breadcrumbs__current" aria-current="page"><?php the_title(); ?></span></li>

                    </ol>
                </div>
            </div>
        </nav>




        <div class="hero">
            <div class="hero__image" style="background-image: url('<?php echo get_the_post_thumbnail_url( $page->ID ); ?>')"></div>
            <div class="posTitleDateWrap">
                <time class="postDate"><?php the_time('Y.m.d'); ?></time>
                <h1 class="c-title--lv2 postTitle"><?php the_title(); ?></h1>
            </div>
        </div>




        <article class="l-container l-container--800 singleContainer">

            <div class="singleContainer__lead"> <?php the_field('lead_paragraph'); ?></div>
            
            <?php the_content(); ?>

        </article>




    </main>
    <!-- /main -->



<?php get_footer(); ?>
