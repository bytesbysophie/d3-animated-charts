// Reference: https://observablehq.com/@blosky/animated-line-chart

var drawChart = function(){

    /* DEFINE CHART SETTINGNS *************************************************************/

    // Font Style
    var fontFamily = "Georgia"; // "Tahoma", "Georgia", "American Typewriter", "Andalé Mono", "Trebuchet MS"
    var fontSize = 40;

    // SVG Size & Style
    const width = 500;
    const margin = 240;
    const innerWidth = width - (margin)
    const height = 500;
    const innerHeight = height - (margin)
    var bgColor = '#223a4c';
    
    // Line, Circle & Text Style
    var fill = "#0ad6ef";
    const strokeWidth = 6;
    const circleRadius = 10;
    const labelMargin = 30;

    // Animation 
    var delay =  400;

    /* DEFINE DATA ************************************************************************/
    
    const dateFormat = d3.timeParse("%Y-%m-%d")
    var data = [
        {key: dateFormat('2021-01-01'), value: 0}, 
        {key: dateFormat('2021-01-02'), value: 6}, 
        {key: dateFormat('2021-01-03'), value: 4}, 
        {key: dateFormat('2021-01-04'), value: 12}, 
        {key: dateFormat('2021-01-05'), value: 9}, 
    ]

    /* CREATE SVG  ************************************************************************/

    // Create SVG container
    var svg = d3.select('#line-chart')
        .append('svg')
        .attr("width", width)
        .attr("height", height)
        .style('background-color', bgColor);

    // Create container for the pie
    var lineGroup = svg.append("g")
        .attr("transform", `translate( ${margin/2} ,${margin/2} )`);

    // Create axes & scale the range of the data
    var x = d3.scaleTime()
        .range([0, innerWidth/4])
        .domain(data.map(function(d){ return d.key }))
    var y = d3.scaleLinear()
        .range([innerHeight, 0])
        .domain([0, d3.max(data, function(d) { return d.value })])

    // Create path generator
    var line =  d3.line()
        .x(function(d) { return x(d.key) })
        .y(function(d) { return y(d.value) })

    // Create function for the line transition
    var tweenDash = function()  {
        const l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t) };
    }

    // Create a path for each slice using the arc function
    path = lineGroup.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", fill)
        .attr("stroke-width", strokeWidth)
        .attr('class', 'simple-line')
        .transition()
            .duration(delay*data.length)
            .attrTween("stroke-dasharray", tweenDash)
            // .on("end", () => { d3.select('.simple-line').call(transition); });  // Add looping

    // Add dots at the beginning/ end of each line section
    circles = lineGroup.append("g").selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.key))
        .attr("cy", d => y(d.value))
        .attr("r", circleRadius)
        .attr("fill", fill)
        .attr("opacity", 0.2)
        .transition()
        .delay((d, i) => i * delay)
        .attr("opacity", 1)
        .attr("r", circleRadius*1.2)
        .transition()
        .delay((d, i) => i * delay*0.1)
        .attr("r", circleRadius)

    // Label all dots with their value
    labels = lineGroup.append("g").selectAll("text")
        .data(data)
        .join('text')
        .text(function(d) { return d.value })
        .attr("x", function(d) { return x(d.key) -18})
        .attr("y", function(d, i) { return y(d.value) + getYMargin(data, d, i) })
        .attr("fill", fill)
        .attr('font-family', fontFamily)
        .attr('opacity', 0)
        .attr("font-size", fontSize*0.5)
        .transition()
        .delay((d, i) => i * delay)
        .attr('opacity', 1)
        .attr("font-size", fontSize*1.2)
        .transition()
        .delay((d, i) => i * delay*0.1)
        .attr("font-size", fontSize)

    // Helper function that determines if the value lable should be placed above or below the line
    function getYMargin(data, d, i) {
        // If the text labels a peak place the value above the line otherwise below
        if(i == 0 || (data[i-1] && data[i-1].value < d.value)){
            return -1 * labelMargin
        } else {
            return +50
        }
    }
}

// Call function to draw the chart once window load is complete
window.addEventListener("load", drawChart)