var fs = require('fs'),
glob = require('glob');

glob('*.txt', function(er, files){
	if(er) {
		process.exit(-1);
		} else {
			files.forEach(function(currentValue, index, array){
				var contents = fs.readFileSync(currentValue);
				var rex = new RegExp('', 'g');
			});
		}
});

function getFiles(pattern){
	var matchingFiles = [];
	matchingFiles = glob.sync(pattern);
	return matchingFiles;
}

function getBaseUrl(contents){
	var reg = new RegExp('(<link rel="canonical" href=")(\\w+://[\\W\\w]+)(" />)', 'i');
	var matches = reg.exec(contents);
	
	if(matches){
		return matches[2];
	}
	else{
		return 'not found';
	}
}

// gets the ideas out of the text
function getIdeas(contents){
	var reg = new RegExp('(<h2 class="uvIdeaTitle"><a href=")([\\w/-]+)(">)', 'g');
	var results = { "matches" : [] };
	var myArray;
	var matched = false;
	
	while((myArray = reg.exec(contents)) !== null){
		// matches must be divisible by 4: 1 for the match and 3 for the capturing classes
		if(myArray.length === 4){
			matched = true;
			var found = {};
			found.urlPartial = myArray[2];
			found.dataId = getDataIdFromUrl(myArray[2]);
			found.ideaSummary = getIdeaSummaryFromUrl(myArray[2]);
			results.matches.push(found);
		}	
	}
	
	if(!matched) results.matches.push({'not found': 'not found'});
	
	return results;
	
}

function getDataIdFromUrl(url)
{
	var reg = new RegExp('(\\d+)([-\\w]+)$','i');
	var matches = reg.exec(url);
	if(matches){
		return matches[1];
	} else {
		return 'not found';
	}
	
}

function getIdeaSummaryFromUrl(url){
	var reg = new RegExp('(\\d+)([-\\w]+)$','i');
	var matches = reg.exec(url);
	if(matches){
		return matches[2].toString().replace(/-/g, " ");
	} else {
		return 'not found';
	}
}

// gets the votes out of the text
function getVotes(contents){
	var reg = new RegExp('(<div class="uvIdeaVoteCount" data-id=")(\\d+)(">[\\t |\\r |\\n ]*<strong>)(\\d+)(</strong>)','g');
	var results = { "matches" : [] };
	var myArray;
	var matched = false;
	
	while((myArray = reg.exec(contents)) !== null){
		// matches must be divisible by 6: 1 for the match and 5 for the capturing classes
		if(myArray.length === 6){
			matched = true;
			var found = {};
			found.dataId = myArray[2];
			found.voteCount = myArray[4];
			results.matches.push(found);
		}	
	}
	
	if(!matched) results.matches.push({'not found': 'not found'});
	
	return results;
}

// matches the ideas and the votes
// use the callback to emit a finished json string
function getJsonChild(ideas, votes, url, cb){
	ideas.forEach(function(value, index, array){
		var found = votes.filter(function(vote){
			return value.dataId === vote.dataId});
		if(found) {
			var out = {};
			out.name = value.ideaSummary;
			out.url = url + value.urlPartial;
			out.votes = parseInt(found[0]["voteCount"]);
			cb(null, JSON.stringify(out));
		} else {
			throw Error('dataId: ' + value.dataId + ' not found in votes');
		}
	})
}


module.exports.getJsonChild = getJsonChild;
module.exports.getVotes = getVotes;
module.exports.getIdeas = getIdeas;
module.exports.getFiles = getFiles;
module.exports.getBaseUrl = getBaseUrl;