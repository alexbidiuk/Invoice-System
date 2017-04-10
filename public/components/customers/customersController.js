(function() {
    'use strict';

    angular.module('app.customers', [])
        .controller('customersController', customersCtrl);


    customersCtrl.$inject = ['$rootScope', '$state', '$scope', '$mdDialog', '$window', 'getCustomers', 'Invoice', 'Customer', 'addFormsService'];

    function customersCtrl($rootScope, $state, $scope, $mdDialog, $window, getCustomers, Invoice, Customer, addFormsService) {

        var customers = this;

        customers.customers = getCustomers;

        customers.deleteCustomer = deleteCustomer;

        customers.showCustomerForm = addFormsService.showCustomerForm;

        customers.customerForm = customerForm;


        function customerForm(customer) {

            return customers.showCustomerForm(customer).then(function() {

                $state.reload();

            });
        }

        function deleteCustomer(customer_id, index) {

            Customer.delete({ id: customer_id }, function() {
                customers.customers.splice(index, 1);
            });

        };


    };

})();
