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

function getIdeas(contents){
	var reg = new RegExp('(<h2 class="uvIdeaTitle"><a href=")([\\w/-]+)(">)', 'g');
	var matches = reg.exec(contents);
	var results = { "matches": [] };
	if(matches){
		// matches must be divisible by 4: 1 for the match and 3 for the capturing classes
		for (var i = 2; i < matches.length; i = i + 4)
		{
			results.matches.push({"urlPartial": matches[i]});
		}
	}
	else{
		results.matches.push({'not found': 'not found'});
	}
	return results;
}

function getVotes(contents){
	var reg = new RegExp('(<div class="uvIdeaVoteCount" data-id=")(\\d+)(">[\\t |\\r |\\n ]*<strong>)(\\d+)(</strong>)','g');
	var matches = reg.exec(contents);
	var results = { "matches" : [] };
	//console.log(matches);
	if(matches){
		// matches must be divisible by 6: 1 for the match and 5 for the capturing classes
		for (var i = 5; i < matches.length; i = i + 6)
		{
			var found = {};
			found.dataId = matches[i-3];
			found.voteCount = matches[i-1]
			results.matches.push(found);
		}
	}
	else{
		results.matches.push({'not found': 'not found'});
	}
	return results;
}

module.exports.getVotes = getVotes;
module.exports.getIdeas = getIdeas;
module.exports.getFiles = getFiles;
module.exports.getMatch = getMatch;
module.exports.getBaseUrl = getBaseUrl;