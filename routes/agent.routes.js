module.exports = app => {
    const agent = require("../controller/agent.controller.js");
    const auth = require("../middleware/checkUserType");
    var router = require("express").Router();

    // Create a new user
    router.post("/create", agent.create);

    // // Retrieve all users
    router.get("/", agent.findAll);

    // // Retrieve a single user with id
    // router.get("/:id", user.findOne);

    // // Update a user with id
    // router.put("/:id",auth, user.update);

    // // Delete a user with id
    // router.delete("/:id",auth, user.delete);

    // // delete All user
    // router.delete("/",auth, user.deleteAll);

    app.use('/api/agent', router);
};