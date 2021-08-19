// Reference: https://observablehq.com/@kerryrodden/equal-area-radial-matrix-of-lgbt-rights 

var drawChart = function(){

    /* DEFINE CHART SETTINGNS *************************************************************/

    // Font Style
    var fontFamily = "Georgia"; // "Tahoma", "Georgia", "American Typewriter", "Andalé Mono", "Trebuchet MS"
    var fontSize = 20;

    // SVG Size & Style
    const width = 500;
    const margin = 240;
    const innerWidth = width - (margin/2)
    const height = 500;
    const innerHeight = height - (margin/2)
    var bgColor = '#223a4c';
    
    // Line, Circle & Text Style
    var fill = "#0ad6ef";
    const strokeWidth = 6;
    const labelMargin = 20;
    const innerRadius = 60
    const outerRadius = innerWidth / 2 - 30

    // Animation 
    var delay =  400;

    /* PREPARE DATA ************************************************************************/

    var data = [
        {cat1: "A", cat2: "A1", metric1: 1, metric2: 3, metric3: 2}, 
        {cat1: "A", cat2: "A2", metric1: 3, metric2: 6, metric3: 4}, 
        {cat1: "B", cat2: "B1", metric1: 2, metric2: 7, metric3: 5}, 
        {cat1: "B", cat2: "B2", metric1: 5, metric2: 4, metric3: 2}, 
        {cat1: "C", cat2: "C1", metric1: 1, metric2: 3, metric3: 7}, 
        {cat1: "A", cat2: "A3", metric1: 1, metric2: 3, metric3: 2}, 
        {cat1: "C", cat2: "C2", metric1: 2, metric2: 7, metric3: 5}, 
        {cat1: "C", cat2: "C3", metric1: 5, metric2: 4, metric3: 2}, 
    ]

    var longData = []
    data.forEach(function(d) {
        longEntry = [
            {cat1: d.cat1, cat2: d.cat2, metric: "metric1", value: d.metric1},
            {cat1: d.cat1, cat2: d.cat2, metric: "metric2", value: d.metric2},
            {cat1: d.cat1, cat2: d.cat2, metric: "metric3", value: d.metric3}
        ]
        longData = longData.concat(longEntry)
    })

    console.log(longData)


    /* CREATE SVG  ************************************************************************/

    var metrics = [...new Set(longData.map(x => x.metric))]
    var metricsOrder = metrics.slice()

    var rotation = data.length * Math.PI;
    var x = d3
        .scaleBand()
        .domain(data.map(d => d.cat2))
        .range([rotation, 1.5 * Math.PI + rotation])
    
    var radiusScale = d3.scaleLinear // d3.scaleRadial
    var y = radiusScale()
        .domain([0, metrics.length])
        .range([innerRadius, outerRadius])

    var arc = d3.arc()
        .innerRadius(d => y(metricsOrder.indexOf(d.metric)))
        .outerRadius(d => y(metricsOrder.indexOf(d.metric) + 1))
        .startAngle(d => x(d.cat2))
        .endAngle(d => x(d.cat2) + x.bandwidth())
        .padRadius(innerRadius)
    
    // Create SVG container
    var svg = d3.select('#radial-matrix-chart')
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style('background-color', bgColor);
    
    const g = svg
        .append("g")
        .attr("transform", `translate( ${width/2} ,${height/2} )`)
        .selectAll("g")
        .data(longData)
        .join("g");
    
    // Append arc areas
    g.append("path")
        .attr("d", arc)
        .attr("fill", bgColor)
        .transition()
        .delay((d, i) => i * delay/3)
        .attr("stroke", bgColor)
        .attr("stroke-width", strokeWidth)
        .attr("fill", fill)
        .attr("fill-opacity", d => (1/d.value));

    // Append labels for columns
    labelX = (angle, radius) => Math.cos(angle) * radius
    labelY = (angle, radius) => Math.sin(angle) * radius
    cat2Labels = g =>
    g
        .attr("transform", `translate( ${width/2} ,${height/2} )`)
        .attr("text-anchor", "middle")
        .attr("fill", fill)
        .attr('font-family', fontFamily)
        .attr("font-size", fontSize)
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("x", d =>
            labelX(x(d.cat2) + x.bandwidth() / 2 - Math.PI / 2, outerRadius + labelMargin)
        )
        .attr("y", d =>
            labelY(x(d.cat2) + x.bandwidth() / 2 - Math.PI / 2, outerRadius + labelMargin)
        )
        .attr("dy", "0.31em")
        .text(d => d.cat2)
        svg.append("g").call(cat2Labels);

    // Append lables for each row    
    rowLables = g =>
        g
            .attr("transform", `translate( ${width/2} ,${height/2} )`)
            .attr("text-anchor", "middle")
            .attr("fill", fill)
            .attr('font-family', fontFamily)
            .attr("font-size", fontSize)
            .selectAll("text")
            .data(metrics)
                .join("text")
                .attr("x", -labelMargin*2)
                .attr("y", (d, i) => y(i)-outerRadius -labelMargin*2.2)
                .attr("dy", "0.31em")
                .text(d => d)
    svg.append("g").call(rowLables);
    
}

// Call function to draw the chart once window load is complete
window.addEventListener("load", drawChart)