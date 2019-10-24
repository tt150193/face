const Fin = require('../models/fin.models.js');
var counter = "fin";
const Counter = require('../models/counter.models.js');

// Create and Save a new Note
exports.create = (req, res) => {
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
            console.log(b);
        })
        
        const fin = new Fin({
            code: req.body.code || "",
            name: req.body.name || "",
            define: req.body.define || "",
            note: req.body.note || "",
            add: req.body.add || [],
            sub: req.body.sub || []
        });
    
        // Save Note in the database
        fin.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
    })
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Fin.find()
    .then(fins => {
        res.send(fins);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.search = (req, res) => {
    var a = req.query;
    console.log(a);
    Fin.find(a).then((fin)=>{
        res.send(fin);
    }).catch((e)=>{
        return res.status(404).send({
            message: "NOTE FOUND"
        });
    })
}

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Fin.findById(req.params.finId)
    .then(fin => {
        if(!fin) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.finId
            });            
        }
        res.send(fin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.finId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.finId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
// Validate Request
console.log("Hello World", req.body)
// Find note and update it with the request body
    Fin.findByIdAndUpdate(req.params.finId, {
        code: req.body.code || "",
        name: req.body.name || "",
        define: req.body.define || "",
        note: req.body.note || "",
        add: req.body.add || [],
        sub: req.body.sub || []        
        }, {new: true})
        .then(fin => {
            if(!fin) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.finId
                });
            }
            res.send(fin);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.finId
                });                
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.finId
            });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Fin.findByIdAndRemove(req.params.finId)
    .then(fin => {
        if(!fin) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.finId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.finId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.finId
        });
    });
};