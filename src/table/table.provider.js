//-----------------------------------------------------------------------------------------------
//
//
//  dataTable provider
//      provider custom datatable style config
//
//-----------------------------------------------------------------------------------------------
;
(function () {

    angular.module('ngDataTable')
        .provider('dataTableFactory', function () {
            var defaultConfig = {
                "bDestroy": true,
                "bLengthChange": true,
                "bFilter": false,
                "bSort": true,
                "bAutoWidth": false,
                "bStateSave": true,
                "fnStateLoadParams": function (oSettings, oData) {
                },
                "oLanguage": {
                    "sProcessing": '<img src="/static/img/loading-spinner-grey.gif"/><span>&nbsp;&nbsp;正在查询...</span>',
                    "sLengthMenu": "每页显示 _MENU_ 条",
                    "sZeroRecords": "请选择条件后，点击搜索按钮开始搜索",
                    "sInfo": "<label>当前第 _START_ - _END_ 条　共计 _TOTAL_ 条</label>",
                    "sInfoEmpty": "没有符合条件的记录",
                    "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
                    "sSearch": "查询",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "尾页"
                    }
                },
                "aLengthMenu": [
                    [10, 20, 30],
                    [10, 20, 30]
                ],
                "bProcessing": true,
                "bServerSide": true
            };

            /**
             * set custom config
             * @param config
             */
            this.setConfig = function (config) {
                $.extend(defaultConfig, config || {});
            };

            /**
             * export
             * @returns {{create: create}}
             */
            this.$get = function () {
                return {
                    create: function (scope, element, attrs, columns) {
                        return new Builder(scope, element, attrs, columns).create();
                    }
                }
            }
        });


    /**
     *
     * @param scope
     * @param element
     * @param attrs
     * @param columns
     * @constructor
     */
    var Builder = function (scope, element, attrs, columns) {
        this.scope = scope;
        this.element = element;
        this.attrs = attrs;
        this.columns = columns;
        this.dataProvider = new DataProvider(this);

        this.initConfig();
    };

    $.extend(Builder.prototype, {

        /**
         *
         * @param scope
         * @param element
         * @param attrs
         * @param columns
         */
        initConfig: function () {
            this.config = {
                "aoColumns": this.columns,
                "aaSorting": JSON.parse(this.attrs.sort || '[]'),
                "fnInitComplete": function () {
                },
                "fnServerData": $.proxy(this.dataProvider.loadData, this.dataProvider)
            };

            //check is nopage mode?
            if (this.attrs.nopage) {
                this.config.bPaginate = false;
                this.config.bInfo = false;
            }
        },

        /**
         *
         */
        create: function () {
            return this.instance = $(this.element.find('table')).dataTable(this.config);
        }
    });


    /**
     *
     * @param builder
     * @constructor
     */
    var DataProvider = function (builder) {
        this.builder = builder;
    };
    $.extend(DataProvider.prototype, {
        loadData: function (sSource, aoData, fnCallback) {
            var scope = this.builder.scope,
                attrs = this.builder.attrs;

            //not set url or set manual mode
            if (!attrs.url || attrs.manual != undefined) {
                delete attrs.manual;
                fnCallback({aaData: [], iTotalRecords: 0, iTotalDisplayRecords: 0});
                return;
            }

            //before loadData you can add other request param in aoData
            scope.$emit('dataTable.beforeLoadData', aoData)

            //
            $.post(url, aoData).then(

                //success load data
                function(responseData){
                    scope.$emit('dataTable.beforeHandlerData', responseData);
                    fnCallback(responseData);
                    scope.$emit('dataTable.afterHandlerData', responseData);
                },

                //fail load data
                function(responseData){
                    scope.$emit('dataTable.failLoadData', responseData);
                })
            .finally(

                //whatever call this function
                function () {
                    scope.$emit('dataTable.afterLoadData');
                });
        }
    })
})
();