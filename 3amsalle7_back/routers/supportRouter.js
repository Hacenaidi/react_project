const express = require('express');
const route = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const today = new Date();
const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const privatekey = "this is may privat key 123789";

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, privatekey);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

route.post('/register', (req, res, next) => {
    db.Support.count({ where: { email: req.body.email } }).then(doc => {
        if (doc != 0) {
            res.status(400).send("This email is used !!");
        } else {
            bcrypt.hash(req.body.password, 10).then(hpass => {
                db.Support.create({
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    cin: req.body.cin,
                    numTel: req.body.numTel,
                    email: req.body.email,
                    password: hpass
                }).then((response) => res.status(200).send(response))
                    .catch((err) => res.status(400).send(err));
            });
        }
    });
});

route.post('/login', (req, res, next) => {
    db.Support.findOne({ where: { email: req.body.email } }).then(support => {
        if (!support) {
            res.status(400).json({ message: 'invalid email or password !!' });
        } else {
            bcrypt.compare(req.body.password, support.password).then(same => {
                if (same) {
                    let token = jwt.sign({ id: support.id, username: support.nom }, privatekey, {
                        expiresIn: "24h"
                    });
                    res.status(200).json({ token: token ,support_id : support.id});
                } else {
                    res.status(400).json({ message: 'invalid email or password !!' });
                }
            });
        }
    });
});

route.get('/support/:id', verifyToken, (req, res, next) => {
    db.Support.findOne({ where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.get('/supports', verifyToken, (req, res, next) => {
    db.Support.findAll()
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.patch('/support/:id', verifyToken, (req, res, next) => {
    db.Support.update({
        nom: req.body.nom,
        prenom: req.body.prenom,
        cin: req.body.cin,
        numTel: req.body.numTel,
        email: req.body.email,
        password: req.body.password
    }, { where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.delete('/support/:id', verifyToken, (req, res, next) => {
    db.Support.destroy({ where: { id: req.params.id } })
        .then((response) => res.status(200).send("deleted !!"))
        .catch((err) => res.status(400).send(err));
});

route.get('/supportdonnne', verifyToken, (req, res, next) => {
    db.Ticket.findAll({
        attributes: [
            [db.sequelize.literal('Support.nom'), 'nom'],
            [db.sequelize.literal('Support.prenom'), 'prenom'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'total_tickets']
        ],
        include: [{
            model: db.Support,
            attributes: [],
            where: {
                createdAt: {
                    [Op.gte]: startOfDay
                }
            }
        }],
        group: ['Support.nom', 'Support.prenom']
    })
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération des données:', err);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des données' });
        });
});

route.get('/supportwork', verifyToken, (req, res, next) => {
   
    db.Support.findAll({
        attributes: ['id', 'nom', 'prenom', [db.sequelize.fn('COUNT', db.sequelize.col('Tickets.id')), 'nombre_tickets']],
        include: [{
            model: db.Ticket,
            attributes: [],
            where: {
                createdAt: {
                    [db.Sequelize.Op.gte]: startOfDay // Filtrer les tickets à partir du début de la journée
                }
            },
            required: false // Utiliser une jointure externe
        }],
        group: ['Support.id', 'Support.nom', 'Support.prenom']
    })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

module.exports = route;