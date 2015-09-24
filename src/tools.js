var path = require('path');
var fs = require('fs');
var colors = require('colors');

module.exports = function(jsondiff, jsondiffpatch){
	var jsonParser = require(path.join(__dirname, 'json-parser.js'));

	String.prototype.__defineGetter__('preColor',   function(){ return colors.yellow(this); });
	String.prototype.__defineGetter__('postColor',  function(){ return colors.green (this); });

	var out = {};

	out.runDiff = function(preFile, postFile){
		var preData   = fs.readFileSync(preFile,  'utf8');
		var postData  = fs.readFileSync(postFile, 'utf8');
		var pre =  jsonParser.parseString(preData);
		var post = jsonParser.parseString(postData);
		var preToPost = jsondiffpatch.diff(pre, post);
        if(preToPost === undefined){
            console.log('>>> No differences <<<'.green);
        } else {
    		var output = jsondiff.formatters.console.format(preToPost);
	    	console.log(output);            
        }

	};

	out.runMerge = function(baseFile, localFile, remoteFile){
		console.log(('Base: '   + baseFile)  .baseColor);
		console.log(('Local: '  + localFile) .localColor);
		console.log(('Remote: ' + remoteFile).remoteColor);

		var baseData   = fs.readFileSync(baseFile,   'utf8');
		var localData  = fs.readFileSync(localFile,  'utf8');
		var remoteData = fs.readFileSync(remoteFile, 'utf8');

		// console.log(baseData.baseColor);
		// console.log(localData.localColor);
		// console.log(remoteData.remoteColor);

		var base = jsonParser.parseString(baseData);
		var local = jsonParser.parseString(localData);
		var remote = jsonParser.parseString(remoteData);

		var baseToLocal = jsondiffpatch.diff(base, local);
		var baseToRemote = jsondiffpatch.diff(base, remote);

		var decorate = function(s){
			return '========= ' + s + ' =========';
		};

		console.log(decorate('Local').localColor);
		jsondiff.console.log(baseToLocal);
		console.log(decorate('Remote').remoteColor);
		jsondiff.console.log(baseToRemote);

		console.log(decorate('Local vs. Remote').blue);
		var threeWay = jsondiffpatch.diff(baseToLocal, baseToRemote);
		jsondiff.console.log(threeWay);
	};

	return out;
};
