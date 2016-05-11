var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    content: require('/lib/xp/content'),
    util: require('/lib/enonic/util'),
    menu: require('/lib/enonic/menu')
};

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var view = resolve('breadcrumbs.html');
    var model = createModel();

    function createModel() {
        var model = {};

        model.breadcrumbTrail = getBreadcrumbTrail();

        //libs.util.log(breadcrumbTrail);

        //libs.util.log(site);
        //libs.util.log(content);


        return model;
    }



    function getBreadcrumbTrail() {
        var content = libs.portal.getContent();

        libs.util.log(content);

        // Remove leading slash
        var fullPath = content._path.replace(/^\/|\/$/g, '');
        var pathArray = fullPath.split('/');

        //libs.util.log(pathArray);

        var breadCrumbTrail = [];

        for (var i = 1; i <= pathArray.length; i++) {

            var currentPath = '/' + pathArray.slice(0, i).join('/');

            libs.util.log(currentPath);

            breadCrumbTrail.push(getBreadcrumb(currentPath))
        }

        //libs.util.log(breadCrumbTrail);


        return breadCrumbTrail;


    }

    function getBreadcrumb(path) {
        var breadcrumb = {};
        var result = libs.content.get({
            key: path
        });

        if (result) {
            //breadcrumb.path = null;
            //libs.util.log(result);
        }

        return result;

    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}