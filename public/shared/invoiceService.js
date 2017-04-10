(function() {
    'use strict';
    angular.module('app.services', [])
        .factory('Invoice', invoice)
        .factory('Customer', customer)
        .factory('Product', product)
        .factory('InvoiceItems', invoiceItems);

    invoice.$inject = ['$resource', 'url'];

    customer.$inject = ['$resource', 'url'];

    product.$inject = ['$resource', 'url'];

    invoiceItems.$inject = ['$resource', 'url'];

    function invoice($resource, url) {
        return $resource(url.Base + '/api/invoices/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    };

    function customer($resource, url) {
        return $resource(url.Base + '/api/customers/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    };

    function product($resource, url) {
        return $resource(url.Base + '/api/products/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    };

    function invoiceItems($resource, url) {
        return $resource(url.Base + '/api/invoices/:invoice_id/items/:id', { invoice_id: '@invoice_id', id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    };

})();
