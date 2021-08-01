// Reference: https://lvngd.com/blog/building-pictogram-grids-d3js/

var drawChart = function(){

    /* DEFINE CHART SETTINGNS *************************************************************/

    // Font Style
    var fontFamily = "Georgia"; // "Tahoma", "Georgia", "American Typewriter", "Andalé Mono", "Trebuchet MS"
    var fontSize = 60;

    // SVG Size & Style
    const width = 500;
    const height = 500;
    var bgColor = '#223a4c';
    
    // Circle Style
    var fill = "#0ad6ef";
    var inactiveOpacity = 0.22;
    var r = 11;
    
    // Grid Format 
    var numRows = 10;
    var numCols = 10;

    // Animation 
    var delay =  200;

    /* DEFINE DATA ************************************************************************/

    // The share of circles that should be highlighted
    var percentNumber = 42;

    // Generate the circles data: array of indices + "active" info for each cell in the grid
    var data =[];
    d3.range(numCols*numRows).forEach(function(d){
        data.push({"index": d, "percentNumber": d+1,"active": d < percentNumber})
    })

    console.log(data)

    /* CREATE SVG  ************************************************************************/

    // Create SVG container
    var svg = d3.select('#pictogram-chart')
        .append('svg')
        .attr("width", width)
        .attr("height", height)
        .style('background-color', bgColor);

    // Create axes with ranges referencing the number of rows and columns
    var y = d3.scaleBand()
        .range([0,250])
        .domain(d3.range(numRows));
    var x = d3.scaleBand()
        .range([0, 250])
        .domain(d3.range(numCols));

    // Create container for the grid
    var circleGrid = svg.append("g")
        .attr("transform", "translate(135,130)");

    // Append circles to grid container & stlyle them accorting to the data & percentNumber
    circles = circleGrid.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("id", function(d){return "id"+d.index;})
            .attr('cx', function(d){return x(d.index%numCols);})
            .attr('cy', function(d){return y(Math.floor(d.index/numCols));})
            .attr('r', r)
            .attr('fill', fill)
            .attr('opacity', inactiveOpacity)
            // Add transition that highlights one circle at a time
            .transition()
            .delay((d, i) => i * delay)
            .attr('opacity', (d) => d.active ? 1 : inactiveOpacity)

    // Create container for the percentage text
    var textGrid = svg.append('g')
        .attr("transform", "translate(370,100)");

    texts = textGrid.selectAll("text")
        .data(data)
        .enter().append("text")
        .text((d) => d.active ? d.percentNumber + "%" : "")
        .attr("text-anchor", "end")
        .attr('opacity', 0)
        .attr('font-family', fontFamily)
        .attr('fill', fill)
        .attr('font-size', fontSize * 0.8)
        // Add transition that fades in the counter
        .transition()
        .delay((d, i) => i * delay)
        .attr('opacity', 1)
        .attr('font-size', (d) => d.percentNumber < percentNumber ? fontSize * 0.8 : fontSize)
        // Add transition that fades out the counter
        .transition()
        .delay((d, i) => i / delay)
        .attr('opacity', (d) => d.percentNumber < percentNumber ? 0 : 1)
    
}

// Call function to draw the chart once window load is complete
window.addEventListener("load", drawChart)