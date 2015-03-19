var UTIL = require('/cms/lib/util/js/util.js');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var me = this;

    function renderView() {
        var view = resolve('breadcrumbs.html');
        var model = createModel();
        return UTIL.view.render(view, model);
    }

    function createModel() {
        UTIL.log(execute('portal.getContent'));
        var model = {};
        return model;
    }

    /*function getBreadcrumbTrail() {
        var content = execute('portal.getContent');
        var fullPath = content._path;

        var pathArray = fullPath.split('/');


        var breadCrumbTrail = [];






    }

    function getBreadcrumb(path) {
        var breadcrumb = {};
        var result = execute('content.get', {
            key: path
        });

        if (result) {
            breadcrumb.path =
        }

        return breadcrumb;

    }*/

    return renderView();
}