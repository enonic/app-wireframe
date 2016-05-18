var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util')
};

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var component = libs.portal.getComponent();
    var view = resolve('sample-map.html');
    var model = createModel();

    function createModel() {
        var model = {};
        model.aspectRatio = component.config.aspectRatio ? component.config.aspectRatio : 'widescreen';
        model.label = component.config.label;
        return model;
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}