var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var me = this;

    function renderView() {
        var view = resolve('list.html');
        var model = createModel();

        return {
            body: thymeleaf.render(view, model)
        };
    }

    function createModel() {
        me.component = portal.getComponent();
        var model = {};

        return model;
    }

    return renderView();
}