/********************************************************************************************************************
 *                                                      添加项目页
 ********************************************************************************************************************/

angular.module("businessaddMoudle", []).controller('BusinessAddCtrl', 
    ['$scope','$window','$http', '$state', '$stateParams','businessData','$alert','groupData','tagData','customerData',
    function($scope,$window, $http, $state, $stateParams,businessData,$alert,groupData,tagData,customerData) {
    $window.document.title = "添加项目-呐呐CRM";
    $scope.sexs = [
            {"value":"0","label":"男"},
            {"value":"1","label":"女"}
        ];
 
    /* 客户设置 */
    $http({
        url:'data/customerSet.json',
        method:'GET'
    }).success(function(data){
        /* 客户来源 */
        $scope.origins = data.origins;
        /*客户状态*/
        $scope.progress = data.progress;
        /*客户类型*/
        $scope.class = data.class;
        /* 推进状态*/
        $scope.status = data.status;
    })
    // $http({
    //     url:'data/person.json',
    //     method:'GET'
    // }).success(function(data){
    //     /*  添加日程 --联系人 */
    //     $scope.person = data.person;
    // })

    /* 自定义 -- 公司*/
    customerData.getData().then(function (data) {
        var company=[];
        for(var i in data.customers){
            company.push({
                value:i,
                id:data.customers[i]._id,
                label:data.customers[i].companyName
            })
        }
        $scope.company = company
    })

    /* 初始化项目 -- 带本地储存*/
    if(localStorage.business){
        $scope.customer = JSON.parse(localStorage.business)
    }else{
        $http({
            url:'data/businessadd.json',
            method:'GET'
        }).success(function(data){
            $scope.customer=data;
        })
    }

    /* 本地储存 */
    var time = setInterval(function(){
        localStorage.business= JSON.stringify($scope.customer);
    },6000);

    /* 分组 */
    groupData.getData().then(function (data) {
        $scope.groups = data.groups;

    });
    /* 客户标签*/
    tagData.getData().then(function (data) {
        $scope.tags = data.tags;

    });
    $scope.saveData = function(value){
        businessData.addData(value).then(function (data) {
            if(data.status == 0){
                $scope.changeAlert(data.msg);
            }else{
                $scope.changeAlert(data.msg);
                window.history.go(-1)
                localStorage.removeItem("business");
                clearInterval(time);
            }
        })
    }
    /*提示框*/
    $scope.changeAlert = function(title,content){
        $alert({title: title, content: content, type: "info", show: true,duration:5});
    }
    /* 添加日程 */
    $scope.scheadd = function(){
        $scope.customer.schedule.unshift({remind:[{date:''}]});
        $scope.openSchedule(0);
    }
    /* 删除日程 */
    $scope.schedel = function(index,value){
        var deleteConfirm = confirm('您确定要删除此日程？');
        if(deleteConfirm){
            $scope.customer[value].splice(index,1);
        }
    }
    /* 完成日程 */
    $scope.schecomp = function(index,value){
        var now_date = new Date();
        var completeData = $scope.customer[value][index];
        completeData.nowDate = now_date.getTime();
        $scope.customer.schedule_complete.unshift($scope.customer[value][index]);
        $scope.customer[value].splice(index,1);
    }
    /* 撤销日程 */
    $scope.schereply = function(index,value){
        $scope.customer.schedule.unshift($scope.customer[value][index]);
        $scope.customer[value].splice(index,1);
    }

    /* 选择项目状态*/
    $scope.checkStatus = function(value){
        $scope.customer.status = value;
    }
    $scope.compareStatus = function(e){
        return e.value >$scope.customer.status;
    }

    /***************************** 以下是添加日程弹窗 *****************************/

    
    /*日程单条数据 */
    var date =  new Date();
    today = date.getTime();
    $scope.schedule = {"fromDate":today,"untilDate":today,"remind":[{"date":today,}]};     //初始空数据
    /* 保存数据，并且添加到原始数据里 */
    $scope.saveSchedule = function(value){
        value.schedule.unshift($scope.schedule);  
        $scope.cancleSchedule();    
    }
    /* 清空日程弹出框数据 */
    $scope.cancleSchedule = function(){  
        $scope.schedule = {"fromDate":today,"untilDate":today,"remind":[{"date":today,}]};     //初始空数据
    }
    /* 添加日程提醒 */
    $scope.remindadd = function(){
        $scope.schedule.remind.push({});
    }
    /* 删除日程提醒 */
    $scope.reminddel = function(index){
        if ($scope.schedule.remind.length >1){
            $scope.schedule.remind.splice(index,1);
        }
    }

    /***************************** 以下是修改日程弹窗 *****************************/

    /*日程单条数据 */
    var editIndex;
    $scope.editSchedule = function(value){
        $scope.scheduleModal = angular.copy(value);
        editIndex = $scope.customer.schedule.indexOf(value)
    }
    $scope.saveEditSchedule = function(value){
        value.schedule[editIndex] = $scope.scheduleModal;
        $scope.cancleEditSchedule();    
    }
    /* 添加日程提醒 */
    $scope.remindaddModal = function(){
        $scope.scheduleModal.remind.push({});
    }
    /* 删除日程提醒 */
    $scope.reminddelModal = function(index){
        if ($scope.scheduleModal.remind.length >1){
            $scope.scheduleModal.remind.splice(index,1);
        }
    }
    /* 清空日程弹出框数据 */
    $scope.cancleEditSchedule = function(){  
        $scope.schedule = {"fromDate":null,"untilDate":null,"remind":[{"date":null}]};     //初始空数据
    }
    
}]);