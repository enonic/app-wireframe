var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    menu: require('/lib/enonic/menu/menu'),
    util: require('/lib/enonic/util/util')
};

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var siteConfig = libs.portal.getSiteConfig();
    var site = libs.portal.getSite();
    var content = libs.portal.getContent();
    var view = resolve('default.html');
    var model = createModel();

    function createModel() {
        var model = {};
        model.mainRegion = content.page.regions['main'];
        model.sitePath = site['_path'];
        model.currentPath = content._path;
        model.pageTitle = getPageTitle();
        model.metaDescription = getMetaDescription();
        model.menuItems = libs.menu.getMenuTree(3);
        model.companyName = siteConfig.companyName;

        model.showFooterNav = siteConfig.footerNavigation ? true : false;
        model.footerSocial = libs.util.data.forceArray(siteConfig.footerSocial);
        model.footerSocial = libs.util.data.trimArray(model.footerSocial);
        model.footerText = siteConfig.footerText;

        model.showFooter = model.showFooterNav || model.footerSocial.length > 0 || model.footerText;

        model.showSocialMediaLinksInFooter = showSocialMediaLinksInFooter();

        return model;
    }

    function getPageTitle() {
        return content['displayName'] + ' - ' + site['displayName'];
    }

    function getMetaDescription() {
        var appNamePropertyName = app.name.replace(/\./g,'-');
        var metaDescription = null;

        if (content.x[appNamePropertyName]) {
            if (content.x[appNamePropertyName]['html-meta']) {
                if (content.x[appNamePropertyName]['html-meta']['htmlMetaDescription']) {
                    metaDescription = content.x[appNamePropertyName]['html-meta']['htmlMetaDescription'];
                }
            }
        }
        return metaDescription;
    }


    function showSocialMediaLinksInFooter() {
        var show = false;
        var config = libs.portal.getSiteConfig();
        if (config['showSocialMediaLinksInFooter']) {
            show = true;
        }
        return show;
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}