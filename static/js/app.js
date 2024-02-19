var data;

d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((resp) => {
    console.log(resp)
    data = resp
    let dropDown = d3.select("#selDataset")
    resp.names.forEach((name) => {
        dropDown.append("option").text(name)
    })
    buildChart(resp.names[0])
})

let dropDown = d3.select("#selDataset")
resp.names.forEach((name) => {
    dropDown.append("option").text(name)
})
if (!data) {
    return
}

var filteredData = data.samples.filter(row => row.id == selectID)[0]
let x = filteredData.sample_values.slice(0, 10).reverse()
let y = filteredData.otu_ids.slice(0, 10).map(id => "OTU " + id).reverse()
let hoverText = filteredData.otu_labels.slice(0, 10).reverse()

let barData = [
    {
        x: x,
        y: y,
        text: hoverText,
        type: "bar",
        orientation: "h"
    }
]
let layout = {
    title: "Top 10 OTUs Found"
}
let config = {
    responsive: true
}

Plotly.newPlot("bar", barData, layout, config)
    
let trace1 = {
    x: filteredData.otu_ids,
    y: filteredData.sample_values,
    text: filteredData.otu_labels,
    mode: 'markers',
    marker: {
        color: filteredData.otu_ids,
        size: filteredData.sample_values,
        colorscale: "Earth"
    }
};

var data = [trace1];

var layout1 = {
    title: 'Samples Found',
    showlegend: false
};

let config1 = {
    responsive: true
}

Plotly.newPlot('bubble', data, layout1, config1)

filteredData[0]

var metaData = resp.metadata[resp.names.indexOf(selectID)]

let panel = d3.select("#sample-metadata")
panel.html("")

for (key in metaData) {
    panel.append("h6").text(`${key.toUpperCase()}: ${metaData[key]}`)
}
});

let buildBubble = (selectID) => {
var filteredData1 = data.samples.filter(row => row.id == selectID)[0]
let y1 = filteredData1.sample_values
let x1 = filteredData1.otu_ids
let hoverText1 = filteredData1.otu_labels
}

function buildMetadata(sample) {

}