var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/thymeleaf'),
    util: require('/lib/util')
};

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var component = libs.portal.getComponent();
    var view = resolve('layout-1-col.html');
    var model = createModel();

    function createModel() {
        var model = {};
        model.layoutBaseClass = getLayoutBaseClass();
        model.fullWidth = component.config.fullWidth ? true : false;
        model.regions = libs.util.region.get();

        return model;
    }

    function getLayoutBaseClass() {
        return 'layout-1-col-centered';
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}