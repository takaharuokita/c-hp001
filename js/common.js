/* ===========================================
common.js
=========================================== */

/* var
------------------------------------- */
var speed = 300;

/*===========================================
function
=========================================== */
(function($){
"use strict";

/* smoothScroll
------------------------------------- */
$('a[href^="#"]').on('click',function(){
	var href= $(this).attr('href');
	var target = $(href === '#' || href === '' ? 'html' : href);
	var position = target.offset().top;
	$('body,html').animate({scrollTop:position}, speed, 'swing');
	return false;
});

/* toggle
------------------------------------- */
if ($('.js-toggle-tit').length) {
    $('.js-toggle-tit').on('click', function() {
    	$(this).toggleClass('open');
    	$(this).next('.js-toggle-content').slideToggle('ease');
    });
}
  
if ($('.js-toggle-tit-sp').length) {
    $('.js-toggle-tit-sp').on('click', function() {
      if (matchMedia('(max-width: 798px)').matches) {
        // ウィンドウサイズが798px以下のとき
        $(this).toggleClass('open');
        $(this).next('.js-toggle-content').slideToggle('ease');
      }
    });
}


/* hamburger menu
------------------------------------- */
var $gnav_btn = $('.js-gnav-btn'),
	$close_btn = $('.js-close-btn'),
	$gnav_con = $('.js-gnav-content'),
	class_open = 'is_open';

$('.js-gnav-btn, .js-close-btn').on('click',function(){
	if($gnav_btn.hasClass(class_open)){
		//close
		$gnav_btn.removeClass(class_open);
		$gnav_con.removeClass(class_open);
	}else{
		//open
		$(this).addClass(class_open);
		$gnav_con.addClass(class_open);
	}
});

/* js-switch-img
------------------------------------- */
var imageSwitch = true;
if(imageSwitch){
	$(function() {
		var replaceWidth = 769;
		function imageSwitch(){
			var windowWidth = parseInt($(window).width());
			$('img[src*="_sp."],img[src*="_pc."]').each(function(){
				if(windowWidth >= replaceWidth){
					$(this).attr('src',$(this).attr('src').replace('_sp.', '_pc.'));
				}else{
					$(this).attr('src',$(this).attr('src').replace('_pc.', '_sp.'));
				}
			});
		}
		imageSwitch();
		var resizeTimer;
		$(window).on('resize',function(){
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function(){
				imageSwitch();
			},200);
		});
	});
}

/* gNav
------------------------------------- */
$(function() {
  var $win = $(window),
      $main = $('#main'),
      $nav = $('#gNav'),
			$headerH = $('#gHeader').height(),
      navHeight = '62px',
      navPos = $nav.offset().top + 62,
      fixedClass = 'is-fixed';
	
	$win.on('load resize', function(){
		if ($('#home').length) {
//				navHeight = '0';
				navPos = $('#main').offset().top - 62;
		}else{
			var myWindowWidth = $win.width();
			if(myWindowWidth < 769){
//				navHeight = '0';
				$('#gHeader').css('height', 'auto');
			}else{
//				navHeight = '62px';
				$('#gHeader').css('height', $headerH);
			}
		}
	});	
	
  $win.on('load scroll', function() {
    var value = $(this).scrollTop();
    if ( value > navPos ) {
      $nav.addClass(fixedClass);
//      $main.css('margin-top', navHeight);
    } else {
      $nav.removeClass(fixedClass);
//      $main.css('margin-top', '0');
    }
  });
});

})(jQuery);