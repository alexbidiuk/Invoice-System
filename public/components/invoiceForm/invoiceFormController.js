(function() {
    'use strict';

    angular.module('app.invoiceForm', [])
        .controller('invoiceFormController', addCtrl);


    addCtrl.$inject = ['$window', '$state', '$scope', '$q', '$mdDialog', '$stateParams', 'Invoice', 'Customer', 'Product', 'InvoiceItems', 'getInvoice', 'calculateservices', 'addFormsService'];

    function addCtrl($window, $state, $scope, $q, $mdDialog, $stateParams, Invoice, Customer, Product, InvoiceItems, getInvoice, calculateservices, addFormsService) {

        // var windowElement = angular.element($window);

        var invoiceForm = this;

        invoiceForm.invoiceId = invoiceId;

        invoiceForm.getCustomerNames = getCustomerNames;

        invoiceForm.getProductNames = getProductNames;

        invoiceForm.showCustomerAddForm = addFormsService.showCustomerAddForm;

        invoiceForm.showProductAddForm = addFormsService.showProductAddForm;

        invoiceForm.customerAddForm = customerAddForm;

        invoiceForm.productAddForm = productAddForm;

        invoiceForm.addInvoiceItem = addInvoiceItem;

        invoiceForm.deleteinvoiceItem = deleteinvoiceItem;

        invoiceForm.invoiceItemTotal = calculateservices.invoiceItemTotal;

        invoiceForm.invoiceSubTotal = calculateservices.invoiceSubTotal;

        invoiceForm.calculateDiscount = calculateservices.calculateDiscount;

        invoiceForm.invoiceGrandTotal = calculateservices.invoiceGrandTotal;

        invoiceForm.saveForm = saveForm;

        invoiceForm.saveObserver = saveObserver;

        invoiceForm.saveInvoice = saveInvoice;

        invoiceForm.invoice = getInvoice;

        invoiceForm.invoice.invoiceItems = getInvoice.invoiceItems;


        if (typeof getInvoice.customer != 'undefined') {

            invoiceForm.invoice.selectedCustomer = getInvoice.customer;

        };


        /////////////////////////////////////////////////

        function invoiceId() {

            if (invoiceForm.invoice.id) {

                return Promise.resolve(invoiceForm.invoice);

            } else {

                return Invoice.save({}, function(invoice) {

                    invoiceForm.invoice.id = invoice.id;

                    return invoice;

                }).$promise;
            };

        };


        function productAddForm(index) {

            return invoiceForm.showProductAddForm().then(function(newProduct) {

                invoiceForm.invoice.invoiceItems[index].selectedProduct = newProduct;

            });
        };

        function customerAddForm() {

            return invoiceForm.showCustomerAddForm().then(function(newCustomer) {

                invoiceForm.invoice.selectedCustomer = newCustomer;

            });
        };




        //async request for product names 

        function getCustomerNames(searchText) {

            if (!searchText) return Customer.query().$promise.then(function(data) {

                return data;
            })

            return Customer.query().$promise.then(function(data) {

                var results = [];

                results = data.filter(function(customer) {

                    return (customer.name.toUpperCase().indexOf(searchText.toUpperCase()) !== -1);
                });


                return results;

            });

        };

        // async request for product names

        function getProductNames(searchText) {

            if (!searchText) return Product.query().$promise.then(function(data) {

                return data;
            })

            return Product.query().$promise.then(function(data) {

                var results = [];

                results = data.filter(function(product) {

                    return (product.name.toUpperCase().indexOf(searchText.toUpperCase()) !== -1);
                });


                return results;

            });

        };

        function addInvoiceItem() {

            if (invoiceForm.invoice.selectedCustomer) {

                InvoiceItems.save({

                    invoice_id: invoiceForm.invoice.id,
                    quantity: 1

                }, function(data) {

                    invoiceForm.invoice.invoiceItems.push(data)

                })

            } else {

                alert('Firstly add customer!');
            }
        };

        function deleteinvoiceItem(invoiceItem_id, index) {

                InvoiceItems.delete({

                    invoice_id: invoice.id,
                    id: invoiceItem_id

                }, function() {
                    invoiceForm.invoice.invoiceItems.splice(index, 1);
                })
        };

        // function that executes by autosaving 

        function saveObserver() {

            var promiseArr = [];

            invoiceForm.invoiceId().then(function(invoice) {

                angular.forEach(invoiceForm.invoice.invoiceItems, function(value, key) {

                    var anHttpPromise = InvoiceItems.update({
                        id: value.id,
                        invoice_id: invoice.id,
                        product_id: value.selectedProduct.id,
                        quantity: value.quantity
                    });

                    promiseArr.push(anHttpPromise);
                });

                $q.all(promiseArr).then(function() {

                    invoiceForm.saveInvoice();
                })
            });
        };

        // manual saving

        function saveForm() {

            invoiceForm.saveObserver();

            $state.go('home');

        };

        //updating invoice

        function saveInvoice() {

            invoiceForm.invoiceId().then(function(invoice) {

                Invoice.update({

                    id: invoice.id,
                    customer_id: invoiceForm.invoice.selectedCustomer.id,
                    discount: invoiceForm.invoice.discount,
                    total: invoiceForm.invoiceGrandTotal(invoiceForm.invoice.total, invoiceForm.invoice.discount, invoiceForm.invoice.invoiceItems)

                });

            })

        };

        //if customer not selected - delete invoice

        // $scope.$on('$destroy', function() {

        //     if (invoiceForm.invoice.selectedCustomer == null) {

        //         Invoice.delete({
        //             id: invoiceForm.invoice.id
        //         }, function() {
        //             $state.reload()
        //         });
        //     }
        // });

        // on refreshing: if customer not selected - delete invoice

        // windowElement.on('beforeunload', function(event) {

        //     if (invoiceForm.selectedCustomer == null) {

        //         Invoice.delete({
        //             id: invoiceForm.invoice.id
        //         }, function() {
        //             $state.reload()
        //         });
        //     }

        // });
    };

})();
