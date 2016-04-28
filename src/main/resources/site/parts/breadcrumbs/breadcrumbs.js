var UTIL = require('/lib/enonic/util/util');
var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var me = this;

    function renderView() {
        var view = resolve('breadcrumbs.html');
        var model = createModel();

        return {
            body: thymeleaf.render(view, model)
        };
    }

    function createModel() {
        var model = {};

        var site = portal.getSite();
        var content = portal.getContent();

        UTIL.log(site);
        UTIL.log(content);


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