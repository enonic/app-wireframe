var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util')
};

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var component = libs.portal.getComponent();
    var view = resolve('sample-text.html');
    var model = createModel();

    function createModel() {
        var model = {};
        var numOfWords = component.config.numOfWords;
        model.text = getText(numOfWords);
        return model;
    }

    function getText(numOfWords) {
        var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus volutpat lorem at blandit. Nulla fermentum urna et hendrerit finibus. Quisque dapibus congue ex, et sagittis quam faucibus ut. Proin quis tortor sed erat feugiat aliquet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec nisi diam, fringilla finibus magna at, tempus viverra arcu. Etiam accumsan nisi eu nisi maximus fermentum. Mauris vel risus id metus facilisis tincidunt a sed turpis. Fusce nisl mi, tempus et quam in, congue bibendum nisi. Nunc placerat urna vel molestie porttitor. Praesent lacinia vulputate nibh tincidunt ullamcorper. Nam vehicula augue a hendrerit consectetur.';
        var truncatedText = text.split(' ').splice(0, numOfWords).join(' ');
        return truncatedText;
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}