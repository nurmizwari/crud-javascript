const { Art } = require("../models");
const { Op } = require("sequelize");

class Controller {
  static home(req, res) {
    let { searchName, searchArtist } = req.query;
    if (searchName) {
      let result;
      Art.findAll({ where: { name: { [Op.iLike]: `%${searchName}%` } } })
        .then((data) => {
          result = data;
          return Art.alert();
        })
        .then((count) => {
          //   console.log(count[0].dataValues.max.toISOString().split("-")[0]);
          //   console.log(count[0].dataValues.count);
          res.render("home", {
            result: result,
            count: count[0].dataValues.count,
            max: count[0].dataValues.max.toISOString().split("-")[0],
            min: count[0].dataValues.min.toISOString().split("-")[0],
          });
        })
        .catch((err) => {
          res.send(err);
        });
    }
    if (searchArtist) {
      let result;
      Art.findAll({ where: { artist: { [Op.iLike]: `%${searchArtist}%` } } })
        .then((data) => {
          result = data;
          return Art.alert();
        })
        .then((count) => {
          //   console.log(count[0].dataValues.max.toISOString().split("-")[0]);
          //   console.log(count[0].dataValues.count);
          res.render("home", {
            result: result,
            count: count[0].dataValues.count,
            max: count[0].dataValues.max.toISOString().split("-")[0],
            min: count[0].dataValues.min.toISOString().split("-")[0],
          });
        })
        .catch((err) => {
          res.send(err);
        });
    }
    if (!searchName && !searchArtist) {
      let result;
      Art.findAll({ order: [["date", "DESC"]] })
        .then((data) => {
          result = data;
          return Art.alert();
        })
        .then((count) => {
          //   console.log(count[0].dataValues.max.toISOString().split("-")[0]);
          //   console.log(count[0].dataValues.count);
          res.render("home", {
            result: result,
            count: count[0].dataValues.count,
            max: count[0].dataValues.max.toISOString().split("-")[0],
            min: count[0].dataValues.min.toISOString().split("-")[0],
          });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }

  static new(req, res) {
    // User.create({ firstName: "Jane", lastName: "Doe" });
    res.render("add");
  }

  static create(req, res) {
    let { name, artist, date, description, photo, placeOfOrigin } = req.body;
    Art.create({ name, artist, date, description, photo, placeOfOrigin })
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err, "errors");
      });
  }

  static delete(req, res) {
    // User.destroy({
    //     where: {
    //       firstName: "Jane"
    //     }
    //   });
    Art.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err, "errors");
      });
  }

  static detail(req, res) {
    let id = req.params.id;
    Art.findByPk(id)
      .then((result) => {
        res.render("edit", { result });
      })
      .catch((err) => {});
  }

  static update(req, res) {
    let { name, artist, date, description, photo, placeOfOrigin } = req.body;

    Art.update(
      { name, artist, date, description, photo, placeOfOrigin },
      { where: { id: req.params.id } }
    )
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err, "errors");
      });
  }
}

module.exports = Controller;
