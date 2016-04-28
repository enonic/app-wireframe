var UTIL = require('/lib/enonic/util/util');
var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var me = this;

    function renderView() {
        var view = resolve('layout-3-col.html');
        var model = createModel();

        return {
            body: thymeleaf.render(view, model)
        };
    }

    function createModel() {
        me.component = portal.getComponent();

        var model = {};
        model.columnConfig = getColumnConfig();
        model.regions = UTIL.region.get();

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