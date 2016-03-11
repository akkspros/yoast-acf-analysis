(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function($) {
	$(document).ready(function() {
		/**
		 * Set up the Yoast ACF Analysis plugin
		 */
		YoastACFAnalysis = function() {
			// Register with YoastSEO
			YoastSEO.app.registerPlugin('yoastACFAnalysis', {status: 'ready'});
			YoastSEO.app.registerModification('content', this.addAcfFieldsToContent, 'yoastACFAnalysis', 5);

			this.analysisTimeout = 0;

			// Re-analyse SEO score each time the content of an ACF field is updated
			$(document).on('acf/setup_fields', this.bindListeners);
		};

		/**
		 * Bind listeners to text fields (input and textarea)
		 */
		YoastACFAnalysis.prototype.bindListeners = function() {
			$('#post-body, #edittag').find('input[type=text][id^=acf], textarea[id^=acf]').on('keyup paste cut blur', function() {
				if ( YoastACFAnalysis.analysisTimeout ) {
					window.clearTimeout(YoastACFAnalysis.analysisTimeout);
				}
				YoastACFAnalysis.analysisTimeout = window.setTimeout( function() { YoastSEO.app.pluginReloaded('yoastACFAnalysis'); }, 200 );
			});
		};

		/**
		 * Combine the content of all ACF fields on the page and add it to Yoast content analysis
		 *
		 * @param data Current page content
		 */
		YoastACFAnalysis.prototype.addAcfFieldsToContent = function(data) {
			var acf_content = ' ';
			
			$('#post-body, #edittag').find('input[type=text][id^=acf], textarea[id^=acf]').each(function() {
				acf_content += ' ' + $(this).val();
			});

			data = data + acf_content;

			return data.trim();
		};

		new YoastACFAnalysis();
	});
}(jQuery));
},{}]},{},[1]);
