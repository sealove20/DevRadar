const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `htttps://api.github.com/users/${github_username}`
      );

      let { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return res.json(dev);
  },

  async update(req, res) {
    await Dev.findOneAndUpdate(req.params.id, req.body, err => {
      if (err) {
        return res.json(err);
      } else {
        return res.json("Dados do dev alterado com sucesso");
      }
    });
  },

  async destroy(req, res) {
    await Dev.findOneAndDelete(req.params.id, err => {
      if (err) {
        return res.json(err);
      } else {
        return res.json("Dev deletado com sucesso");
      }
    });
  }
};
