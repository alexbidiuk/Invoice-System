(function() {
    'use strict';

    angular.module('app.addFormsService', [])
        .factory('addFormsService', addFormsService);

    addFormsService.$inject = ['$mdDialog', '$state', 'Product', 'Customer'];

    function addFormsService($mdDialog, $state, Product, Customer) {

        return {

            showCustomerForm: showCustomerForm,
            showProductForm: showProductForm
        }

        function showCustomerForm(customer) {

            return $mdDialog.show({
                controller: customerFormController,
                templateUrl: '/shared/views/addCustomerForm.html',
                parent: angular.element(document.body),
                locals: {
                    customer: customer
                },
                clickOutsideToClose: true
            })
        };

        function customerFormController($scope, $mdDialog, customer) {

            var currCust = customer;

            if (currCust) {

                $scope.newCustomer = currCust;
            }

            $scope.customerId = function(customer) {

                if (customer) {

                    $scope.newCustomer = customer;

                    return Promise.resolve($scope.newCustomer);

                } else {

                    return Customer.save({}, function(newCustomer) {

                        return newCustomer;

                    }).$promise;
                };
            };

            $scope.addCustomerObserver = function() {

                return $scope.customerId(currCust)

                .then(function(newCustomer) {

                    currCust = newCustomer;

                    $scope.newCustomer.id = newCustomer.id;

                    return Customer.update({

                        id: $scope.newCustomer.id,
                        name: $scope.newCustomer.name,
                        address: $scope.newCustomer.address,
                        phone: $scope.newCustomer.phone

                    }).$promise;
                });
            };

            $scope.addCustomer = function() {

                return $scope.addCustomerObserver().then(function(newCustomer) {
                    $mdDialog.hide(newCustomer);
                });
            };

            $scope.cancel = function() {

                $mdDialog.hide();
            };

        };

        function showProductForm(product) {

            return $mdDialog.show({
                controller: productFormController,
                templateUrl: '/shared/views/addProductForm.html',
                parent: angular.element(document.body),
                locals: {
                    product: product
                },
                clickOutsideToClose: true
            })
        };

        function productFormController($scope, $mdDialog, product) {

            var currProd = product;

            if (currProd) {

                $scope.newProduct = currProd;
            }

            $scope.productId = function(product) {

                if (product) {

                    $scope.newProduct = product;

                    return Promise.resolve($scope.newProduct);

                } else {

                    return Product.save({}, function(newProduct) {

                        return newProduct;

                    }).$promise;
                };
            };

            $scope.addProductObserver = function() {

                return $scope.productId(currProd)

                .then(function(newProduct) {

                    currProd = newProduct;

                    $scope.newProduct.id = newProduct.id;

                    return Product.update({

                        id: $scope.newProduct.id,
                        name: $scope.newProduct.name,
                        price: $scope.newProduct.price

                    }).$promise;
                });
            };

            $scope.addProduct = function() {

                $scope.addProductObserver().then(function(newProduct) {

                    $mdDialog.hide(newProduct);

                });
            };

            $scope.cancel = function() {

                $mdDialog.hide();
            };
        };
    }

})();
