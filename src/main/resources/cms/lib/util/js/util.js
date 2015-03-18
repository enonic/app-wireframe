exports.data = require('data.js').data;
exports.content = require('content.js').content;
exports.view = require('view.js').view;
exports.image = require('image.js').image;
exports.menu = require('menu.js').menu;

/**
 * Log data to server log.
 * @param {*} Data to log
 */
exports.log = function (data) {
    log.info('UTIL log %s', JSON.stringify(data, null, 4));
};