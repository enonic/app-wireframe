var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util')
};

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var component = libs.portal.getComponent();
    var view = resolve('layout-4-col.html');
    var model = createModel();

    function createModel() {
        var model = {};
        model.layoutBaseClass = getLayoutBaseClass();
        model.fullWidth = component.config.fullWidth ? true : false;
        model.regions = libs.util.region.get();
        return model;
    }

    function getColumnConfig() {
        var columnConfig = '25-25-25-25';
        if (component.config.columnConfig) {
            columnConfig = component.config.columnConfig;
        }
        return columnConfig;
    }

    function getLayoutBaseClass() {
        return 'layout-4-col-' + getColumnConfig();
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}