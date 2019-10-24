module.exports = (app) => {
    const customers = require('../controllers/customer.controllers.js');

    // Create a new Note
    app.post('/customers', customers.create);

    // Retrieve all Notes
    app.get('/customers', customers.findAll);

    // Retrieve a single Note with customerId
    app.get('/customers/:customerId', customers.findOne);

    // Update a Note with customerId
    app.put('/customers/:customerId', customers.update);

    // Delete a Note with customerId
    app.delete('/customers/:customerId', customers.delete);

    app.get('/search/customers', customers.search)
}