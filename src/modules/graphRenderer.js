import * as d3 from 'd3';

const render = function render(weeks) {
  console.log("-------------------");

  var graph = d3.select('.js-graph');

  const GRAPH_WIDTH = 640,
    GRAPH_HEIGHT = 640,
    WEEK_SPACING = 0,
    WEEKS_IN_YEAR = 52,
    LEFT_LABEL_WIDTH = 20,
    COLOUR_PAST = '#ddd',
    COLOUR_PRESENT = '#FF8CC6',
    COLOUR_FUTURE = '#eee',
    COLOUR_18 = 'red';

  let x = LEFT_LABEL_WIDTH,
    y = 0 + WEEK_SPACING,
    cellWidth = ((GRAPH_WIDTH - LEFT_LABEL_WIDTH) / WEEKS_IN_YEAR) - WEEK_SPACING,
    cellHeight = ((GRAPH_HEIGHT - WEEK_SPACING) / Math.ceil(weeks.length / WEEKS_IN_YEAR)) - WEEK_SPACING,
    years = Math.ceil(weeks.length / WEEKS_IN_YEAR);

  var chart = d3.select(".js-graph")
    .attr("width", GRAPH_WIDTH)
    .attr("height", GRAPH_HEIGHT);

  let year = -1, // -1 because you don't turn 1 until the end of year 1.
    colour;

  chart.selectAll("g")
    .data(weeks)
    .enter().append("g")
    .attr("transform", function(d, i) {
      if (i % WEEKS_IN_YEAR === 0 && i !== 0) {
        y += cellHeight + WEEK_SPACING;
        x = LEFT_LABEL_WIDTH;
      }
      else if (i > 0) {
        x += cellWidth + WEEK_SPACING;
      }
      return "translate(" + x + "," + y + ")";
    })
    .append("rect")
    .attr("width", cellWidth)
    .attr("height", cellHeight)
    .style("fill", function(d, i) {

      // Update year.
      if (i % WEEKS_IN_YEAR === 0) {
        year++;
      }

      // Colour overrides.
      if (year === 18) {
        colour = COLOUR_18;
      }
      // Default colours.
      else {
        if (weeks[i].epoch === 'past') {
          colour = COLOUR_PAST
        }
        else if (weeks[i].epoch === 'present') {
          colour = COLOUR_PRESENT
        }
        else if (weeks[i].epoch === 'future') {
          colour = COLOUR_FUTURE
        }
      }

      return colour;
    })
    .style("stroke", "white");

  let heightScale = d3.scale.ordinal()
    .domain(d3.range(years).reverse())
    .rangeBands([GRAPH_HEIGHT, 0]);

  let yAxis = d3.svg.axis()
    .scale(heightScale)
    .orient('left')
    .tickValues(function() {
      //[1,10,18,20,30,40,50,60,70,80,88]
      let labels = [];
      for (let i = 0; i < years; i++) {
        if (i == 18 || i == years - 1) {
          labels.push(i);
        }
        if (i % 10 == 0) {
          labels.push(i);
        }
      }
      return labels;
    })
    ;

  chart.append('g')
    .attr("transform", "translate(" + LEFT_LABEL_WIDTH + "," + 0 + ")")
    .attr("class", "axis")
    .call(yAxis);

};

export default {
  render
}