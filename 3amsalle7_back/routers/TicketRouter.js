const express = require('express');
const route = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const today = new Date();
const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const dateDebutSemaineDerniere = new Date();
dateDebutSemaineDerniere.setDate(dateDebutSemaineDerniere.getDate() - 7);
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

route.post('/createticket', verifyToken, (req, res, next) => {
    db.Ticket.create({
        nomClient: req.body.nomClient,
        prenomClient: req.body.prenomClient,
        numTelClient: req.body.numTelClient,
        adresse: req.body.adresse,
        zone: req.body.zone,
        montant: req.body.montant,
        secteur: req.body.secteur,
        description: req.body.description,
        etat: "En cours",
        SupportId: req.body.SupportId,
        TechnicienId: req.body.TechnicienId
    }).then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.get('/ticket/:id', verifyToken, (req, res, next) => {
    db.Ticket.findOne({ where: { id: req.params.id }, include: [db.Technicien] })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.get('/nomTech/:id', verifyToken, (req, res, next) => {
    db.Ticket.findOne({ where: { id: req.params.id }, include: [db.Technicien] })
        .then((response) => res.status(200).send(response.Technicien.nom + " " + response.Technicien.prenom))
        .catch((err) => res.status(400).send(err));
});

route.get('/tickets', verifyToken, (req, res, next) => {
    db.Ticket.findAll()
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.get('/ticketsAnAC', verifyToken, (req, res, next) => {
    db.Ticket.findAll({
        where: {
            [Op.or]: [
                { etat: "Annulé" },
                { etat: "Accomplie" }
            ]
        }, include: [db.Technicien]
    })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.get('/ticketsEnCours', verifyToken, (req, res, next) => {
    db.Ticket.findAll({ where: { etat: "En cours" }, include: [db.Technicien] })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});


route.patch('/ticket/:id', verifyToken, (req, res, next) => {
    db.Ticket.update({
        nomClient: req.body.nomClient,
        prenomClient: req.body.prenomClient,
        numTelClient: req.body.numTelClient,
        adresse: req.body.adresse,
        zone: req.body.zone,
        montant: req.body.montant,
        secteur: req.body.secteur,
        description: req.body.description,
        etat: "En cours",
        SupportId: req.body.SupportId,
        TechnicienId: req.body.TechnicienId,
    }, { where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.delete('/ticket/:id', verifyToken, (req, res, next) => {
    db.Ticket.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).send('deleted !'))
        .catch((err) => res.status(400).send(err));
});


route.get('/nbrticketDat/:id', verifyToken, (req, res, next) => {
    db.Ticket.count({
        where: {
            createdAt: {
                [Op.gte]: startOfDay
            },
            SupportId: req.params.id
        }
    }).then((nombreTick) => {
        res.status(200).json({ "nombreTicket": nombreTick });
    }).catch((erreur) => {
        console.error("Erreur lors du comptage des produits :", erreur);
        res.status(500).json({ "erreur": "Une erreur s'est produite lors du comptage des produits." });
    });
});

route.get('/nbrticketEnCours', verifyToken, (req, res, next) => {
    db.Ticket.count({
        where: { etat: "En cours" }
    }).then((nombreTick) => {
        res.status(200).json({ "nombreTicket": nombreTick });
    }).catch((erreur) => {
        console.error("Erreur lors du comptage des produits :", erreur);
        res.status(500).json({ "erreur": "Une erreur s'est produite lors du comptage des produits." });
    });
});

route.patch('/confirmer/:id', verifyToken, (req, res, next) => {
    db.Ticket.update({
        etat: "Accomplie",
    }, { where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.patch('/annuler/:id', verifyToken, (req, res, next) => {
    db.Ticket.update({
        etat: "Annulé",
    }, { where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.post('/creatObj', verifyToken, (req, res, next) => {
    db.Object.create({
        objectif: req.body.objectif,
    }).then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err));
});

route.get('/obj', verifyToken, (req, res, next) => {
    db.Object.findAll()
        .then((response) => res.status(200).send(response[0]))
        .catch((err) => res.status(400).send(err));
});

route.get('/nbrTickSem/:id', verifyToken, (req, res, next) => {
    db.Ticket.count({
        where: {
            createdAt: {
                [Op.gte]: dateDebutSemaineDerniere,
                [Op.lt]: new Date()
            },
            SupportId: req.params.id
        }
    }).then((nombre_tickets_semaine_derniere) => {
        console.log("Nombre de tickets de la semaine dernière:", nombre_tickets_semaine_derniere);
        res.json({ nombre_tickets_semaine_derniere });
    }).catch((err) => {
        console.error("Erreur lors de la récupération du nombre de tickets de la semaine dernière:", err);
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération du nombre de tickets de la semaine dernière." });
    });
});

module.exports = route;