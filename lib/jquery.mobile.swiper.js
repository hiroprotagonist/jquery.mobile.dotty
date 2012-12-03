/*
 * jquery.mobile.inputassistant v1
 *
 * Copyright (c) 2012, Abas Software AG, Volker Krebs
 * Dual licensed under the MIT and GPL Version 2 licenses.
 * 
 * This widget is applied to all data-role="page" but only when a data-swipeleft or
 * data-swiperight is also present.
 * 
 * data-swiperight and data-swipeleft are elements that can be put into changePage as a parameter.
**/
(function ($, window, undefined) {
	$.widget("mobile.swiper", $.mobile.widget, {
		options:{
			swipeleft:null,
			swiperight:null
		},
		_init: function () {
			//console.log(this.options.swipeleft);
			//console.log(this.options.swiperight);
			if (this.options.swipeleft !== null) {
				this.element.on('swipeleft', $.proxy(this.swipeleft, this));
			}
			if (this.options.swiperight !== null) {
				this.element.on('swiperight', $.proxy(this.swiperight, this));
			}
		},
		swipeleft: function () {
			// when the toPage begins with #, we have a locale anchor. Reload is not needed.
			// otherwise we should reload, because we have a dynamic webapp
			var reloadPage = !(this.options.swipeleft.slice(0,1) == '#');
			//console.log("swipe left to " + this.options.swipeleft + " (reload=" + reloadPage + ")");
			$.mobile.changePage( this.options.swipeleft, { 
				transition: "slide",
				reloadPage: reloadPage
			} );
		},
		swiperight: function () {
			// when the toPage begins with #, we have a locale anchor. Reload is not needed.
			// otherwise we should reload, because we have a dynamic webapp
			var reloadPage = !(this.options.swiperight.slice(0,1) == '#');
			//console.log("swipe right to " + this.options.swiperight + " (reload=" + reloadPage + ")");
			$.mobile.changePage( this.options.swiperight, { 
				transition: "slide",
				reverse: true,
				reloadPage: reloadPage
			} );
		}
	});

	$(":jqmData(role='page')").live("pageinit", function () {
		var page = $(this);
		var swleft = page.data('swipeleft');
		var swright = page.data('swiperight');
		if (swleft !== undefined || swright !== undefined) {
			//apply our widget if swipeleft or swiperight is defined.
			page.swiper();
		}
	});
})(jQuery, this);