//------------------------------------------------------
//
//
//
//
//
//------------------------------------------------------
;
(function () {
    angular.module('ngDataTable')
        .directive('dataTableColumn', function () {
            return {
                restrict: 'E',
                transclude: true,
                template: '',
                replace: true,
                controller: 'dataTableColumnController'
            };
        });
})();