/**
 * Converts a string to a regular expression. Useful when using RegExp as properties in an
 * object, since only strings are allowed as property names.
 *
 * Splits the string at first and last slash. Everything inbetween is passed directly to
 * a new RegExp object. Modes passed after the last slash are applied, too.
 *
 * Examples:
 * str2regex("/a/") -> returns /a/ which matches all strings with an "a" in them.
 * str2regex("/^\/$/") -> returns /^\/$/ which matches lines that consist of only one slash.
 * str2regex("/\$/") -> returns /\$/ which matches all strings with a dollar sign in them.
 *
 * @param str
 * @throws SyntaxError if the string is invalid.
 * @returns {RegExp} or null on error.
 */
function str2regex(str) {
    var lastSlashInd = str.lastIndexOf("/");
    if (str.charAt(0) != "/" || lastSlashInd == 0) {
        throw new SyntaxError("This seems to not be a correct RegExp string: " + str);
        return null;
    }
    var pattern = str.substring(1, lastSlashInd);
    var mode = str.substring(lastSlashInd + 1);
    return new RegExp(pattern, mode);
}


/**
 * Transforms an object based on rules from keyMapping and returns a transformed clone.
 * The transformation is recursive throughout nested objects and arrays.
 *
 * "keyMapping" is an object which defines the mapping of keys. Each key can be either
 * string or a regular expression. Regular expressions must be passed as string - e.g.
 * pass "/a/" instead of /a/. The values can be either strings or functions. If a value
 * is a function, it's called with the current object's property name and value. It
 * should return a new name for the property. On key match the JSON property name is
 * changed to the mapping-value. The values all stay the same, except for nested objects
 * and arrays of objects: these are transformed too.
 *
 * Example mappings:
 *   "a" : "link"     renames a property "a" to property "link"
 *   "/a/" : "aaa"    renames all properties containing an "a" to "aaa"
 *
 * @param modelObject
 * @param keyMapping
 * @throws TypeError if the mapping is not an object.
 * @returns {*} transformed JSON
 */
function transformObject(modelObject, keyMapping) {
    if (typeof keyMapping != "object") {
        throw new TypeError("keyMapping must be an object");
        return modelObject;
    }
    var transform = function(obj) {
        var newObj = {};
        for (var prop in obj) {
            var key = prop;
            var value = obj[prop];
            var deleteProp = false;
            for (var mapping in keyMapping) {
                if ((mapping.charAt(0) == "/" && str2regex(mapping).test(key)) ||
                    (typeof mapping == "string" && key == mapping)) {
                    var newValue = keyMapping[mapping];
                    if (newValue == undefined) {
                        deleteProp = true;
                    } else if (typeof newValue == "function") {
                        key = newValue(key, value);
                    } else {
                        key = newValue;
                    }
                    break;
                }
            }
            if (deleteProp) {
                continue;
            }

            if (value.constructor === Array) {
                var newArr = [];
                for (var i = 0; i < value.length; i++) {
                    var arrValue = value[i];
                    if (typeof arrValue == "object") {
                        newArr.push(transform(arrValue));
                    } else {
                        newArr.push(value);
                    }
                }
                value = newArr;
            } else if (typeof value == "object") {
                value = transform(value);
            }
            newObj[key] = value;
        }
        return newObj;
    }
    return transform(modelObject);
}