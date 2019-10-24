module.exports = (app) => {
    const fins = require('../controllers/fin.controllers.js');

    // Create a new fin
    app.post('/fins', fins.create);

    // Retrieve all fins
    app.get('/fins', fins.findAll);

    // Retrieve a single fin with finId
    app.get('/fins/:finId', fins.findOne);

    // Update a fin with finId
    app.put('/fins/:finId', fins.update);

    // Delete a fin with finId
    app.delete('/fins/:finId', fins.delete);

    app.get('/search/fins', fins.search)

    app.get("/create/fin", function(req, res){
        res.render("fin/create")
    })
    app.get("/all/fin", function(req, res){
        res.render("fin/all")
    })

    app.get("/report", function(req, res){
        res.render("fin/report");
    })
    app.get("/views/fin/:id", function(req, res){
        res.render("fin/show");
    });
}