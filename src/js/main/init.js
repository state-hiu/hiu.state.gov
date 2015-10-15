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
            var sRegionFilter = that.data('siteControllerRegionFilter');
            var aRegionFilter = undefined;
            if(sRegionFilter !== undefined)
            {
                if(sRegionFilter.length > 0)
                {
                    aRegionFilter = sRegionFilter.split(";");
                }
            }
            var regionName = that.data('siteControllerRegionName');
            init_controller_data(mainApp, that, controllerName, prefixFilter, aRegionFilter, regionName, url);
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
                $("#tab-data a span.count").html(" ("+$scope.datasets.length+")");
                $scope.$apply();
            }
        });
    });
};
