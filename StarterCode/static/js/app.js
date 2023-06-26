 function init() {
	let selector=d3.select("#selDataset");
	let url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
	d3.json(url).then(data=>{
		let idnames=data.names;
		for (let i=0;i<idnames.length;i++){
			selector.append("option").text(idnames[i]).property("value",idnames[i]);
		}
		let firstsample=idnames[0];
		optionChanged(firstsample);
	});
  }


 function optionChanged(newsample) {
	getmetadata(newsample);
	buildcharts(newsample);
  }


function getmetadata(sample) {
	let url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
	d3.json(url).then(data=>{
		let metadata=data.metadata;
		let filteredarray=metadata.filter(sampleobj=>sampleobj.id==sample);
		let result=filteredarray[0];
		let panel=d3.select("#sample-metadata");
		panel.html("");
		for (key in result){
			panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
		};
	});
  }
 
 
function buildcharts(sample) {
	let url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
	
	/*
	d3.json(url).then(data=>{
		let idnames=data.names;
		for (let i=0;i<idnames.length;i++){
			selector.append("option").text(idnames[i]).property("value",idnames[i]);
		}
		let firstsample=idnames[0];
		optionChanged(firstsample);
	});

	d3.json(url).then(data=>{
		let metadata=data.metadata;
		let filteredarray=metadata.filter(sampleobj=>sampleobj.id==sample);
		let result=filteredarray[0];
		let panel=d3.select("#sample-metadata");
		panel.html("");
		for (key in result){
			panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
		};
	});
	*/
	
// Access the website and use .then to operate on the data
// Filter the data for the object with the desired sample number (the id)
// Pull the desired information (ids, labels, values) from your filtered data
// Build a Bubble Chart
// Slice the data for your bar chart and order it (you can just use reverse)
// Build a Horizontal Bar Chart
  }
  

  

  
  // Initialize the dashboard
  init();