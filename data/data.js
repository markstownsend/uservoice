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
	var reg = new RegExp('(<h2 class="uvIdeaTitle"><a href=")([\w/-]+)(">)', 'g');
	var matches = reg.exec(contents);
	
	if(matches){
		return matches;
	}
	else{
		return 'not found';
	}
}

module.exports.getIdeas = getIdeas;
module.exports.getFiles = getFiles;
module.exports.getMatch = getMatch;
module.exports.getBaseUrl = getBaseUrl;