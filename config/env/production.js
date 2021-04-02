//Production configuration options
//To sign the session identifier, use a secret string
module.exports = {
  db: "mongodb://localhost/articles-db",
  sessionSecret: "productionSessionSecret",
  secretKey: "real_secret",
};
