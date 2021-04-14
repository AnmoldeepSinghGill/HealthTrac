//Development configuration options
//To sign the session identifier, use a secret string
module.exports = {
  // db: "mongodb://localhost/healthtrac-db",
  db: "mongodb+srv://dbUser:S0vIg4IRbMrr4CLj@healthtrax.pesiu.mongodb.net/healthtrax-db?retryWrites=true&w=majority",
  sessionSecret: "developmentSessionSecret",
  secretKey: "real_secret",
};
