const config = {
    PORT: 4000,
    DB_URl:"mongodb://localhost:27017/ContactVerification",
    secretKey: "emilogic",
    algorithm: 'HS256', //default:HS255
}

module.exports = config;
