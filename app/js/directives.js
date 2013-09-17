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
					.domain([0, 60*24])
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

					
				}

				//render time

				

				for(var i=0; i<24; i++) {
					var hourBox = svg.append('g');
					hourBox.append('line')
						.attr('x1', 0)
						.attr('x2', xScale(700))
						.attr('y1', yScale(i*60)+30)
						.attr('y2', yScale(i*60)+30)
						.attr('class', 'day-line');
					hourBox.append('line')
						.attr('x1', 0)
						.attr('x2', xScale(700))
						.attr('y1', yScale(i*60+30)+30)
						.attr('y2', yScale(i*60+30)+30)
						.attr('class', 'day-mid-line');
				}

				var isMouseDown = false;
				var lastY = 0;
				var phaseData = [0];
				
				for(var i=0;i<=6;i++) {
					var dayBox = svg.append('rect')
						.attr('x', xScale(i*100))
						.attr('y', 30)
						.attr('width', xScale(100))
						.attr('height', yScale(60*24))
						.attr('class', 'bg-content')
						.on('mousedown', function() {
							d3.event.stopPropagation();
							isMouseDown = true;
							var mousePos = d3.mouse(this);
							lastY = mousePos[1];
							var phases = svg.selectAll("rect.phase")
								.data(phaseData)
								.enter()
								.append("rect");
							phases
								.attr('x', 0)
								.attr('y', mousePos[1])
								.attr('width', xScale(90))
								.attr('height', function(d) { return d; })
								.attr('class', 'phase');

						})
						.on('mousemove', function(e) {
							if(isMouseDown) {
								var mousePos = d3.mouse(this);
								phaseData[0] = mousePos[1]-lastY;
								
								var phases = svg.select("rect.phase")
									.data(phaseData);
								phases.enter()
									.append('rect')
									.attr('x', 0)
									.attr('y', mousePos[1])
									.attr('width', xScale(90))
									.attr('height', mousePos[1]-lastY)
									.attr('class', 'phase');

								console.log(svg.selectAll("rect.phase"));
							}
						});
				}
			}
		}
	}]);

