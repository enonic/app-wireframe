exports.data = {};

/**
 * Force data to array
 * Note that current UTIL.log function won't reflect the changes due to a bug in JSON.stringify
 * @param {}
 * @return {Array} Data as array
 */
exports.data.forceArray = function(data) {
    if (!Array.isArray(data)) {
        data = [data];
    }
    return data;
};


/**
 * Trim empty array elements
 * Note that current UTIL.log function won't reflect the changes due to a bug in JSON.stringify
 * @param {Array} The array to trim
 * @return {Array} The trimmed array
 */
exports.data.trimArray = function(array) {
    // Make sure array is an array
    array = exports.data.forceArray(array);
    var trimmedArray = [];
    for (var i = 0; i < array.length; i++) {
        var empty = true;
        var object = array[i];

        for (var key in object) {
            if (object[key] !== '') {
                empty = false;
            }
        }
        if (!empty) {
            trimmedArray.push(object);
        }
    }
    return trimmedArray;
};

/**
 * Delete all properties with empty string from an object
 * Set 'recursive' to true if you also want to delete properties in nested objects
 * @param {Object} The array to trim
 * @param {Boolean}
 * @return {Array} The trimmed array
 */
exports.data.deleteEmptyProperties = function(obj, recursive) {
    for (var i in obj) {
        if (obj[i] === '') {
            delete obj[i];
        } else if (recursive && typeof obj[i] === 'object') {
            exports.data.deleteEmptyProperties(obj[i], recursive);
        }
    }
};


/**
 * Check if value is integer
 * @param {*} The value to check
 * @return {Boolean} Returns true if value is integer
 */
exports.data.isInt = function(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
};