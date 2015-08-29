/* jshint node: true */
'use strict';
var chai = require("chai"),
    expect = chai.expect,
    dt = require("../data/data.js"),
	glob = require('glob');


describe('data extraction tests', function () {
	
	var validIdeaString;
	var invalidIdeaString;
    var validVoteString;
	var invalidVoteString;
    var validBaseUrlString;
    var invalidBaseUrlString;
    var dirGlob;
	
	beforeEach(function(){
		validIdeaString = '<li class="uvListItem uvIdea uvIdea-list"><div class="uvIdeaHeader"><h2 class="uvIdeaTitle"><a href="/forums/304936-excel-for-ipad-iphone-ios/suggestions/9316875-allow-naming-of-ranges-and-tables">Allow naming of ranges and tables</a></h2><div class="uvIdeaDescription uvIdeaDescription-truncated"><div class="typeset"><p>Currently, cannot edit names of ranges or tables. Naming is an extremely helpful feature when dealing with other limitations of the mobile versions.</p></div></div>';
		invalidIdeaString = 'some string without the data I need in it';
        validVoteString = '<div class="uvIdeaVoteBadge"><div class="uvIdeaVoteCount" data-id="9316875"><strong>2</strong><span> votes</span></div>';
        invalidVoteString = 'some string without the vote bit in it';
        validBaseUrlString = '<link rel="P3Pv1" href="/w3c/p3p.xml"><link rel="canonical" href="https://excel.uservoice.com/forums/304939-excel-for-android" /><script type="text/javascript">(function(w';
        invalidBaseUrlString = 'some string without a base url in it';
        dirGlob = 'C:\\mark\\uservoice\\data\\*.txt';
    });
	
    it('gets all the files from the data directory',function() {
		var files = dt.getFiles(dirGlob);
        expect(files).to.have.length(22);
        expect(files).not.to.have.length(0);
	});
    
    it('gets the base url from the file contents string', function(){
        var url = dt.getBaseUrl(validBaseUrlString);
        expect(url).to.contain('android');
    });
  
    it('gets not found if it cannot find the base url', function(){
        var url = dt.getBaseUrl(invalidBaseUrlString);
        expect(url).to.equal('not found');
    });
    
    it('gets a valid idea from the chunk of text', function(){
        var matches = dt.getIdeas(validIdeaString);
        expect(matches).not.to.have.length(0);
    })
    
    // it('should update a document in the database from a string', function(done) {
    //     var stringtoupdate = 'MaxRow:-1;MaxCol:-1,LastRow:-1;LastCol:-1';
    //     var data = fb.getObjectFromString(stringtoupdate);
    //     var docId = "fe977f656407fd32060e193abe2f152210ab1f71";
    //     ch.update(db, "poistats", "in-place", docId, data, function(err, resp){
    //         if(err){
    //             console.log(err);
    //         } else 
    //         {
    //             expect(resp).to.contain('MaxRow');
    //         }
    //         done();
    //     })
    // })
});