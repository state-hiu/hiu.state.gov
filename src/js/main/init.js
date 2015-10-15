var init_main = function(appName, prefixFilter)
{
    var mainApp = angular.module(appName, []);
    $('.site-controller').each(function(){
        var that = $(this);
        var controllerName = that.data('siteControllerName');
        var controllerType = that.data('siteControllerType');
        if(controllerType.toLowerCase()=="data")
        {
            var url = that.data('siteControllerUrl');
            var regionFilter = that.data('siteControllerRegionFilter').split(";");
            var regionName = that.data('siteControllerRegionName');
            init_controller_data(mainApp, that, controllerName, prefixFilter, regionFilter, regionName, url);
        }
    });
    angular.bootstrap(document, [appName]);
};

var init_controller_data = function(app, element, controllerName, prefixFilter, regionFilter, regionName, url)
{
    app.controller(controllerName, function($scope, $http) {
        $scope.datasets = [];
        $.ajax({
            dataType: "xml",
            url: url,
            success: function(response) {
                $scope.datasets = parseCSW(response, prefixFilter, regionFilter, regionName);
                $scope.$apply();
            }
        });
    });
};
