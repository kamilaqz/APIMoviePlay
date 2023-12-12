const User = require('../models/userModel')
const Content = require('../models/contentModel')
require('dotenv').config();
require('../config/database');
const jwt = require('jsonwebtoken')

module.exports= {
    createUser: async (req, res) => {
        try {
            const userExists = await User.findOne({ email: req.body.email });

            if (userExists) {
                return res.status(409).json({ message: 'Este email já está em uso.' });
            } else {
                const result = await User.create(req.body)
                res.status(201).json({message: `Usuário cadastrado com sucesso!`})
            }
        } catch (err) {
            res.status(500).json({message: `Não foi possível cadastrar o usuário.`})
        }
    },

    getUsers: (req, res) => {
        User.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result)
        }).catch(() => {
            res.status(500).json({message: "Não foi possível encontrar os usuários."})
        })
    },
    getUserByEmail: async (req, res) => {
        try {
            const result = await User.findOne({email: req.body.email})
            res.status(200).send(result)
        } catch (err) {
            res.status(500).json({message: "Não foi possível encontrar o usuário."})
        }
    },
    deleteUserByEmail: async (req, res) => {
        try {
            const result = await User.deleteOne({email: req.params.email})
            res.status(200).send({message: "Usuário removido!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível remover."})
        }
    },
    updateUser: async (req, res) => {
        try {
            const result = await User.updateOne({email: req.body.email}, req.body)
            res.status(200).send({message: 'Dados atualizados com sucesso!'})
        } catch (err) {
            res.status(500).json({message: 'Não foi possível atualizar os dados.'})
        }
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                res.status(401).send({message: 'O email informado não existe.'});
            } else {
                user.isCorrectPassword(password, function(err, same) {
                    if (!same) {
                        res.status(401).json({ message: 'Senha incorreta. Tente novamente' });
                    } else {
                        const secret = '7as8s8as4a5s4a5sa65'
                        const token = jwt.sign({ email }, secret, { expiresIn: '30d' });
                        res.status(200).json({ message: `Usuário logado! Bem vindo(a), ${user.email}`, token: token });
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao processar sua solicitação. Tente novamente.' });
        }
    },   
} 
