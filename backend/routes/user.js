var express = require('express'); 
var router = express.Router();

const User = require('../models/user');

router.post('/', async function (req, res, next) {
    const userObject = new User({
        content: req.body.content
    })
    try {
        const userSave = await userObject.save();
        console.log(userSave)

        res.status(201).json({
            myMsgSucesso: "User salva com sucesso",
            objUserSave: userObject
        })
    }
    catch(err)
    {
        return res.status(500).json({
            myErrorTitle : "Server-Side error: um erro aconteceu ao salvar o user",
            myError: err
        })
    }
});

module.exports = router;