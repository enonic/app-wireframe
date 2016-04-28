var UTIL = require('/lib/enonic/util/util');
var imageLib = require('/lib/enonic/image/image');
var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var test = require('/lib/util/js/test');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var me = this;

    function renderView() {
        var view = resolve('test.html');
        var model = createModel();

        return {
            body: thymeleaf.render(view, model)
        };
    }

    function createModel() {
        var model = {};


        var content = portal.getContent();

        var image = content.data.image;

        var fish = test.test2.fish();
        UTIL.log(fish);



        var format = 'jpg';
        var quality = 100;
        var filter = null;

        model.images = [
            imageLib.create(image, 'width(100)', filter, format, quality, false),
            imageLib.create(image, 'height(200)', filter, format, quality, false),
            imageLib.create(image, 'square(300)', filter, format, quality, false),
            imageLib.create(image, 'max(400)', filter, format, quality, false),
            imageLib.create(image, 'wide(100,200)', filter, format, quality, false),
            imageLib.create(image, 'block(200,100)', filter, format, quality, false),
            imageLib.create(image, 'width(100)', filter, format, quality, true),
            imageLib.create(image, 'height(200)', filter, format, quality, true),
            imageLib.create(image, 'square(300)', filter, format, quality, true),
            imageLib.create(image, 'max(400)', filter, format, quality, true),
            imageLib.create(image, 'wide(100,200)', filter, format, quality, true),
            imageLib.create(image, 'block(200,100)', filter, format, quality, true)
        ];



        UTIL.log(createValidContentName('heipådeg'));

        return model;
    }

    return renderView();
}

function createValidContentName(string) {
    var validContentName = string.replace(/[^a-zA-ZæøåÆØÅ\d .-_:#%+^&()<>;$',]/g, '');
    return validContentName;
}