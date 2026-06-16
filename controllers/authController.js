const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hash
        });

        await user.save();

        res.redirect("/login");

    } catch (err) {

        console.log(err);

        res.send("Erro ao registrar usuário");

    }

};

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("Usuário não encontrado");
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.send("Senha incorreta");
        }

        req.session.userId = user._id;

        res.redirect("/dashboard");

    } catch (err) {

        console.log(err);

        res.send("Erro ao fazer login");

    }

};

exports.logout = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });

};