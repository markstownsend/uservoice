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

function getMatch(regEx, matchIn){
	
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

function getFiles(pattern){
	var matchingFiles = [];
	matchingFiles = glob.sync(pattern);
	return matchingFiles;
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
			results.matches.push({"urlPartial": myArray[2]});
		}	
	}
	
	if(!matched) results.matches.push({'not found': 'not found'});
	
	return results;
	
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
function getJson(ideas, votes, subject){
	
	
	
	
}
module.exports.getVotes = getVotes;
module.exports.getIdeas = getIdeas;
module.exports.getFiles = getFiles;
module.exports.getMatch = getMatch;
module.exports.getBaseUrl = getBaseUrl;