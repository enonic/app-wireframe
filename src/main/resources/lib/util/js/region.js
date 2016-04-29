exports.region = {};

var portal = require('/lib/xp/portal');

/**
 * Get regions as array
 * @returns {Array}
 */

exports.region.get = function() {

    var component = portal.getComponent();
    var regions = component.regions;

    var regionArray = [];
    for (var key in regions) {
        if (regions.hasOwnProperty(key)) {
            var region = regions[key];
            regionArray.push(region);
        }
    }

    return regionArray;
};