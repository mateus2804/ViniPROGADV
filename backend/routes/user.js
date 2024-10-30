var express = require('express'); 
var router = express.Router();

const User = require('../models/user');

router.post('/', async function (req, res, next) {
    const { email, password, firstName, lastName } = req.body;
    
    const userObject = new User({
        email,
        password,
        firstName,
        lastName
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

router.get('/:email', async function (req, res, next) {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({
                myErrorTitle: "User not found",
                myError: `No user found with email: ${req.params.email}`
            });
        }

        res.status(200).json({
            myMsgSucesso: "User found successfully",
            objUser: user
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Server-Side error: um erro aconteceu ao buscar o user",
            myError: err
        });
    }
});

module.exports = router;