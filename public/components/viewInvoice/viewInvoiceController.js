(function() {
    'use strict';

    angular.module('app.viewInvoice', [])
        .controller('viewInvoiceController', viewCtrl);


    viewCtrl.$inject = ['$rootScope', '$state', '$scope', '$stateParams', 'getInvoice', 'calculateservices'];

    function viewCtrl($rootScope, $state, $scope, $stateParams, getInvoice, calculateservices) {

        var viewInvoice = this;

        viewInvoice.invoiceItems = [];

        viewInvoice.invoice = getInvoice;

        viewInvoice.invoice.invoiceItems = getInvoice.invoiceItems;

        viewInvoice.invoice.selectedCustomer = getInvoice.customer;

        viewInvoice.invoiceItemTotal = calculateservices.invoiceItemTotal;

        viewInvoice.invoiceSubTotal = calculateservices.invoiceSubTotal;

        viewInvoice.calculateDiscount = calculateservices.calculateDiscount;

        viewInvoice.invoiceGrandTotal = calculateservices.invoiceGrandTotal;

    };

})();
