/**
 * Converts JSON from String s into Array of Objects
 * if there are several of them in the String. 
 * @param  {String} s source string with JSON object(s)
 * @return {Object}   Array of Objects
 */
var parseString = function (s){
	// TODO handle root arrays
    var buffer = "";
    var objects = [];
    var depth = 0;
    for(var i = 0; i < s.length; i++){
        buffer += s[i];
        if(s[i] == "{") depth++;
        else if(s[i] == "}"){
            depth--;
            if(depth === 0){
                objects.push(JSON.parse(buffer));
                buffer = "";
            } else if(depth < 0){
                throw new Error("Too much closing brackets");
            }
        }
    }
    // if(objects.length == 1) return objects[0];
    return objects;
};

module.exports = {
    parseString: parseString
};
