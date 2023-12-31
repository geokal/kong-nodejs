const fs = require('fs')
const https = require('https')
const data = require('./data.json')

const SSL_KEY = fs.readFileSync('./certificate/localhost.key')
const SSL_CERT = fs.readFileSync('./certificate/localhost.crt')
const port = 3000

const express = require('express')
const app = express()


const getCurrentUser = ({ headers }) => {
    return headers['mock-logged-in-as'] ||
        headers['x-authenticated-userid']
}

app.get('/stepcounts', (req, res, next) => {
    console.log(req.headers)
    const user = getCurrentUser(req)
    if (!user) {
        res.status(401).send('Not authorized')
        return
    }
    res.send(data[user] || [])
})

const server = https.createServer({ key: SSL_KEY, cert: SSL_CERT }, app)
server.listen(port, () => {
    console.log("Server is listening on https://127.0.0.1:${port}")
})

