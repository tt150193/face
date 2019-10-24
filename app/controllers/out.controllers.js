const request = require("request");

// Create and Save a new Note
exports.create = (req, res) => {
    console.log(req.body);
    request.post({url: req.body.url, form: req.body.data}, function(e, r, b){
        if(e){
            res.send({
                status: 303,
                data: b
            })
        } else {
            res.send({
                status: 300,
                data: b
            });
        }
    })    
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    /* GET */
    //URL_FULL
    console.log(req.body);
    request.get(req.body.url, function(e, r, b){
        if(e){
            res.send({
                status: 303,
                data: b
            })
        } else {
            res.send({
                status: 300,
                data: b
            });
        }
    })
};


// Find a single note with a noteId
exports.findOne = (req, res) => {
    console.log(req.params);
    console.log(req.body)
    request.get(req.body.url + "/" + req.params.outId, function(e, r, b){
        if(e){
            res.send({
                status: 303,
                data: b
            })
        } else {
            res.send({
                status: 300,
                data: b
            });
        }
    })    
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    console.log(req.body);
    request.post({url: req.body.url, form: req.body.data}, function(e, r, b){
        if(e){
            res.send({
                status: 303,
                data: b
            })
        } else {
            res.send({
                status: 300,
                data: b
            });
        }
    })
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    console.log(req.params);
    console.log(req.body.url + "/" + req.params.outId)
    request.delete(req.body.url + "/" + req.params.outId, function(e, r, b){
        if(e){
            res.send({
                status: 303,
                data: b
            })
        } else {
            res.send({
                status: 300,
                data: b
            });
        }
    })    
};