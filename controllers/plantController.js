const Plant = require("../models/Plant");
const axios = require("axios");

exports.createPlant = async (req, res) => {

    try {

        const {
            apelido,
            especie,
            descricao,
            dataPlantio,
            ultimaRega
        } = req.body;

        const plant = new Plant({
            apelido,
            especie,
            descricao,
            dataPlantio,
            ultimaRega,
            userId: req.session.userId
        });

        await plant.save();

        res.redirect("/dashboard");

    } catch (err) {

        console.log(err);

        res.send("Erro ao criar planta");

    }

};

exports.dashboard = async (req, res) => {

    try {

        const plants = await Plant.find({
            userId: req.session.userId
        });

        res.render("dashboard", {
            plants
        });

    } catch (err) {

        console.log(err);

        res.send("Erro ao carregar dashboard");

    }

};

exports.showPlant = async (req, res) => {

    try {

        const plant = await Plant.findOne({
            _id: req.params.id,
            userId: req.session.userId
        });

        if (!plant) {
            return res.send("Planta não encontrada");
        }

        res.render("plant", {
            plant
        });

    } catch (err) {

        console.log(err);

        res.send("Erro ao abrir planta");

    }

};

exports.deletePlant = async (req, res) => {

    try {

        const plant = await Plant.findOne({
            _id: req.params.id,
            userId: req.session.userId
        });

        if (!plant) {
            return res.send("Planta não encontrada");
        }

        await Plant.findByIdAndDelete(
            req.params.id
        );

        res.redirect("/dashboard");

    } catch (err) {

        console.log(err);

        res.send("Erro ao excluir");

    }

};

exports.editPlantPage = async (req, res) => {

    try {

        const plant = await Plant.findOne({
            _id: req.params.id,
            userId: req.session.userId
        });

        if (!plant) {
            return res.send("Planta não encontrada");
        }

        res.render("editPlant", {
            plant
        });

    } catch (err) {

        console.log(err);

        res.send("Erro ao abrir edição");

    }

};

exports.updatePlant = async (req, res) => {

    try {

        const plant = await Plant.findOne({
            _id: req.params.id,
            userId: req.session.userId
        });

        if (!plant) {
            return res.send("Planta não encontrada");
        }

        const {
            apelido,
            especie,
            descricao,
            dataPlantio,
            ultimaRega
        } = req.body;

        await Plant.findByIdAndUpdate(
            req.params.id,
            {
                apelido,
                especie,
                descricao,
                dataPlantio,
                ultimaRega
            }
        );

        res.redirect("/plants/" + req.params.id);

    } catch (err) {

        console.log(err);

        res.send("Erro ao atualizar");

    }

};

exports.searchPlant = async (req, res) => {

    try {

        const nome = req.query.nome;

        const response = await axios.get(
            "https://perenual.com/api/species-list",
            {
                params: {
                    key: process.env.PERENUAL_API_KEY,
                    q: nome
                }
            }
        );

        const resultado = response.data.data[0];

        res.render("searchPlant", {
            result: resultado
        });

    } catch (err) {

        console.log(err);

        res.send("Erro ao consultar API");

    }

};