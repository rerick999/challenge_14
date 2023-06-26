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
	let oi=[];
	let sv=[];
	
	d3.json(url).then(data=>{
		let thedata=data.samples;
		let filteredarray=thedata.filter(sampleobj=>sampleobj.id==sample);
		let result=filteredarray[0];
		console.log(result);
		oi=result.otu_ids;
		sv=result.sample_values;
		
		/*
		console.log(result);
		let oi=[];
		let y=[];
		
		for (let i=0;i<thedata.length;i++){
			oi.push(result.otu_ids[i]);
		}
		*/
		
		//let firstsample=idnames[0];
		//optionChanged(firstsample);
		//*/
	let sa=parallelSort([sv,oi]);
	console.log(sa);
	sv=sa[0];
	oi=sa[1];
	sv=sv.slice(0,10);
	oi=oi.slice(0,10);
	let oil=[];
	for (let i=0;i<oi.length;i++){
		oil.push("OTU "+oi[i]);
	}
	console.log(sv);
	console.log(oi);
	console.log(oil);
	data = [{type: 'bar', orientation: 'h', x: sv, y: oil}];
	Plotly.newPlot("bar", data);
	});

	/*
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
  
  
function parallelSort(arrays, comparator = (a, b) => (a > b) ? -1 : (a < b) ? 1 : 0) {
  let arrayKeys = Object.keys(arrays);
  let sortableArray = Object.values(arrays)[0];
  let indexes = Object.keys(sortableArray);
  let sortedIndexes = indexes.sort((a, b) => comparator(sortableArray[a], sortableArray[b]));

  let sortByIndexes = (array, sortedIndexes) => sortedIndexes.map(sortedIndex => array[sortedIndex]);

  if (Array.isArray(arrays)) {
    return arrayKeys.map(arrayIndex => sortByIndexes(arrays[arrayIndex], sortedIndexes));
  } else {
    let sortedArrays = {};
    arrayKeys.forEach((arrayKey) => {
      sortedArrays[arrayKey] = sortByIndexes(arrays[arrayKey], sortedIndexes);
    });
    return sortedArrays;
  }
}

  
  // Initialize the dashboard
  init();