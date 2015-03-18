exports.content = {};

/**
 * Get content by key (path or id). If content key is not supplied, current content is retrieved.
 * @param {String} Content key
 * @return {Object} The content object
 */
exports.content.get = function (key) {
    var content;
    if (typeof key == 'undefined') {
        content = execute('portal.getContent');
    }
    else {
        content = execute('content.get', {
            key: key
        });
    }
    return content;
};


/**
 * Check if content exists at path
 * @param {String} Content path
 * @return {Boolean} Returns true if content exists at path
 */
exports.content.exists = function (path) {
    return exports.content.get(path) ? true : false;
};


/**
 * Get content property
 * @param {String} Content key
 * @param {String} Property name
 * @return {*} Content property
 */
exports.content.getProperty = function (key, property) {
    if (!key || !property) {
        return null;
    }
    var result = exports.content.get(key);
    return result ? result[property] : null;
};

/**
 * Returns the path to the content location. If the key to a content is passed, it will be used. If contenKey is null, the path
 * to the page that the part is on will be returned.
 * @param {Content} content key. Example: config['saveFolder']
 * @return {String} Returns the path of the save location.
 */
exports.content.getPath = function (contentKey) {
    var defaultContent = execute('portal.getContent');
    var contentPath;
    if (contentKey) {
        var content = exports.content.get(contentKey);
        if (content) {
            contentPath = content._path;
        }
    }
    return contentPath ? contentPath : defaultContent._path;
};