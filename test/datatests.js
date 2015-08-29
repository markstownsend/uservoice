/* jshint node: true */
'use strict';
var chai = require("chai"),
    expect = chai.expect,
    dt = require("../data/data.js"),
	glob = require('glob');


describe('data extraction tests', function () {
	
	var validString;
	var invalidString;
    var validBaseUrlString;
	
	beforeEach(function(){
		validString = '';
		invalidString = '';
        validBaseUrlString = '<link rel="P3Pv1" href="/w3c/p3p.xml"><link rel="canonical" href="https://excel.uservoice.com/forums/304939-excel-for-android" /><script type="text/javascript">(function(w';
    })
	
    xit('gets all the files from the data directory') {
		var matches = getMatch(rex, validString);
    	expect(matches).not.to.have.length(0);
	};
    
    it('gets the base url from the file contents string'){
        var url = dt.getBaseUrl(validBaseUrlString);
        expect(url).to.contain('android');
    }
  
    
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
