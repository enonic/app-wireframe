var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/thymeleaf'),
    util: require('/lib/util')
};

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var content = libs.portal.getContent();
    var view = resolve('heading.html');
    var model = createModel();

    function createModel() {
        var model = {};
        model.heading = content['displayName'];
        return model;
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}