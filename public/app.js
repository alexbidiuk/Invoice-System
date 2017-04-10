(function() {
    'use strict';

    angular.module('app', [
            'ui.router',
            'ngResource',
            'ngMaterial',
            // 'ngMessages',
            'angular-auto-save-form',
            'app.addFormsService',
            'app.calculateServices',
            'app.home',
            'app.customers',
            'app.products',
            'app.invoiceForm',
            // 'app.editInvoice',
            'app.viewInvoice',
            'app.services',
            'app.constants'

        ])
        .config(config);


    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise('/');

        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/components/home/views/home.html',
                controller: 'homeController',
                controllerAs: 'home',
                resolve: {
                    getInvoices: getInvoices
                }
            })
            .state('customers', {
                url: '/customers',
                templateUrl: '/components/customers/views/customers.html',
                controller: 'customersController',
                controllerAs: 'customers',
                resolve: {
                    getCustomers: getCustomers
                }
            })
            .state('products', {
                url: '/products',
                templateUrl: '/components/products/views/products.html',
                controller: 'productsController',
                controllerAs: 'products',
                resolve: {
                    getProducts: getProducts
                }
            })
            .state('invoiceForm', {
                url: '/invoices/new',
                templateUrl: 'components/invoiceForm/views/invoiceForm.html',
                controller: 'invoiceFormController',
                controllerAs: 'invoiceForm',
                resolve: {
                    getInvoice: newInvoice
                }
            })
            .state('editInvoice', {
                url: '/invoices/:id/edit',
                templateUrl: 'components/invoiceForm/views/invoiceForm.html',
                controller: 'invoiceFormController',
                controllerAs: 'invoiceForm',
                resolve: {
                    getInvoice: getInvoice
                }
            })
            .state('viewInvoice', {
                url: '/invoices/:id/view',
                templateUrl: 'components/viewInvoice/views/viewInvoice.html',
                controller: 'viewInvoiceController',
                controllerAs: 'viewInvoice',
                resolve: {
                    getInvoice: getInvoice
                }
            })

        // some spaghetti code for taking invoice information about customer, invoice items, products

        function getInvoice(Invoice, Customer, Product, InvoiceItems, $stateParams, $q) {

            var invoiceInfo;

            return Invoice.get({
                    id: $stateParams.id
                })
                .$promise.then(function(invoice) {

                    invoiceInfo = invoice;

                    return Customer.get({

                        id: invoice.customer_id
                    }).$promise
                })
                .then(function(customer) {

                    invoiceInfo.customer = customer;

                    return InvoiceItems.query({

                        invoice_id: invoiceInfo.id
                    }).$promise
                })
                .then(function(invoiceItems) {

                    var invoiceItemsPromises = [];

                    invoiceInfo.invoiceItems = [];

                    angular.forEach(invoiceItems, function(value, key) {

                        var invoiceItemPromise = Product.get({

                            id: value.product_id

                        }, function(product) {

                            value.selectedProduct = product;

                            invoiceInfo.invoiceItems.push(value);


                        });

                        invoiceItemsPromises.push(invoiceItemPromise);
                    });

                    return $q.all(invoiceItemsPromises)

                })
                .then(function() {

                    return invoiceInfo;
                });


        };

        //creating new invoice 

        function newInvoice() {

            var invoice;

            return invoice = {
                invoiceItems: [],
                discount: 0,
                total: 0
            };
        };

        //taking all invoices

        function getInvoices(Invoice, Customer, $q) {

            var allInvoices;

            return Invoice.query().$promise

                .then(function(invoices) {

                    allInvoices = invoices

                    var invoicesPromises = [];

                    angular.forEach(allInvoices, function(value, key) {

                        var invoicePromise = Customer.get({ id: value.customer_id }, function(customer) {

                            value.customerName = customer.name;

                        });

                        invoicesPromises.push(invoicePromise);
                    });

                    return $q.all(invoicesPromises)
                })
                .then(function() {

                    return allInvoices;
                });
        };

        function getCustomers(Customer) {

            return Customer.query().$promise;

        };

        function getProducts(Product) {

            return Product.query().$promise;

        };
    }


})();
