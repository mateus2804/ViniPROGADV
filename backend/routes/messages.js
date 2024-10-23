var express = require('express'); 
var router = express.Router();

const Message = require('../models/message');

router.post('/', async function (req, res, next) {
    const messageObject = new Message({
        content: req.body.content
    })
    try {
        const messageSave = await messageObject.save();
        console.log(messageSave)

        res.status(201).json({
            myMsgSucesso: "Messagem salva com sucesso",
            objMessageSave: messageSave
        })
    }
    catch(err)
    {
        return res.status(500).json({
            myErrorTitle : "Server-Side error: um erro aconteceu ao salvar a mensagem",
            myError: err
        })
    }
});

router.get('/', async function (req, res, next) {

    try {
        const messageFindTodos = await Message.find({});

        res.status(201).json({
            myMsgSucesso: "Messagem recuperada com sucesso",
            objMessageSRecuperadoS: messageFindTodos
        })
    }
    catch(err)
    {
        return res.status(500).json({
            myErrorTitle : "Server-Side error: um erro aconteceu ao recuperar a mensagem",
            myError: err
        })
    }
});

router.delete('/message/:id', async (req, res, next) => {
    try {
        const messageId = req.params.id;

        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Mensagem não encontrada' });
        }

        await Message.findByIdAndDelete(messageId);

        res.status(200).json({ message: 'Mensagem deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar a mensagem' });
    }
});

module.exports = router;