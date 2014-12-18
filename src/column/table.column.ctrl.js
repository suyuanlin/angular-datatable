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
        .controller('dataTableColumnController', function ($scope, $element, $attrs) {

            //find custom render
            var name = $attrs.name || '',
                renderFnName = 'render' + name.split('')[0].toUpperCase() + name.substr(1),
                render = $scope[$attrs.render] || $scope[renderFnName];

            //special render
            if ($attrs.render == 'checked') {
                $scope.$table.userCheckMode($attrs.name);
            }

            var columnConfig = {

                //
                sName: $attrs.name || '',
                mTitle: $attrs.head,
                mTip: $attrs.tooltip,
                mIndex: $scope.$table.columns.length,
                bChecked: $attrs.render == 'checked',

                //
                sClass: $attrs.css || '',
                sWidth: $attrs.width || 'smart',
                bVisible: $attrs.novisible === undefined,
                bSortable: $attrs.sort !== undefined,
                mDataProp: function (aData, type) {

                    //
                    if (type != 'display') {
                        return '';
                    }
                    //
                    if (arguments.length == 3) {
                        return arguments[2];
                    }
                    else {
                        var r = render ? render.apply(this, arguments) : aData[name];
                        r = r != undefined ? r : '';
                        if (r != undefined && angular.isString(r)) {
                            r = $.trim(r);
                            r = r.length ? r : ''
                            r = '<div>' + r + '</div>';
                        }
                        return r;
                    }
                }
            };

            //
            $scope.$table.columns.push(columnConfig);
        }
    );
})();