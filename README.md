angular-datatable
=================


# install
```
bower install angular-datatable
```

# use
```html
<script type="text/javascript" src="bower_components/angular-datatable/datatable.js"></script>

<div ng-controller="DemoCtrl">
    <dataTable>
        <data-table-column head="Test" name="test"></data-table-column>
        <data-table-column head="Test2" render="renderTest2"></data-table-column>
        <data-table-column head="Test3" render="test3"></data-table-column>
        <data-table-column head="Test4">
            {{rowData.test4}}
        </data-table-column>
    </dataTable>
</div>

<script type="text/javascript">
    function DemoCtrl($scope){

        $scope.renderTest = function(rowData){
            return $('this is a demo' + rowData.name);
        }

        $scope.renderTest2 = function(rowData){
            return rowData.test;
        }
    }
</script>
```


### DataTable
>
#### example
```javascript
<data-table url="" manual nopage sort="">
</data-table>
```
####
name|desc|isRequest|defaultValue
---|---|---|---
url|data url|Yes|
manual|not auto request data, manual call ```doSearch```|No|false
nopage|not page mode|No|false
sort|```[[fieldNum,'desc|asc']]```|No|"[]"
#### method
name|desc
---|---
doSearch({}, url)|
#### event
name|desc
---|---|---
dataTable.beforeLoadData|prepare to request remote data
dataTable.afterLoadData|this request is complete, whatever success or error
dataTable.failLoadData|the remote server return error
dataTable.beforeHandlerData|the dataTable before handle data
dataTable.afterHandlerData|the dataTable after handle data
dataTable.beforeDoSearch|
dataTable.doSelectAll|click the all check dom
dataTable.doSelectOne|click the check dom
---------------------------------------


### DataTableColumn
>
#### example
```javascript
<data-table-column head="" name="" render="" novisible sort></data-table-column>
```
####
name|desc|isRequire|defaultValue
---|---|---|---
head|columnTitle, show in <th>|Yes
name|if the render not assign, use rowData[name] to show in <td>|No
render|assign to $scope[render]|No
novisible|not show|No|
sort|is open sort|No|


