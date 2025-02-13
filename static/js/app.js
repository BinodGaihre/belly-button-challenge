// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata_field = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let filtered_metadata = metadata_field.filter(x => x.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let select_panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    select_panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    data_keys = Object.keys(filtered_metadata);
    data_values = Object.values(filtered_metadata);
    for (let i = 0; i <= data_keys.length; i++){
      select_panel.append("p").text(`${data_keys[i]}: ${data_values[i]}`)
    };
  });
};

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples_field = data.samples ;

    // Filter the samples for the object with the desired sample number
    let filtered_samples = samples_field.filter(x => x.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids_value = filtered_samples.otu_ids;
    let otu_labels_value = filtered_samples.otu_labels;
    let sample_values_value = filtered_samples.sample_values;
    // Build a Bubble Chart
    var trace1 = {
      x: otu_ids_value,
      y: sample_values_value,
      text: otu_labels_value,
      mode: 'markers',
      marker: {
        size: sample_values_value,
        color: otu_ids_value
      }
    };
    
    var data1 = [trace1];
    
    var layout1 = {
      title: "Bacteria Cultures Per Sample",
      xaxis : {title: "OTU ID"}
    };
    
    Plotly.newPlot('bubble', data1, layout1);
    

    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    yticks = otu_ids_value.slice(0, 10).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    // Render the Bar Chart
    let trace2 = {
      x: sample_values_value.slice(0,10).reverse(),
      y: otu_ids_value.slice(0,10).map(id => `OTU ${id}`).reverse(),
      text: yticks,
      type: "bar",
      orientation: "h"
    };
    
    // Data array
    let data2 = [trace2];
    
    // Apply a title to the layout
    let layout2 = {
      title: "top 10 values",
      margin: {
        l: 150,
        r: 10,
        t: 30,
        b: 30
      }
    };
    
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data2, layout2);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names_field = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    
    for (let j=0; j<=names_field.length; j++){
      dropdownMenu.append("option").text(names_field[j]).attr("value",names_field[j]);
    };
    // Get the first sample from the list
    first_sample = names_field[0];

    // Build charts and metadata panel with the first sample
    buildCharts(first_sample);
    buildMetadata(first_sample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
