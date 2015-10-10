/*var init_main = function(appName, prefixFilter)
{
    var mainApp = angular.module(appName, []);
    $('.site-controller').each(function({
        var that = $(this);
        var controllerName = that.data('siteControllerName');
        var controllerType = that.data('siteControllerType');
        if(controllerType.toLowerCase()=="data")
        {
            var url = that.data('siteControllerUrl');
            init_controller_data(app, that, controllerName, prefixFilter, url);
        }
    });
    angular.bootstrap(document, [appName]);
};


var init_controller_data = function(app, element, controllerName, prefixFilter, url)
{
    app.controller(controllerName, function($scope, $http) {
        $http.get(url)
            .success(function(response)
            {
                $scope.datasets = parseCSW(response, prefixFilter);
            });
    });
};*/
