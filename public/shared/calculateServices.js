(function() {
    'use strict';

    angular.module('app.calculateServices', [])
        .factory('calculateservices', calculateservices);

    function calculateservices() {
        return {
            invoiceItemTotal: invoiceItemTotal,
            invoiceSubTotal: invoiceSubTotal,
            calculateDiscount: calculateDiscount,
            invoiceGrandTotal: invoiceGrandTotal

        };

        function invoiceItemTotal(quantity, price) {

            var total = 0.00;


            total = quantity * price;


            return parseFloat(total.toFixed(2))

        };

        function invoiceSubTotal(invoiceItems) {

            var total = 0.00;

            angular.forEach(invoiceItems, function(value, key) {

                total += (value.selectedProduct.price * value.quantity);
            });

            return total.toFixed(2);
        };

        function calculateDiscount(invoiceDiscount, invoiceItems) {

            return ((invoiceDiscount * invoiceSubTotal(invoiceItems)) / 100).toFixed(2);
        };

        function invoiceGrandTotal(invoiceTotal, invoiceDiscount, invoiceItems) {

            var grandTotal = invoiceTotal;

            if (isNaN(calculateDiscount(invoiceDiscount, invoiceItems))) {
                return grandTotal.toFixed(2);
            }

            grandTotal = (invoiceSubTotal(invoiceItems) - calculateDiscount(invoiceDiscount, invoiceItems));

            return grandTotal.toFixed(2);

        };

    }

})();
