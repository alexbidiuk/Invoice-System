(function() {
    'use strict';

    angular.module('app.home', [])
        .controller('homeController', homeCtrl);


    homeCtrl.$inject = ['$rootScope', '$state', '$scope', '$window', 'getInvoices', 'Invoice', 'Customer'];

    function homeCtrl($rootScope, $state, $scope, $window, getInvoices, Invoice, Customer) {

        var home = this;

        home.invoices = getInvoices;
        
        home.deleteInvoice = deleteInvoice;


        function deleteInvoice(invoice_id, index) {

            Invoice.delete({ id: invoice_id }, function() {
                home.invoices.splice(index, 1);
            });

        };


    };

})();
