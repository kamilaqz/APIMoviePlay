const Content = require('../models/contentModel')

module.exports= {
    createContent: async (req, res) => { 
        try {
            const contentExists = await Content.findOne({ title: req.body.title });

            if (contentExists) {
                return res.status(409).json({ message: 'Este título já está em uso.' });
            } else {
                const result = await Content.create(req.body)
                res.status(201).json({message: `Título cadastrado com sucesso!`})
            }
        } catch (err) {
            res.status(500).json({message: `Não foi possível cadastrar.`})
        }
    },
    getContents: (req, res) => {
        Content.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result)
        }).catch(() => {
            res.status(500).json({message: "Não foi possível encontrar os títulos."})
        })
    },
    getcontentByTitle: async (req, res) => {
        try {
            const result = await Content.findOne({title: req.body.title})
            res.status(200).send(result)
        } catch (err) {
            res.status(500).json({message: "Não foi possível encontrar o título."})
        }
    },
    deletecontentByTitle: async (req, res) => {
        try {
            const result = await Content.deleteOne({title: req.params.title})
            res.status(200).send({message: "Titulo removido!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível remover o titulo."})
        }
    },
    updatecontent: async (req, res) => {
        try {
            const result = await Content.updateOne({title: req.body.title}, req.body)
            res.status(200).send({message: 'Dados atualizados com sucesso!'})
        } catch (err) {
            res.status(500).json({message: 'Não foi possível atualizar os dados.'})
        }
    }
}