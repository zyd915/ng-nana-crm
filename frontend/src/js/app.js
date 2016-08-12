var app = angular.module('app', [
        'ngAnimate',
        'ui.router',
        'mgcrea.ngStrap',
        'ui.bootstrap',
        'angular-loading-bar',
        'angular-simditor',
        'serviceData',
        'navleftMoudle',
        'navtopMoudle',
        'homeMoudle',
        'detialMoudle',
        'customeraddMoudle',
        'customerlistMoudle',
        'clueMoudle',
        'cluedetialMoudle',
        'clueaddMoudle',
        'businessMoudle',
        'businessdetialMoudle',
        'businessaddMoudle',
        'customerSettingMoudle',
        'productsMoudle',
        'productsCateMoudle',
        'productsAddMoudle',
        'productsDetailMoudle',
        'addImgMoudle',
        'quotationMoudle',
        'quotationAddMoudle',
        'quotationDetailMoudle',
        'quotationSettingMoudle',
        'peopleMoudle',
        'peopleDetailMoudle',
        'settingMoudle'
        ]);  


/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
app.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                },
                'main@index': {
                    templateUrl: 'tpls/loginForm.html'
                }
            }
        })
        .state('web', {
            url: '/web',
            templateUrl: 'tpls/nav.html'
        })
        .state('web.home', {
            url: '/home',
            templateUrl: 'tpls/home/index.html'
        })
        .state('web.clue', {
            url: '/clue',
            templateUrl: 'tpls/customer/clue.html'
        })
        .state('web.clueadd', {
            url: '/clueadd',
            templateUrl: 'tpls/customer/clueadd.html'
        })
        .state('web.cluedetial', {
            url: '/cluedetial/:id',
            templateUrl: 'tpls/customer/cluedetial.html'
        })
        .state('web.customer', {
            url: '/customer',
            templateUrl: 'tpls/customer/customer.html'
        })
        .state('web.customeradd', {
            url: '/customeradd',
            templateUrl: 'tpls/customer/customeradd.html'
        })
        .state('web.customerdetial', {
            url: '/customerdetial/:id',
            templateUrl: 'tpls/customer/customerdetial.html'
        })
        .state('web.business', {
            url: '/business',
            templateUrl: 'tpls/customer/business.html'
        })
        .state('web.businessadd', {
            url: '/businessadd',
            templateUrl: 'tpls/customer/businessadd.html'
        })
        .state('web.businessdetial', {
            url: '/businessdetial/:id',
            templateUrl: 'tpls/customer/businessdetial.html'
        })
        .state('web.customerSetting', {
            url: '/customerSetting',
            templateUrl: 'tpls/customer/customerSetting.html'
        })
        .state('web.products', {
            url: '/products',
            templateUrl: 'tpls/products/products.html'
        })
        .state('web.productsCate', {
            url: '/productsCate',
            templateUrl: 'tpls/products/productsCate.html'
        })
        .state('web.productsAdd', {
            url: '/productsAdd',
            templateUrl: 'tpls/products/productsAdd.html'
        })
        .state('web.productsDetail', {
            url: '/productsDetail/:id',
            templateUrl: 'tpls/products/productsDetail.html'
        })
        .state('web.addimg', {
            url: '/addimg',
            templateUrl: 'tpls/products/addimg.html'
        })
        .state('web.quotation', {
            url: '/quotation',
            templateUrl: 'tpls/quotation/quotation.html'
        })
        .state('web.quotationAdd', {
            url: '/quotationAdd',
            templateUrl: 'tpls/quotation/quotationAdd.html'
        })
        .state('web.quotationDetail', {
            url: '/quotationDetail/:id',
            templateUrl: 'tpls/quotation/quotationDetail.html'
        })
        .state('web.quotationSetting', {
            url: '/quotationSetting',
            templateUrl: 'tpls/quotation/quotationSetting.html'
        })
        .state('web.people', {
            url: '/people',
            templateUrl: 'tpls/people/people.html'
        })
        .state('web.peopleDetail', {
            url: '/peopleDetail/:id',
            templateUrl: 'tpls/people/peopleDetail.html'
        })
        .state('web.setting', {
            url: '/setting',
            templateUrl: 'tpls/setting/setting.html'
        })
        
});
/* 加载进度条 */
app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.includeSpinner  = false;
}])