var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/thymeleaf')
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
        model.regions = getRegionsAsArray();

        return model;
    }

    function getRegionsAsArray() {
        var regions = libs.portal.getComponent().regions;
        var keys = Object.keys(regions);
        var result = [];
        for (var i = 0; i < keys.length; i++) { result.push(regions[keys[i]]); }
        return result;
    }

    function getLayoutBaseClass() {
        return 'layout-1-col-centered';
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}