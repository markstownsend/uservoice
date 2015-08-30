var fs = require('fs'),
	minimist = require('minimist')(process.argv.slice(2), {string: 'voicefile', string: 'outfile', string: 'subject'}),
	dt = require('./data.js');

var baseUrl = 'https://excel.uservoice.com';

var currentFile = fs.readFileSync(minimist.voicefile);

var ideas = dt.getIdeas(currentFile);
var votes = dt.getVotes(currentFile);

var out = { "name": minimist.subject};
var found = new Array;

dt.getJsonChild(ideas.matches, votes.matches, baseUrl, function(error, data){
	if(error) {
		console.error(error);
	} else {
		found.push(data);
	}
});

out.children = found;

fs.writeFileSync(minimist.outfile, toChildString(out));

function toChildString(out){
	var outString = '{"name": "' + minimist.subject + '","children": ['
	out.children.forEach(function(value, index, array){
		var val = JSON.parse(value);
		outString += '{"name": "' + val.name + '",';
		outString += '"url": "' + val.url + '",';
		outString += '"votes": ' + val.votes + '},'
	});
	
	outString = outString.substring(0, outString.length - 1);
	outString += ']}';
	
	return outString;
};