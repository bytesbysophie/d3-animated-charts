var drawChart = function(){

    /* DEFINE CHART SETTINGNS *************************************************************/

    // Font Style
    var fontFamily = "Georgia"; // "Tahoma", "Georgia", "American Typewriter", "Andalé Mono", "Trebuchet MS"
    var fontSize = 40;

    // SVG Size & Style
    const width = 500;
    const widthOffset = 130;
    const innerWidth = width - (widthOffset*2)
    const height = 500;
    const heightOffset = 130;
    const innerHeight = height - (heightOffset*2)
    var bgColor = '#223a4c';
    
    // Circle Style
    var fill = "#0ad6ef";
    var inactiveOpacity = 0.22;
    var r = 11;

    // Animation 
    var delay =  200;

    /* DEFINE DATA ************************************************************************/

    var data = [
        {'key': "A", 'value': 10}, 
        {'key': "B", 'value': 7}, 
        {'key': "C", 'value': 6}, 
        {'key': "D", 'value': 4}
    ]

    /* CREATE SVG  ************************************************************************/

    // Create SVG container
    var svg = d3.select('#bar-chart')
        .append('svg')
        .attr("width", width)
        .attr("height", height)
        .style('background-color', bgColor);

    // Create axes 
    var x = d3.scaleBand().range([0, innerWidth]);
    var y = d3.scaleLinear().range([innerHeight, 0]);

    // Scale the range of the data
    x.domain(data.map(function(d){ return d.key }));
    y.domain([0, d3.max(data, function(d) { return d.value })])
    
    // Create container for the grid
    var barGrid = svg.append("g")
        .attr("transform", "translate(130,130)");

    // Calculate Bar Width
    var barWidth = innerWidth/data.length*0.8

    // Add bars to the bar grid
    barGrid.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("x", function(d){ return x(d.key) })
        .attr("y", function(d){ return y(d.value); })
        .attr("ry", 10)
        .attr("height", function(d){ return innerHeight - y(d.value)})
        .attr("width", () => {return barWidth})
        .attr("fill", fill)
        .attr("opacity", 0.2)
        // Add transition that fades in the bars
        .transition()
        .delay((d, i) => i * delay)
        .attr("opacity", 1)

    // Append value as text to the end of each bar
    barGrid.selectAll("text")
        .data(data)
        .enter().append("text")
        .text((d) => d.value)
        .attr("x", (d) => x(d.key) + barWidth*0.5)
        .attr("y", (d) => y(d.value)-15)
        .attr("text-anchor", "middle")
        .attr('font-family', fontFamily)
        .attr('fill', fill)
        .attr('font-size', fontSize * 0.0)
        .attr('opacity', 0)
        // Add transition that fades in the numbers
        .transition()
        .delay((d, i) => i * delay)
        .attr('font-size', fontSize)
        .attr('opacity', 1)

    
}

// Call function to draw the chart once window load is complete
window.addEventListener("load", drawChart)