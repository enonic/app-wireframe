var UTIL = require('/cms/lib/util/js/util.js');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var me = this;

    function renderView() {
        var view = resolve('layout-2-col.html');
        var model = createModel();
        return UTIL.view.render(view, model);
    }

    function createModel() {
        me.component = execute('portal.getComponent');

        var model = {};
        model.columnConfig = getColumnConfig();
        model.regions = me.component.regions;
        return model;
    }

    function getColumnConfig() {
        var columnConfig = '50-50';
        if (me.component.config.columnConfig) {
            columnConfig = me.component.config.columnConfig;
        }
        return 'layout-' + columnConfig;
    }

    return renderView();
}