#!/usr/bin/env node
var path = require('path');
var colors = require('colors');
//var deep = require('deep-diff');

var jsondiff = require('jsondiffpatch');

var jsondiffpatch = jsondiff.create({
    // used to match objects when diffing arrays, by default only === operator is used
    objectHash: function(obj, index) {
        return (obj._id && obj._id.$oid) || obj.$oid || obj._id || obj.id || obj.name || '$$index:' + index;
    },
    arrays: {
        detectMove: true,
        includeValueOnMove: false
    },
    textDiff: {
        // default 60, minimum string length (left and right sides) to use text diff algorythm: google-diff-match-patch
        minLength: 60
    }
});

//var jsonParser = require(path.join(__dirname, 'src', 'json-parser.js'));
var tools = require(path.join(__dirname, 'src', 'tools.js'))(jsondiff, jsondiffpatch);

String.prototype.__defineGetter__('baseColor',   function(){ return colors.yellow (this); });
String.prototype.__defineGetter__('localColor',  function(){ return colors.green  (this); });
String.prototype.__defineGetter__('remoteColor', function(){ return colors.magenta(this); });

console.log('========== JSON-Merger ==========\n'.blue +
            '===========           ===========\n'.blue);

var filepaths = process.argv.slice(2);

if(filepaths.length == 2){
	tools.runDiff(filepaths[0], filepaths[1]);
} else {
	var baseFile   = filepaths[0];
	var localFile  = filepaths[1];
	var remoteFile = filepaths[2];
	var mergedFile = filepaths[3];

	if(mergedFile !== undefined && baseFile === mergedFile){
	    var preFile = localFile;
	    var postFile = remoteFile;
		tools.runDiff(preFile, postFile);
	} else {
		tools.runMerge(baseFile, localFile, remoteFile);
	}
}
