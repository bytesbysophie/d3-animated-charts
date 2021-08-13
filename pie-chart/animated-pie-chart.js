// Reference: https://www.d3-graph-gallery.com/graph/pie_changeData.html

var drawChart = function(){

    /* DEFINE CHART SETTINGNS *************************************************************/

    // Font Style
    var fontFamily = "Georgia"; // "Tahoma", "Georgia", "American Typewriter", "Andalé Mono", "Trebuchet MS"
    var fontSize = 30;

    // SVG Size & Style
    const width = 500;
    const margin = 240;
    const innerWidth = width - (margin)
    const height = 500;
    const innerHeight = height - (margin)
    var bgColor = '#223a4c';
    
    // Pie Size
    var fill = "#0ad6ef";
    const r = Math.min(innerWidth, innerHeight) / 2;
    const innerR = 60;
    const sliceMargin = '10px';

    // Animation 
    var delay =  400;

    /* DEFINE DATA ************************************************************************/

    var data = [
        {key: "A", value: 10}, 
        {key: "B", value: 20}, 
        {key: "C", value: 40}, 
    ]

    /* CREATE SVG  ************************************************************************/

    // Create SVG container
    var svg = d3.select('#pie-chart')
        .append('svg')
        .attr("width", width)
        .attr("height", height)
        .style('background-color', bgColor);
        
    // Create container for the pie
    var pieGroup = svg.append("g")
        .attr("transform", `translate(${width/2}, ${height/2})`);

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        .value(function(d) {return d.value; })
        .sort(function(a, b) { return d3.ascending(a.key, b.key);} )
    const pathData = pie(data)

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
        .innerRadius(innerR)
        .outerRadius(r)
        
    var arcGeneratorTransition = d3.arc()
        .innerRadius(innerR * 0.6)
        .outerRadius(r * 0.6)

    // Create a path for each slice using the arc function
    pieGroup.selectAll("slices")
        .data(pathData)
        .join('path')
        .attr('fill', fill)
        .attr("stroke", bgColor)
        .style("stroke-width", sliceMargin)
        .style("opacity", 0.2) 
        .attr('d', arcGeneratorTransition)
        .transition()
        .delay((d, i) => i * delay)
        .attr('d', arcGenerator)
        .style("opacity", 1) 

    // Append value as text to center of each slice
    pieGroup.selectAll('slices')
        .data(pathData)
        .join('text')
        .text(function(d) {return d.value; })
        .style("text-anchor", "middle")
        .attr('fill', bgColor)
        .attr('font-family', fontFamily)
        .attr('opacity', 0.2)
        .attr("font-size", fontSize*0.5)
        .attr('d', arcGeneratorTransition)
        .attr("transform", function(d) { return `translate(${arcGeneratorTransition.centroid(d)})`})
        .transition()
        .delay((d, i) => i * delay)
        .attr('opacity', 1)
        .attr("font-size", fontSize)
        .attr('d', arcGenerator)
        .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
}

// Call function to draw the chart once window load is complete
window.addEventListener("load", drawChart)