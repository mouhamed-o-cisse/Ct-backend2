const Sequelize = require('sequelize');
const db = require("../database/db")

module.exports = db.sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.STRING
        },
        pdesease: {
            type: Sequelize.STRING
        },
        allergy: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        antecedents_personnels: {
            type: Sequelize.STRING
        },
        antecedents_familiaux: {
            type: Sequelize.STRING
        },
        motif_de_consultation: {
            type: Sequelize.STRING
        },
        bilan: {
            type: Sequelize.STRING
        },
        diagnostic: {
            type: Sequelize.STRING
        },
        traitement_recu: {
            type: Sequelize.STRING
        },
        ordonnance: {
            type: Sequelize.STRING
        },
        evolution: {
            type: Sequelize.STRING
        },
        pro_rdv: {
            type: Sequelize.STRING
        },
        last_update: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
        // rendez_vous: {
        //     type: Sequelize.STRING
        // },
        // soins_particuliers: {
        //     type: Sequelize.STRING
        // }
    },
    {
        timestamps: false
    }
)