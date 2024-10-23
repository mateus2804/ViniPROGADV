var express = require('express'); 
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/message', (req, res, next) => {
    res.render('node', {message: 'Ola'});
});

router.post('/message', (req, res, next) => {
    let messageVar = req.body.messageBody;
    res.redirect('/message/' + messageVar);
});

router.get('/message/:msgParam', (req, res, next) => {
    res.render('node', {message: req.params.msgParam});
});

var User = require('../models/user');
router.get('/node-mongodb-mongoose-user', (req, res, next) => {
    res.render('node');
})

router.post('/node-mongodb-mongoose-user', async (req, res, next) => {
    var emailVar = req.body.emailBody;

    var userObject = new User({
        firstName: 'Vinicius',
        lastName: 'Rosalen',
        password: "Segredo",
        email: emailVar
    });

    await userObject.save();

    res.redirect('/node-mongodb-mongoose-user');
});

router.get('/node-mongodb-mongoose-user-busca', async (req, res, next) => {
    try {
        const userFind = await User.findOne({});

        res.render('node', {firstNameV: userFind})
    }
    catch(err)
    {
        return res.send('ERROR')
    }
})


module.exports = router; 

 