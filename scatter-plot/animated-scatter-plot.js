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
    var minR = 8;
    var maxR = 16;

    // Animation 
    var delay =  200;

    /* DEFINE DATA ************************************************************************/

    var data = [
        {'val1': 1, 'val2': 3, 'val3': 3}, 
        {'val1': 2, 'val2': 6, 'val3': 4}, 
        {'val1': 3, 'val2': 2, 'val3': 1}, 
        {'val1': 4, 'val2': 8, 'val3': 1}
    ]

    /* CREATE SVG  ************************************************************************/

    // Create SVG container
    var svg = d3.select('#scatter-plot')
        .append('svg')
        .attr("width", width)
        .attr("height", height)
        .style('background-color', bgColor);

    // Create axes 
    var x = d3.scaleLinear().range([0, innerWidth]);
    var y = d3.scaleLinear().range([innerHeight, 0]);
    var r = d3.scaleLinear().range([minR, maxR]);

    // Scale the range of the data
    x.domain([0, d3.max(data, function(d) { return d.val1 }) * 1.1]);
    y.domain([0, d3.max(data, function(d) { return d.val2 }) * 1.1])    
    r.domain([0, d3.max(data, function(d) { return d.val3 })]);

    // Create container for the grid
    var dotGrid = svg.append("g")
        .attr("transform", "translate(130,130)");

    // Add cisrcles to the dot grid
    dotGrid.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", function(d){ return x(d.val1) })
        .attr("cy", function(d){ return y(d.val2); })
        .attr("r", function(d){ return r(d.val3 * 0.5); })
        .attr("fill", fill)
        .attr("opacity", inactiveOpacity)
        .transition()
        .delay((d, i) => i * delay)
        .attr("r", function(d){ return r(d.val3 * 2); })
        .attr("opacity", 1)
        .transition()
        .delay((d, i) => i * delay)
        .attr("r", function(d){ return r(d.val3); })

    // Create function for the axes transition
    var tweenDash = function()  {
        const l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t) };
    }

    // Create x Axes
    var xAxisGenerator = d3.axisBottom(x)
        .tickSize(0)
        .tickValues([d3.max(data, function(d) { return d.val1 })])
        .tickPadding(20)
        .tickFormat(d3.format(",.0f"))
    var xAxis = dotGrid.append("g")
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(xAxisGenerator)

    // Append line for x axis
    xAxis.selectAll("path")
        .attr("stroke-linecap", 'round')
        .attr("stroke", fill)
        .attr("stroke-width", 6)
        .transition()
        .duration(delay*data.length)
        .attrTween("stroke-dasharray", tweenDash)
    
    // Append tick label for x axis
    xAxis.selectAll(".tick text")
        .attr("fill",fill)
        .attr("font-family",fontFamily)
        .attr("font-size", fontSize*0.5)
        .transition()
        .delay((d, i) => i * delay)
        .attr('opacity', 1)
        .attr("font-size", fontSize*1.2)
        .transition()
        .delay((d, i) => i * delay*0.1)
        .attr("font-size", fontSize)

    // Create y Axes
    var yAxisGenerator = d3.axisLeft(y)
        .tickSize(0)
        .tickValues([d3.max(data, function(d) { return d.val2 })])
        .tickPadding(20)
        .tickFormat(d3.format(",.0f"))
    var yAxis = dotGrid.append("g")
        .call(yAxisGenerator)
    
    // Append line for y axis
    yAxis.selectAll("path")
        .attr("stroke-linecap", 'round')
        .attr("stroke", fill)
        .attr("stroke-width", 6)
        .transition()
        .duration(delay*data.length)
        .attrTween("stroke-dasharray", tweenDash)

    // Append tick label for y axis
    yAxis.selectAll(".tick text")
        .attr("fill",fill)
        .attr("font-family",fontFamily)
        .attr("font-size", fontSize*0.5)
        .transition()
        .delay((d, i) => i * delay)
        .attr('opacity', 1)
        .attr("font-size", fontSize*1.2)
        .transition()
        .delay((d, i) => i * delay*0.1)
        .attr("font-size", fontSize)
}

// Call function to draw the chart once window load is complete
window.addEventListener("load", drawChart)