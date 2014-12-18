//-----------------------------------------------------------------------------------------------
//
//
//  dataTable directive
//
//
//-----------------------------------------------------------------------------------------------

;(function(){
    angular.module('ngDataTable')
        .directive('dataTable', function () {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                controller: 'dataTableController',
                template: function(){
                    [
                        '<div>',
                            '<table class="table table-striped table-bordered table-hover">',
                                '<thead>',
                                    '<tr role="row" class="heading">',
                                        '<th ng-repeat="column in $table.columns" >',
                                            '{{column.mTitle}}',

                                            //data column is check
                                            '<input ng-if="column.bChecked" type="checkbox" ng-click="$table.selectAll()"/>',

                                            //data column need tooltip
                                            '<a ng-if="column.mTip" title="{{column.mTip}}" href="javascript:void(0);"><i class="icon icon-question-sign"></i></a>',

                                            //only to notice all column has create, tell us to create data table now
                                            '<span ng-if="$last" ng-init="$table.initTable()" style="display:none"></span>',
                                        '</th>',
                                    '</tr>',
                                '</thead>',
                                '<tbody></tbody>',
                            '</table>',
                            '<div ng-transclude></div>',
                        '</div>'
                    ].join('')
                }
            };
        });
})();

