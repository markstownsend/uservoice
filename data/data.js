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
	var url;
	var toFind = '(<link rel="canonical" href=")(https://\\w)(" />)';
	var reg = new RegExp(toFind, 'i');
	var matches = reg.exec(contents);
	url = matches[1];
	return url;
}

module.exports.getMatch = getMatch;
module.exports.getBaseUrl = getBaseUrl;