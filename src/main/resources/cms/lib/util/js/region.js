exports.region = {};

/**
 * Get regions in correct order
 * @param {Array} A list with names of the potential regions in requested order
 * @returns {Array}
 */
exports.region.get = function(contextData, potentialRegions) {
    var regions = [];
    for (var i = 0; i < potentialRegions.length; i++) {
        if (contextData.regions[potentialRegions[i]]) {
            regions.push(contextData.regions[potentialRegions[i]]);
        }
    }
    return regions;
};