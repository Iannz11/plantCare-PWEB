const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const plantController = require("../controllers/plantController");

router.get("/", (req, res) => {
    res.redirect("/login");
});

router.get(
    "/dashboard",
    auth,
    plantController.dashboard
);

// TELA DE BUSCA DA API
router.get(
    "/plants/search",
    auth,
    (req, res) => {
        res.render("searchPlant", {
            result: null
        });
    }
);

// CONSULTA À API
router.get(
    "/api/planta",
    auth,
    plantController.searchPlant
);

// NOVA PLANTA
router.get(
    "/plants/new",
    auth,
    (req, res) => {
        res.render("addPlant");
    }
);

router.post(
    "/plants/new",
    auth,
    plantController.createPlant
);

// EDITAR
router.get(
    "/plants/edit/:id",
    auth,
    plantController.editPlantPage
);

router.post(
    "/plants/edit/:id",
    auth,
    plantController.updatePlant
);

// EXCLUIR
router.get(
    "/plants/delete/:id",
    auth,
    plantController.deletePlant
);

// DETALHES DA PLANTA
// DEVE FICAR POR ÚLTIMO
router.get(
    "/plants/:id",
    auth,
    plantController.showPlant
);

module.exports = router;