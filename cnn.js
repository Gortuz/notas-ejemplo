const pgPromise = require("pg-promise")
const { connect } = require("./routes/routes")

const config = {
    host: "dpg-cctkijaen0hinumvkc10-a.oregon-postgres.render.com",
    port: "5432",
    database:"notas_ejemplo",
    user:"alan",
    password:"tMG491OUbfg75jXrLtr6SXH8SvMnZJz8",
    ssl: true
}

const configLocal = {
    host: "localhost",
    port: "5432",
    database:"notas_ejemplo",
    user:"postgres",
    password:"1234"
}

const pgp = pgPromise({})
const db = pgp(config)

exports.db = db;