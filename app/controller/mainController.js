const mainController = {
  homeRender: (_, res) => {
    res.render("home");
    
    },

  error404: (req, res) => {
    // ne pas oubliez le status 404 car c'est une erreur 404
    res.status(404).render("404", { url: req.url });
  },
};

module.exports = mainController;
