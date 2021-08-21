// Reference: https://www.d3-graph-gallery.com/graph/sankey_basic.html 

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
    const labelMargin = 6;
    const nodeWidth = 36;
    const nodePadding = 150;

    // Animation 
    var delay =  400;

    /* DEFINE DATA ************************************************************************/
    
    var data = {
        "nodes":[
        {"node":0,"name":"A"},
        {"node":1,"name":"B"},
        {"node":2,"name":"C"},
        {"node":3,"name":"E"}
        ],
        "links":[
        {"source":0,"target":2,"value":2},
        {"source":1,"target":2,"value":2},
        {"source":0,"target":3,"value":2},
        {"source":2,"target":3,"value":4}
    ]}

    /* CREATE SVG  ************************************************************************/

    // Create SVG container
    var svg = d3.select('#sankey-chart')
        .append('svg')
        .attr("width", width)
        .attr("height", height)
        .style('background-color', bgColor);

    // Create container for the dots
    var sankeyGroup = svg.append("g")
        .attr("transform", "translate(130,130)");

    // Set the sankey chart properties
    var sankey = d3.sankey()
        .nodeWidth(nodeWidth)
        .nodePadding(nodePadding)
        .size([innerWidth, innerHeight]);

    // Create a sankey generator with the default settings
    sankey
        .nodes(data.nodes)
        .links(data.links)
        .layout(1);

    // Create function for the axes transition
    var tweenDash = function()  {
        const l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t) };
    }
    // Add lines for each link
    var link = sankeyGroup.append("g")
        .selectAll(".link")
        .data(data.links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", sankey.link() )
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .sort(function(a, b) { return b.dy - a.dy; })
        .attr("fill", "None")
        .attr("stroke", fill)
        .attr("opacity", 0.3)
        .transition()
        .duration(delay*data.links.length)
        .attrTween("stroke-dasharray", tweenDash)

    // Create group elements for each node
    var node = sankeyGroup.append("g")
        .selectAll(".node")
        .data(data.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

    // Add the rectangles for each node
    node
        .append("rect")
        .attr("height", function(d) { return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", fill)
        // Add hover text
        .append("title")
        .text(function(d) { return d.name + "\n" + "There is " + d.value + " stuff in this node"; })

    // Add the title for each node
    node
    .append("text")
        .attr("x", -labelMargin)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < innerWidth / 2; })
        .attr("x", labelMargin + sankey.nodeWidth())
        .attr("text-anchor", "start")

    // Add transition/ animation to the node titles
    node
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
    
}

// Call function to draw the chart once window load is complete
window.addEventListener("load", drawChart)