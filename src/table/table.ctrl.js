//-----------------------------------------------------------------------------------------------
//
//
//  dataTable ctrl
//
//
//-----------------------------------------------------------------------------------------------

;
(function () {

    /**
     * export
     */
    angular.module('dataTable')
        .controller('uiDataTableController', function ($scope, $element, $attrs, uiDataTableFactory) {

            //删除qm-column数据, 无用数据
            $element.find('>div').remove();

            //
            var $table = {

                $el: $element,

                //
                columns: [],

                //
                nopageMode: $attrs.nopage !== undefined,

                //
                pageResult: undefined, //data

                //
                idName: undefined,  //
                elAllCheck: undefined, //all check dom
                checkMode: false, //check mode, default off
                elChecks: [], //all checks dom
                checkNum: 0, //check number
                selectValues: [], //check item values
                selectItems: [], //check item objects


                //
                instance: undefined,
                initTable: function () {
                    if (this.checkMode) {
                        this.elAllCheck = $element.find('th :checkbox')[0];
                    }
                    $table.instance = uiDataTableFactory.create($scope, $element, $attrs, $table.columns);
                },

                /**
                 *
                 * @param rowIndex
                 * @returns {*}
                 */
                getRowDataAtIndex: function (rowIndex) {
                    return this.pageResult.aaData[rowIndex];
                },

                /**
                 * all setting
                 * @param columnIndex
                 */
                getSetting: function () {
                    var settings = $scope.$table.instance.fnSettings();
                    return settings;
                },

                /**
                 * row setting
                 * @param columnIndex
                 */
                getColumnSetting: function (columnIndex) {
                    var settings = this.getSetting();
                    return settings.aoColumns[columnIndex];
                },

                /**
                 *
                 */
                beforeDataHandler: function (responseData) {
                    this.checkNum = 0;
                    this.elChecks = [];
                    this.pageResult = responseData;

                    if (this.checkMode) {
                        this.elAllCheck.checked = false;
                    }

                    //
                    if (this.nopageMode) {
                        this.selectValues = [];
                        this.selectItems = [];
                    }
                },

                /**
                 *
                 */
                afterDataHandler: function (responseData) {
                    if (this.checkMode) {
                        this.checkAllState();
                    }
                },

                /**
                 *  error load data
                 */
                errorHandleData: function (json) {
                },

                /**
                 * setup check mode
                 */
                userCheckMode: function (idName) {
                    if (!this.checkMode) {
                        this.checkMode = true;
                        this.idName = idName || 'id';
                    }
                },

                /**
                 * check all
                 */
                checkAllState: function () {
                    var notDisabledCheckboxNum = 0;
                    $.each(this.elChecks, function (i, cb) {
                        if (!cb.disabled) {
                            notDisabledCheckboxNum++;
                        }
                    });
                    this.elAllCheck.checked = this.checkNum == notDisabledCheckboxNum && this.checkNum != 0;
                },

                /**
                 * add request param to load data
                 * @param params
                 * @param url
                 */
                doSearch: function (params, url) {
                    $scope.$emit('dataTable.beforeDoSearch');
                    $attrs.searchParams = params || [];
                    $attrs.url = url || $attrs.url;
                    $table.instance.fnPageChange("first");
                },

                /**
                 * jump to page
                 * @param index
                 */
                jumpTo: function (index) {
                    if (/^\d+$/.test(index)) {
                        index = parseInt(index) - 1;
                    }
                    else if (index == undefined) {
                        index = this.getCurrentPage() - 1;
                    }
                    $table.instance.fnPageChange(index != undefined ? Math.abs(index) : "first");
                },

                /**
                 *
                 * @returns {number}
                 */
                getCurrentPage: function () {
                    var setting = this.getSetting();
                    return setting._iDisplayStart / setting._iDisplayLength + 1;
                },

                /**
                 * click all check dom
                 */
                selectAll: function (focusSelect) {
                    var isCheck = focusSelect != undefined ? focusSelect : this.elAllCheck.checked;
                    $table.checkNum = 0;
                    $(this.elChecks).each(function (i, item) {
                        item.checked = isCheck;	//set status
                        if (isCheck) {
                            $table.checkNum++;
                            $table.selectValues.upush(item.value);
                        }
                        else {
                            $table.checkNum--;
                            $table.selectValues.remove(item.value);
                        }
                    });
                    this.checkAllState();
                    $scope.$emit('dataTable.doSelectAll', isCheck, $table.selectValues);
                },

                /**
                 * click one check dom
                 * @param target
                 */
                selectOne: function (target) {
                    var isCheck = target.checked;
                    if (isCheck) {
                        this.checkNum++;
                        this.selectValues.upush(target.value);
                    }
                    else {
                        this.checkNum--;
                        this.selectValues.remove(target.value);
                    }
                    this.checkAllState();
                    $scope.$emit('dataTable .doSelectOne', isCheck, $table.selectValues);
                }

            };

            //
            $scope.$table = $table;
            $scope.$on('dataTable.beforeLoadData', function(evt, aoData){
            });
            $scope.$on('dataTable.beforeHandlerData', function(evt, responseData){
                $scope.$table.beforeDataHandler(responseData);
            });
            $scope.$on('dataTable.afterHandlerData', function(evt, responseData){
                $scope.$table.afterDataHandler(responseData);
            });
            $scope.$on('dataTable.failLoadData', function(evt, responseData){
                $scope.$table.errorHandleData(responseData);
            });
            $scope.$on('dataTable.afterLoadData', function(evt){
            });

        });
})();