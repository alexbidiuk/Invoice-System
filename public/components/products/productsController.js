(function() {
    'use strict';

    angular.module('app.products', [])
        .controller('productsController', productsCtrl);


    productsCtrl.$inject = ['$rootScope', '$state', '$scope', '$window', 'getProducts', 'Product', 'addFormsService'];

    function productsCtrl($rootScope, $state, $scope, $window, getProducts, Product, addFormsService) {

        var products = this;

        products.products = getProducts;

        products.deleteProduct = deleteProduct;

        products.showProductForm = addFormsService.showProductForm;

        products.productForm = productForm;



        function productForm(product) {

            return products.showProductForm(product).then(function() {

                $state.reload();

            });
        };

        function deleteProduct(product_id, index) {

            Product.delete({ id: product_id }, function() {
                products.products.splice(index, 1);
            });

        };


    };

})();
