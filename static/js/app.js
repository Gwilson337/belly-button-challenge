// Function to initialize the dashboard
function init() {
    let dropDown = d3.select("#selDataset");

    // Fetch the data
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        data.names.forEach((name) => {
            dropDown.append("option").text(name).property("value", name);
        });

        // Build initial charts and metadata display
        buildCharts(data.names[0]);
        buildMetadata(data.names[0]);
    });
}

// Function to update metadata
function buildMetadata(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metaData = data.metadata.filter(row => row.id == sample)[0];
        let panel = d3.select("#sample-metadata");
        panel.html(""); // Clear existing metadata
        Object.entries(metaData).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

// Function to build charts
function buildCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let filteredData = data.samples.filter(row => row.id == sample)[0];

        // Bar chart data
        let x = filteredData.sample_values.slice(0, 10).reverse();
        let y = filteredData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let hoverText = filteredData.otu_labels.slice(0, 10).reverse();
        let barData = [{ x: x, y: y, text: hoverText, type: "bar", orientation: "h" }];
        let layout = { title: "Top 10 OTUs Found", responsive: true };
        Plotly.newPlot("bar", barData, layout);

        // Bubble chart data
        let trace1 = {
            x: filteredData.otu_ids,
            y: filteredData.sample_values,
            text: filteredData.otu_labels,
            mode: 'markers',
            marker: { color: filteredData.otu_ids, size: filteredData.sample_values, colorscale: "Earth" }
        };
        let data1 = [trace1];
        let layout1 = { title: 'Samples Found', showlegend: false, responsive: true };
        Plotly.newPlot('bubble', data1, layout1);
    });
}

// Function to handle new sample selection
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Initialize the dashboard on page load
init();