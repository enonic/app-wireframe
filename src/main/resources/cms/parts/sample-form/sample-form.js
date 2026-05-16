var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/thymeleaf')
};

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var component = libs.portal.getComponent();
    var content = libs.portal.getContent();
    var view = resolve('sample-form.html');
    var model = createModel();

    function createModel() {
        var model = {};
        model.formRows = getFormRows();
        model.editMode = req.mode === 'edit';
        return model;
    }

    function getFormRows() {
        var formRows = component.config.formRow;
        formRows = (Array.isArray(formRows) ? formRows : [formRows]);
        formRows = formRows.filter(function (v) { return v != null && v !== ''; });
        return formRows;
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}
