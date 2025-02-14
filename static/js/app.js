// Building the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // geting the metadata field
    let metadata_field = data.metadata;

    // Filtering the metadata for the object with the desired sample number
    let filtered_metadata = metadata_field.filter(x => x.id == sample)[0];

    // Using d3 to select the panel with id of `#sample-metadata`
    let select_panel = d3.select("#sample-metadata");

    // Using `.html("") to clear any existing metadata
    select_panel.html("");

    // Appending new tags for each key-value in the filtered metadata.
    data_keys = Object.keys(filtered_metadata);
    data_values = Object.values(filtered_metadata);
    for (let i = 0; i < data_keys.length; i++){
      select_panel.append("p").text(`${data_keys[i].toUpperCase()} : ${data_values[i]}`)
    };
  });
};

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Geting the samples field
    let samples_field = data.samples ;

    // Filtering the samples for the object with the desired sample number
    let filtered_samples = samples_field.filter(x => x.id == sample)[0];

    // Geting the otu_ids, otu_labels, and sample_values
    let otu_ids_value = filtered_samples.otu_ids;
    let otu_labels_value = filtered_samples.otu_labels;
    let sample_values_value = filtered_samples.sample_values;
    // Building a Bubble Chart
    var trace1 = {
      x: otu_ids_value,
      y: sample_values_value,
      text: otu_labels_value,
      mode: 'markers',
      marker: {
        size: sample_values_value,
        color: otu_ids_value,
        colorscale : 'Rainbow'
      }
    };

    var data1 = [trace1];
    
    // Applying a title to the layout
    var layout1 = {
      title: "Bacteria Cultures Per Sample",
      xaxis : {title: "OTU ID"},
      yaxis : {title: "Number of Bacteria"},
      margin: {
        l: 100,
        r: 50,
        t: 50,
        b: 50
      }

    };
    
    Plotly.newPlot('bubble', data1, layout1);

    // Building a Bar Chart
    yticks = otu_ids_value.slice(0, 10).map(id => `OTU ${id}`).reverse();
    tool_label = otu_labels_value.slice(0,10).reverse();
    let trace2 = {
      x: sample_values_value.slice(0,10).reverse(),
      y: yticks,
      text: tool_label,
      marker: {
        color : 'red'
      },
      type: "bar",
      orientation: "h"
    };
    
    let data2 = [trace2];
    
    // Applying a title to the layout
    let layout2 = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis : {title: "Number of Bacteria"},
      margin: {
        l: 100,
        r: 50,
        t: 50,
        b: 50
      }
    };
    
    // Rendering the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data2, layout2);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Geting the names field
    let names_field = data.names;

    // Using d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Using the list of sample names to populate the select options
    for (let j=0; j<names_field.length; j++){
      dropdownMenu.append("option").text(names_field[j]).attr("value",names_field[j]);
    };

    // Geting the first sample from the list
    first_sample = names_field[0];

    // Building charts and metadata panel with the first sample
    buildCharts(first_sample);
    buildMetadata(first_sample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Building charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
