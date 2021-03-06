var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/thymeleaf'),
    util: require('/lib/util')
};

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var component = libs.portal.getComponent();
    var view = resolve('layout-2-col.html');
    var model = createModel();

    function createModel() {
        var model = {};
        model.layoutBaseClass = getLayoutBaseClass();
        model.fullWidth = component.config.fullWidth ? true : false;
        model.regions = libs.util.region.get();
        return model;
    }

    function getColumnConfig() {
        var columnConfig = '50-50';
        if (component.config.columnConfig) {
            columnConfig = component.config.columnConfig;
        }
        return columnConfig;
    }

    function getLayoutBaseClass() {
        return 'layout-2-col-' + getColumnConfig();
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}