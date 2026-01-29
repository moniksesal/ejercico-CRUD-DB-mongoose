const express = require('express')
const app = express()
const PORT = 3002
const tasksRoutes = require('./routes/tasks')

const { dbConnection } = require('./config/config')

app.use(express.json())

app.use('/', tasksRoutes)

dbConnection()

app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})

app.listen(PORT, () => console.log(`Servidor escuchando en http:/localhost:/${PORT}`))