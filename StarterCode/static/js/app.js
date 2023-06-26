

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
 
 
function normalize(val, max, min) { 
    if(max - min === 0) return 0; // or 0, it's up to you
	let res=Math.abs((val-1500)/3000);
	res=Math.trunc(res*16777215);
	res=res.toString(16);
	return res;
}

 
function buildcharts(sample) {
	let url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
	let result=[];
	let ziplist=[];
	
	d3.json(url).then(data=>{
		let thedata=data.samples;
		let filteredarray=thedata.filter(sampleobj=>sampleobj.id==sample);
		result=filteredarray[0];

		//bar plot
		for (let i=0;i<result.otu_ids.length;i++){
			ziplist.push([
				'OTU '+result.otu_ids[i],
				result.sample_values[i],
				result.otu_labels[i],
			]);
		}
		ziplist.sort((a,b)=>-a[1]+b[1]);
		ziplist=ziplist.slice(0,10);
		data = [{type: 'bar', orientation: 'h',
		x: ziplist.map(a=>a[1]), y: ziplist.map(a=>a[0]),
		text: ziplist.map(a=>a[2])
		}];
		data.reverse();
		Plotly.newPlot("bar", data);
		
		//bubble plot
		for (let i=0;i<result.otu_ids.length;i++){
			ziplist.push([
				result.otu_ids[i],
				result.sample_values[i],
				result.otu_labels[i],
				
				Math.trunc(result.otu_ids[i],15),
				Math.trunc(result.otu_ids[i],9),
				result.otu_ids[3],
				"#" + normalize(result.otu_ids[i],16777215,0),
			]);
		}
		// sort
		ziplist.sort((a,b)=>-a[1]+b[1]);
		console.log(ziplist);
		data = [{
			mode:'markers',
			y: ziplist.map(a=>a[1]), x: ziplist.map(a=>a[0]),
			text: ziplist.map(a=>a[2]),
			marker:{size: ziplist.map(a=>a[1]),
				color: ziplist.map(a=>a[6])
			}
		}];
		
		var layout = {
			title: 'Sample: OTU '+sample,
			showlegend: false,
			};

		Plotly.newPlot("bubble", data,layout);
	});
  }
  
  
  // Initialize the dashboard
  init();