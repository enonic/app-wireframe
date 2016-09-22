var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util')
};

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var component = libs.portal.getComponent();
    var view = resolve('sample-gallery.html');
    var model = createModel();

    function createModel() {
        var model = {};
        model.aspectRatio = component.config.aspectRatio ? component.config.aspectRatio : 'widescreen';
        model.label = component.config.label;
        model.linkUrl = getLinkUrl();
        return model;
    }

    function getLinkUrl() {
        var linkUrl;
        if (component.config['linkedPage']) {
            linkUrl = libs.portal.pageUrl({
                id: component.config['linkedPage']
            });
        }
        return linkUrl;
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}