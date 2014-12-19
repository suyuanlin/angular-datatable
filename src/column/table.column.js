//------------------------------------------------------
//
//
//
//
//
//------------------------------------------------------
;
(function () {
    angular.module('dataTable')
        .directive('uiDataTableColumn', function () {
            return {
                restrict: 'E',
                transclude: true,
                template: '',
                replace: true,
                controller: 'uiDataTableColumnController'
            };
        });
})();