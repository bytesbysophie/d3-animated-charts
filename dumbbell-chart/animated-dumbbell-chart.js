// Reference: https://observablehq.com/@blosky/animated-line-chart

var drawChart = function(){

    /* DEFINE CHART SETTINGNS *************************************************************/

    // Font Style
    var fontFamily = 'Comfortaa', cursive;// "Georgia"; // "Tahoma", "Georgia", "American Typewriter", "Andalé Mono", "Trebuchet MS"
    var fontSize = 30;

    // SVG Size & Style
    const width = 500;
    const margin = 240;
    const innerWidth = width - (margin)
    const height = 500;
    const innerHeight = height - (margin)
    var bgColor = '#223a4c';
    
    // Line, Circle & Text Style
    var fill = "#0ad6ef";
    const strokeWidth = 4;
    const circleRadius = 10;
    const labelMargin = 20;

    // Animation 
    var delay =  400;

    /* DEFINE DATA ************************************************************************/
    
    var data = [
        {key: "A", val1: 1, val2: 6}, 
        {key: "B", val1: 2, val2: 5}, 
        {key: "C", val1: 3, val2: 6}, 
        {key: "D", val1: 5, val2: 2}
    ]

    /* CREATE SVG  ************************************************************************/

    // Create SVG container
    var svg = d3.select('#dumbbell-chart')
        .append('svg')
        .attr("width", width)
        .attr("height", height)
        .style('background-color', bgColor);

    // Calc the max value out of all values (1 and 2) 
    maxVal = d3.max(data, function(d) { 
        return Math.max(d.val1, d.val2)
    })

    // Create axes & scale the range of the data
    var x = d3.scaleLinear()
        .range([0, innerWidth])
        .domain([0, maxVal * 1.2])
    var y = d3.scaleBand()
        .range([0, innerHeight])
        .domain(data.map(function(d){ return d.key }))

    var bandWidth = innerWidth/data.length*0.8

    // Create container for the dots
    var dotGroup = svg.append("g")
        .attr("transform", "translate(130,130)");


    // Create function for the axes transition
    var tweenDash = function()  {
        const l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t) };
    }

    var lines = dotGroup.selectAll("line")
        .data(data)
        .enter().append("line")
        // .attr("class", "lines")
        .attr("y1", function(d){ return y(d.key) + bandWidth/2; })
        .attr("x1", function(d){ return x(d.val1) })
        .attr("y2", function(d){ return y(d.key) + bandWidth/2; })
        .attr("x2", function(d){ return x(d.val2) })
        .attr("stroke-linecap", 'round')
        .attr("stroke", fill)
        .attr("stroke-width", strokeWidth)
        .transition()
        .duration(delay*data.length)
        .attrTween("stroke-dasharray", tweenDash)

    // Add dots at the beginning/ end of each line section
    dotGroup.append("g").selectAll(".dot-1")
        .data(data)
        .join("circle")
        .attr("class", ".dot-1")
        .attr("cx", d => x(d.val1))
        .attr("cy", d => y(d.key) + bandWidth/2)
        .attr("fill", fill)
        .attr("stroke", fill)
        .attr("stroke-width", strokeWidth)
        .attr("r", circleRadius * 0.1)
        .transition()
        .duration(delay)
        .attr("opacity", 1)
        .attr("r", circleRadius*1.4)
        .transition()
        .delay((d, i) => i * delay*0.1)
        .attr("r", circleRadius)

    dotGroup.append("g").selectAll(".dot-2")
        .data(data)
        .join("circle")
        .attr("class", ".dot-2")
        .attr("cx", d => x(d.val2))
        .attr("cy", d => y(d.key) + bandWidth/2)
        .attr("fill", bgColor)
        .attr("stroke", fill)
        .attr("stroke-width", strokeWidth)
        .attr("r", circleRadius * 0.1)
        .transition()
        .duration(delay)
        .attr("opacity", 1)
        .attr("r", circleRadius*1.4)
        .transition()
        .delay((d, i) => i * delay*0.1)
        .attr("r", circleRadius)

    // Label all dots with their value
    dotGroup.append("g").selectAll("text")
        .data(data)
        .join('text')
        .text(function(d) { return d.val1 })
        .attr("y", function(d) { return y(d.key) + bandWidth*0.7})
        .attr("x", function(d) { return x(d.val1) + getMargin(d.val1, d.val2) })
        .attr("fill", fill)
        .attr('font-family', fontFamily)
        .attr('opacity', 0)
        .attr("font-size", fontSize*0.5)
        .transition()
        .duration(delay)
        .attr('opacity', 1)
        .attr("font-size", fontSize*1.2)
        .transition()
        .duration(delay)
        .attr("font-size", fontSize)

    // Helper function that determines if the value lable should be placed above or below the line
    function getMargin(v1, v2) {
        return  v1 < v2 ? -1 * labelMargin * 2 : labelMargin
    }
    // // Create x Axes
    // var xAxisGenerator = d3.axisBottom(x)
    //     .tickSize(0)
    //     .tickValues([0, maxVal *1.2])
    //     .tickPadding(20)
    //     .tickFormat(d3.format(",.0f"))
    // var xAxis = dotGroup.append("g")
    //     .attr("transform", "translate(0," + innerHeight + ")")
    //     .call(xAxisGenerator)

    // // Append line for x axis
    // xAxis.selectAll("path")
    //     .attr("stroke-linecap", 'round')
    //     .attr("stroke", fill)
    //     .attr("stroke-width", 6)
    //     .transition()
    //     .duration(delay*data.length)
    //     .attrTween("stroke-dasharray", tweenDash)
    
    // // Append tick label for x axis
    // xAxis.selectAll(".tick text")
    //     .attr("fill",fill)
    //     .attr("font-family",fontFamily)
    //     .attr("font-size", fontSize*0.5)
    //     .transition()
    //     .delay((d, i) => i * delay)
    //     .attr('opacity', 1)
    //     .attr("font-size", fontSize*1.2)
    //     .transition()
    //     .delay((d, i) => i * delay*0.1)
    //     .attr("font-size", fontSize)

}

// Call function to draw the chart once window load is complete
window.addEventListener("load", drawChart)