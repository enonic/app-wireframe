var UTIL = require('/cms/lib/util/js/util.js');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var me = this;

    function renderView() {
        var view = resolve('layout-4-col.html');
        var model = createModel();
        return UTIL.view.render(view, model);
    }

    function createModel() {
        me.component = execute('portal.getComponent');

        var model = {};
        model.columnConfig = getColumnConfig();
        model.regions = getRegions();
        return model;
    }

    function getColumnConfig() {
        var columnConfig = '25-25-25-25';
        if (me.component.config.columnConfig) {
            columnConfig = me.component.config.columnConfig;
        }
        return 'layout-' + columnConfig;
    }

    /**
     * Get regions in correct order
     * @returns {Array}
     */
    function getRegions() {
        var regions = [];
        var potentialRegions = ['left', 'middle', 'right', 'rightmost'];
        for (var i = 0; i < potentialRegions.length; i++) {
            if (me.component.regions[potentialRegions[i]]) {
                regions.push(me.component.regions[potentialRegions[i]]);
            }
        }
        return regions;
    }

    return renderView();
}