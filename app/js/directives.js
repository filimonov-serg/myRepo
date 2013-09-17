'use strict';

/* Directives */


angular.module('myApp.directives', []).
	directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
		elm.text(version);
		};
	}]).
	directive('calPaper', [function() {
		return {
			restrtict: 'A',
			link: function(scope, elem, attrs) {
				var el = elem[0];
				elem.css({
					height: '100px'
				});
				console.log($(elem))
			}
		}
	}]);

