// Reference: https://www.d3-graph-gallery.com/graph/hexbinmap_geo_label.html 

var drawChart = function(){

    /* DEFINE CHART SETTINGNS *************************************************************/

    // Font Style
    var fontFamily = 'Comfortaa', cursive;// "Georgia"; // "Tahoma", "Georgia", "American Typewriter", "Andalé Mono", "Trebuchet MS"
    var fontSize = 20;

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
    const binScale = 550;
    const labelMargin = 20;

    // Animation 
    var delay =  400;

    /* DEFINE DATA ************************************************************************/
    
    // Data from https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/us_states_hexgrid.geojson.json 
    var data = {"type": "FeatureCollection", "features": [
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-91.685852,39.530104],[-88.962979,38.307039],[-88.962979,35.798214],[-91.685852,34.512972],[-94.408726,35.798214],[-94.408726,38.307039],[-91.685852,39.530104]]]},"properties":{"value":41.5,"name":"A"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-88.962979,43.071698],[-86.240105,41.912567],[-86.240105,39.530104],[-88.962979,38.307039],[-91.685852,39.530104],[-91.685852,41.912567],[-88.962979,43.071698]]]},"properties":{"value":45.6,"name":"B"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-94.408726,43.071698],[-91.685852,41.912567],[-91.685852,39.530104],[-94.408726,38.307039],[-97.131599,39.530104],[-97.131599,41.912567],[-94.408726,43.071698]]]},"properties":{"value":59.5,"name":"C"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-99.854473,43.071698],[-97.131599,41.912567],[-97.131599,39.530104],[-99.854473,38.307039],[-102.577346,39.530104],[-102.577346,41.912567],[-99.854473,43.071698]]]},"properties":{"value":47.7,"name":"D"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-83.517232,43.071698],[-80.794358,41.912567],[-80.794358,39.530104],[-83.517232,38.307039],[-86.240105,39.530104],[-86.240105,41.912567],[-83.517232,43.071698]]]},"properties":{"value":60.9,"name":"E"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-91.685852,46.419873],[-88.962979,45.325375],[-88.962979,43.071698],[-91.685852,41.912567],[-94.408726,43.071698],[-94.408726,45.325375],[-91.685852,46.419873]]]},"properties":{"value":49.8,"name":"F"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-94.408726,35.798214],[-91.685852,34.512972],[-91.685852,31.882459],[-94.408726,30.53798],[-97.131599,31.882459],[-97.131599,34.512972],[-94.408726,35.798214]]]},"properties":{"value":48.1,"name":"G"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-88.962979,35.798214],[-86.240105,34.512972],[-86.240105,31.882459],[-88.962979,30.53798],[-91.685852,31.882459],[-91.685852,34.512972],[-88.962979,35.798214]]]},"properties":{"value":34.9,"name":"H"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-80.794358,39.530104],[-78.071485,38.307039],[-78.071485,35.798214],[-80.794358,34.512972],[-83.517232,35.798214],[-83.517232,38.307039],[-80.794358,39.530104]]]},"properties":{"value":null,"name":"I"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-78.071485,43.071698],[-75.348611,41.912567],[-75.348611,39.530104],[-78.071485,38.307039],[-80.794358,39.530104],[-80.794358,41.912567],[-78.071485,43.071698]]]},"properties":{"value":61,"name":"J"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-86.240105,39.530104],[-83.517232,38.307039],[-83.517232,35.798214],[-86.240105,34.512972],[-88.962979,35.798214],[-88.962979,38.307039],[-86.240105,39.530104]]]},"properties":{"value":26.6,"name":"K"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-105.30022,35.798214],[-102.577346,34.512972],[-102.577346,31.882459],[-105.30022,30.53798],[-108.023093,31.882459],[-108.023093,34.512972],[-105.30022,35.798214]]]},"properties":{"value":44.3,"name":"L"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-97.131599,46.419873],[-94.408726,45.325375],[-94.408726,43.071698],[-97.131599,41.912567],[-99.854473,43.071698],[-99.854473,45.325375],[-97.131599,46.419873]]]},"properties":{"value":49.1,"name":"M"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-94.408726,49.57439],[-91.685852,48.544312],[-91.685852,46.419873],[-94.408726,45.325375],[-97.131599,46.419873],[-97.131599,48.544312],[-94.408726,49.57439]]]},"properties":{"value":27.7,"name":"N"}},
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-86.240105,46.419873],[-83.517232,45.325375],[-83.517232,43.071698],[-86.240105,41.912567],[-88.962979,43.071698],[-88.962979,45.325375],[-86.240105,46.419873]]]},"properties":{"value":60.6,"name":"O"}},
        ]}

    /* CREATE SVG  ************************************************************************/

    // Create SVG container
    var svg = d3.select('#hexbin-map')
        .append('svg')
        .attr("width", width)
        .attr("height", height)
        .style('background-color', bgColor);

    // Create container for the map
    var mapGroup = svg.append("g")
        .attr("transform", `translate(` + width/0.77 + `,` + height/1.2 + `)`);

    // Set the map projection
    const projection = d3.geoMercator()
        .scale(binScale) // This is the zoom
        // .translate([margin, margin]); // You have to play with these values to center your map

    // Create the path generator
    const path = d3.geoPath()
        .projection(projection)

    const opacity = d3.scaleLinear()
        .domain([0, d3.max(data.features, function(d) { return d.properties.value})])
        .range([0, 1])

    // Draw the map
    mapGroup.append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
            .attr("fill", fill)
            .attr("d", path)
            .attr("stroke", bgColor)
            .attr("stroke-width", strokeWidth)
            .attr("fill-opacity", 0)
            .transition()
            .delay((d, i) => i * delay)
            .attr("fill-opacity", d => opacity(d.properties.value))

    // Add the labels
    mapGroup.append("g")
        .selectAll("labels")
        .data(data.features)
        .join("text")
            .attr("x", function(d){return path.centroid(d)[0]})
            .attr("y", function(d){return path.centroid(d)[1]})
            .text(function(d){ return d.properties.name})
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "central")
            .attr("fill", bgColor)
            .attr("font-weight", 600)
            .attr('font-family', fontFamily)
            .attr('opacity', 0)
            .attr("font-size", fontSize*0.5)
            .transition()
            .delay((d, i) => i * delay/2)
            .attr('opacity', 1)
            .attr("font-size", fontSize*1.5)
            .transition()
            .delay((d, i) => i * delay/2)
            .attr("font-size", fontSize)

}

// Call function to draw the chart once window load is complete
window.addEventListener("load", drawChart)