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
				var width = el.clientWidth-30;
				var height = 600;

				elem.css({
					height: height+'px'
				});

				var svg = d3.select(el).append('svg')
					.attr('width', width)
					.attr('height', height);

				/*var topPlank = svg.append('rect')
					.attr('x',0)
					.attr('y',0)
					.attr('width', width)
					.attr('height', 20)
					.attr('fill', 'grey');*/

				//render days
				var xScale = d3.scale.linear()
					.domain([0, 700])
					.range([0, width]);
				var yScale = d3.scale.linear()
					.domain([0, 30*24])
					.range([0, height-30]);					
				
				for(var i=0;i<=6;i++) {
					var dayBox = svg.append('g')
						.on('mouseover', function(d) {
							var dayRect = d3.select(this);

							dayRect.selectAll('rect').transition().attr('fill', '#0c0');
						})
						.on('mouseout', function(d) {
							var dayRect = d3.select(this);
							dayRect.selectAll('rect').transition().attr('fill', '#ccc');
						});
					
					dayBox.append('rect')
						.attr('x', xScale(i*100))
						.attr('y', xScale(0))
						.attr('width', xScale(100))
						.attr('height', 20)
						.attr('stroke', '#666')
						.attr('fill', '#ccc');
						

					dayBox.append('text')
						.attr('x', xScale(i*100 + 50))
						.attr('y', 15)
						.attr('class', 'day-text')
						.text(i+1);

					svg.append('rect')
					.attr('x', xScale(i*100))
					.attr('y', 30)
					.attr('width', xScale(100))
					.attr('height', yScale(30*24))
					.attr('class', 'bg-content')
					.on('mouseout', function() {
						var selHour = svg.select('#sel-hour')[0];
						if(selHour[0] != null) {
							svg.select('#sel-hour').remove();
						}
					})
					.on('mousemove', function() {
						var mousePos = d3.mouse(this);
						var selHour = svg.select('#sel-hour')[0];
						if(selHour[0] === null) {
							svg.append('line')
								.attr('x1', 0)
								.attr('x2', xScale(700))
								.attr('y1', mousePos[1])
								.attr('y2', mousePos[1])
								.attr('class', 'day-line-sel')
								.attr('id','sel-hour');
						} else {
							//console.log(selHour[0]);
							d3.select(selHour[0]).attr('y1', mousePos[1]).attr('y2', mousePos[1]);
						}

					});
				}

				//render time

				

				for(var i=0; i<24; i++) {
					var hourBox = svg.append('g');
					hourBox.append('line')
						.attr('x1', 0)
						.attr('x2', xScale(700))
						.attr('y1', yScale(i*30)+30)
						.attr('y2', yScale(i*30)+30)
						.attr('class', 'day-line');
					hourBox.append('line')
						.attr('x1', 0)
						.attr('x2', xScale(700))
						.attr('y1', yScale(i*30+15)+30)
						.attr('y2', yScale(i*30+15)+30)
						.attr('class', 'day-mid-line');
				}
			}
		}
	}]);

