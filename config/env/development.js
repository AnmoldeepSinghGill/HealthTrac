//Development configuration options
//To sign the session identifier, use a secret string
module.exports = {
  db: "mongodb://localhost/healthtrac-db",
  sessionSecret: "developmentSessionSecret",
  secretKey: "real_secret",
};
