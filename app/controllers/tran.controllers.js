const Tran = require('../models/tran.models.js');
var counter = "fin";
const Counter = require('../models/counter.models.js');

// Create and Save a new tran
exports.create = (req, res) => {
    // Validate request
    // Create a Note
    Counter.find({name: counter}).then((co)=>{
        let temp_count;
        console.log("Coount", co)
        if(co.length == 0){
            
            let t_count = new Counter({name: counter, counter: 0});
            t_count.save().then(data => {
                console.log(data);
            }).catch((e)=>{
                console.log(e);
            })
            temp_count = {name: counter, counter: "0"};
        } else {
            temp_count = co[0];
        }
        temp_count.counter = (parseInt(temp_count.counter) + 1).toString();
        console.log("COUNT: ", temp_count);
        Counter.findByIdAndUpdate(temp_count._id, {name: temp_count.name, counter: temp_count.counter}, {new: true}).then((a)=>{
            console.log("A", a);
        }).catch((e)=>{
            console.log(e);
        })
        const tran = new Tran({
            money: req.body.money || "",
            parent: req.body.parent || "",
            info: req.body.info || "",
            code: req.body.code || "", 
            date: req.body.date || (new Date()).toUTCString(),
            id: temp_count.counter,
            source: req.body.source || "",
            source_id: req.body.source_id || "",
            source_url: req.body.source_url || ""
        });
        console.log(req.body);
        // Save tran in the database
        tran.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the tran."
            });
        });
    });
};

// Retrieve and return all trans from the database.
exports.findAll = (req, res) => {
    Tran.find()
    .then(trans => {
        res.send(trans);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving trans."
        });
    });
};

exports.search = (req, res) => {
    var a = req.query;
    console.log(a);
    Tran.find(a).then((tran)=>{
        res.send(tran);
    }).catch((e)=>{
        return res.status(404).send({
            message: "tran FOUND"
        });
    })
}

// Find a single tran with a tranId
exports.findOne = (req, res) => {
    Tran.findById(req.params.tranId)
    .then(tran => {
        if(!tran) {
            return res.status(404).send({
                message: "tran not found with id " + req.params.tranId
            });            
        }
        res.send(tran);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "tran not found with id " + req.params.tranId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving tran with id " + req.params.tranId
        });
    });
};

// Update a tran identified by the tranId in the request
exports.update = (req, res) => {

// Find tran and update it with the request body
Tran.findByIdAndUpdate(req.params.tranId, {
    money: req.body.money || "",
    parent: req.body.parent || "",
    // add: req.body.add || "",
    // sub: req.body.sub || "",
    info: req.body.info || "",
    code: req.body.code || "",
    date: req.body.date || (new Date()).toUTCString()
    }, {new: true})
    .then(tran => {
        if(!tran) {
            return res.status(404).send({
                message: "tran not found with id " + req.params.tranId
            });
        }
        res.send(tran);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "tran not found with id " + req.params.tranId
            });                
        }
        return res.status(500).send({
            message: "Error updating tran with id " + req.params.tranId
        });
    });
};

// Delete a tran with the specified tranId in the request
exports.delete = (req, res) => {
    Tran.findByIdAndRemove(req.params.tranId)
    .then(tran => {
        if(!tran) {
            return res.status(404).send({
                message: "tran not found with id " + req.params.tranId
            });
        }
        res.send({message: "tran deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "tran not found with id " + req.params.tranId
            });                
        }
        return res.status(500).send({
            message: "Could not delete tran with id " + req.params.tranId
        });
    });
    
};