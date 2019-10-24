module.exports = (app) => {
    const outs = require('../controllers/out.controllers.js');

    // Create a new out
    app.post('/outs', outs.create);

    // Retrieve all outs
    app.post('/outs_all', outs.findAll);

    // Retrieve a single out with outId
    app.post('/outs_one/:outId', outs.findOne);

    // Update a out with outId
    app.put('/outs/:outId', outs.update);

    // Delete a out with outId
    app.post('/outs_delete/:outId', outs.delete);
}