/*
 * requires underscore
 */
(function($, window, undefined) {
	$.widget("mobile.dotty", $.mobile.widget, {
		total: 0, // Number of Dots
		highlight_index: 0,
		_init: function () {
			// There can only be one of my kind
			if ( this.element.data('initialized') ) {
				return;
			}
			this.element
				.addClass( 'dotty' )
				.data( 'initialized', true );
			$(window).resize($.proxy(function() {
				this.draw( this.highindex, this.total, true );
			}, this));
		},
		draw: function( nof, total, forceredraw ) {
			this.highindex = nof;
			var painter = this._getPainter( total );
			// Optimization
			if ( this.total !== total || forceredraw) {
				this.total = total;
				painter.drawdots( nof, total );
				painter.highlight( nof );
			} else {
				painter.highlight( nof );
			}
		},
		_getPainter: function( totalDots ) {
			var margin = 150;
			if ( window.innerWidth > ( totalDots * 24 + margin ) ) {
				return {
					drawdots: $.proxy(this._drawdots_pretty, this),
					highlight: $.proxy(this._highlight_pretty, this)
				};
			} else {
				return {
					drawdots: $.proxy(this._drawdots_spartan, this),
					highlight: $.proxy(this._highlight_spartan, this)
				};
			}
		},
		_drawdots_pretty: function ( nof, total ) {
			this._clearui();
			var el = this.element;
			_(total).times( function( idx ) {
				el.append( $('<div class="dot">') );
			});
		},
		_highlight_pretty: function ( n ) {
			$( '.pointer', this.element ).removeClass( 'pointer' );
			$( '.dot:nth-child(' + n + ')', this.element).addClass( 'pointer' );						
		},
		_drawdots_spartan: function( nof, total ) {
			this._clearui();
			var el = this.element
			  , n = $('<span class="n">').html( nof )
			  , seperator = $('<span class="seperator">').html( '/' )
			  , total = $('<span class="total">').html( total );
			el.append([n,seperator,total]);
		},
		_highlight_spartan: function ( n ) {
			$( '.n', this.element ).html( n );
		},
		_clearui: function ( ) {
			this.element.empty();
		}
	});

	$(document).ready( function() {
		var pager = $( '<div data-role="dotty">' );
		$( 'body' ).append(pager);
		pager.dotty();
		$.Dotty = function(nthof, total) {
			pager.dotty( 'draw', nthof, total );
		};
	});
	
})(jQuery, this);


