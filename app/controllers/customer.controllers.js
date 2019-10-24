const Customer = require('../models/customer.models.js');

// Create and Save a new Customer
exports.create = (req, res) => {
    // id: String,
    // name: String,
    // counter: Int16Array,
    // info: String,
    // Create a Customer
    const customer = new Customer({
        id: req.body.id || "",
        name: req.body.name || "",
        counter: req.body.counter || 0,
        info: req.body.info || ""
    });

    // Save Customer in the database
    customer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Customer."
        });
    });
};

// Retrieve and return all customers from the database.
exports.findAll = (req, res) => {
    Customer.find()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving customers."
        });
    });
};

exports.search = (req, res) => {
    var a = req.query;
    console.log(a);
    Customer.find(a).then((customer)=>{
        res.send(customer);
    }).catch((e)=>{
        return res.status(404).send({
            message: "NOTE FOUND"
        });
    })
}

// Find a single customer with a customerId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });            
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving customer with id " + req.params.customerId
        });
    });
};

// Update a customer identified by the customerId in the request
exports.update = (req, res) => {
// Validate Request

// Find customer and update it with the request body
Customer.findByIdAndUpdate(req.params.customerId, {
    id: req.body.id || "",
    name: req.body.name || "",
    counter: req.body.counter || 0,
    info: req.body.info || ""
    }, {new: true})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.customerId
        });
    });
};

// Delete a customer with the specified customerId in the request
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete customer with id " + req.params.customerId
        });
    });
};