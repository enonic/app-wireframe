var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/thymeleaf'),
    content: require('/lib/xp/content'),
    util: require('/lib/util'),
    menu: require('/lib/menu')
};

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var view = resolve('breadcrumbs.html');
    var model = createModel();

    function createModel() {
        var model = {};

        model.breadcrumbTrail = getBreadcrumbTrail();

        return model;
    }



    function getBreadcrumbTrail() {
        var content = libs.portal.getContent();

        // Remove leading slash
        var fullPath = content._path.replace(/^\/|\/$/g, '');
        var pathArray = fullPath.split('/');

        var breadCrumbTrail = [];

        for (var i = 1; i <= pathArray.length; i++) {

            var currentPath = '/' + pathArray.slice(0, i).join('/');

            breadCrumbTrail.push(getBreadcrumb(currentPath))
        }

        return breadCrumbTrail;


    }

    function getBreadcrumb(path) {
        var result = libs.content.get({
            key: path
        });

        return result;

    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}