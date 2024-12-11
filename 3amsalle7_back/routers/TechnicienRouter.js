const express = require('express');
const route = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
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

route.post('/addTech', verifyToken, (req, res, next) => {
    db.Technicien.count({ where: { cin: req.body.cin } }).then(doc => {
        if (doc != 0) {
            res.status(400).send("this cin is used !!");
        } else {
            db.Technicien.create({
                nom: req.body.nom,
                prenom: req.body.prenom,
                cin: req.body.cin,
                numTel: req.body.numTel,
                email: req.body.email,
                zone: req.body.zone,
                secteur: req.body.secteur
            }).then((response) => res.status(200).send(response))
                .catch((err) => res.status(400).send(err));
        }
    });
});

route.get('/technicien/:id', verifyToken, (req, res, next) => {
    db.Technicien.findOne({ where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.get('/techniciens', verifyToken, (req, res, next) => {
    db.Technicien.findAll()
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.patch('/technicien/:id', verifyToken, (req, res, next) => {
    db.Technicien.update({
        nom: req.body.nom,
        prenom: req.body.prenom,
        cin: req.body.cin,
        numTel: req.body.numTel,
        email: req.body.email,
        zone: req.body.zone,
        secteur: req.body.secteur
    }, { where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.delete('/technicien/:id', verifyToken, (req, res, next) => {
    db.Technicien.destroy({ where: { id: req.params.id } })
        .then((response) => res.status(200).send("deleted !!"))
        .catch((err) => res.status(400).send(err));
});

route.get('/filtrTech/:secteur', verifyToken, (req, res, next) => {
    db.Technicien.findAll({ where: { secteur: req.params.secteur } })
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(400).json(err));
});

route.get('/secteurs', verifyToken, (req, res, next) => {
    db.Secteur.findAll()
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(400).json(err));
});

module.exports = route;