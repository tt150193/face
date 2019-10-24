module.exports = (app) => {
    const trans = require('../controllers/tran.controllers.js');

    // Create a new tran
    app.post('/trans', trans.create);

    // Retrieve all trans
    app.get('/trans', trans.findAll);

    // Retrieve a single tran with tranId
    app.get('/trans/:tranId', trans.findOne);

    // Update a tran with tranId
    app.put('/trans/:tranId', trans.update);

    // Delete a tran with tranId
    app.delete('/trans/:tranId', trans.delete);

    app.get('/search/trans', trans.search);

    app.get("/create/tran", function(req, res){
        res.render("tran/create")
    })

    app.get("/all/tran", function(req, res){
        res.render("tran/all")
    })

    app.get("/monitor/tran", function(req, res){
        res.render("tran/monitor")
    })

    app.get("/views/tran/:id", function(req, res){
        res.render("tran/show");
    });
}