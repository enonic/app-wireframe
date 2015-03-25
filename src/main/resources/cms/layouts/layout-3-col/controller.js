var UTIL = require('/cms/lib/util/js/util.js');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var me = this;

    function renderView() {
        var view = resolve('layout-3-col.html');
        var model = createModel();
        return UTIL.view.render(view, model);
    }

    function createModel() {
        me.component = execute('portal.getComponent');

        var model = {};
        model.columnConfig = getColumnConfig();
        model.regions = UTIL.region.get(me.component, ['left', 'middle', 'right', 'rightmost']);
        return model;
    }

    function getColumnConfig() {
        var columnConfig = '33-33-33';
        if (me.component.config.columnConfig) {
            columnConfig = me.component.config.columnConfig;
        }
        return 'layout-' + columnConfig;
    }

    return renderView();
}