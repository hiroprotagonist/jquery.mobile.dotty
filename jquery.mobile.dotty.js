/*
 * requires underscore
 */
(function($, window, undefined) {

	$.widget("mobile.dotty", $.mobile.widget, {
		resize_event: ('onorientationchange' in window) ?'orientationchange' :'resize',
		total: 0, // Number of Dots
		highlight_index: 0,
		fullsize_painter: null,
		smallsize_painter: null,
		_init: function () {
			// Caching painter instances
			this.fullsize_painter = FullsizePainter( this );
			this.smallsize_painter = SmallsizePainter( this );
			
			// There can only be one of my kind
			if ( this.element.data('initialized') ) {
				return;
			}
			this.element
				.addClass( 'dotty' )
				.data( 'initialized', true );
			$(window).bind( this.resize_event, $.proxy(function() {
				this.draw( this.highindex, this.total, true );
			}, this));
		},
		hide: function() {
			this._clearui();
		},
		draw: function( nof, total, forceredraw ) {
			this.highindex = nof;
			var painter = this._getPainter( total );
			// Optimization
			if ( this.total !== total || this.element.children().length === 0 || forceredraw ) {
				this.total = total;
				painter.drawdots( total );
				painter.highlight( nof );
			} else {
				painter.highlight( nof );
			}
		},
		_getPainter: function( totalDots ) {
			return ( window.innerWidth > ( totalDots * 24 + 150 ) )
				? this.fullsize_painter
				: this.smallsize_painter;
		},
		_clearui: function ( ) {
			this.element.empty();
		}
	});

	function FullsizePainter( widget ) {
		function drawdots ( total ) {
			widget._clearui();
			var el = widget.element;
			_(total).times( function( idx ) {
				el.append( $('<div class="dot">') );
			});
		}
		function highlight( n ) {
			$( '.pointer', widget.element ).removeClass( 'pointer' );
			if ( _.isNumber(n) ) {
				$( '.dot:nth-child(' + n + ')', widget.element).addClass( 'pointer' );
			}
		}
		return {
			drawdots: drawdots,
			highlight: highlight
		};
	}

	function SmallsizePainter( widget ) {
		function drawNumbers( total ) {
			widget._clearui();
			var el = widget.element
			  , currentPagenumber = $('<span class="n">')
			  , slash = $('<span class="seperator">').html( '/' )
			  , totalPagecount = $('<span class="total">').html( total );
			
			el.append([currentPagenumber, slash, totalPagecount]);
		}
		function drawCurrentPageNumber( n ) {
			$( '.n', this.element ).html( n );
		}
		return {
			drawdots: drawNumbers,
			highlight: drawCurrentPageNumber
		};
	}
	
	$(document).ready( function() {
		var pager = $( '<div data-role="dotty">' );
		$( 'body' ).append(pager);
		pager.dotty();
		$.Dotty = {
			draw: function(n, total) { pager.dotty( 'draw', n, total ); },
			hide: function() { pager.dotty( 'hide' ); }
		};
	});
	
})(jQuery, this);