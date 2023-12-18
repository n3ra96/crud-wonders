const express = require('express')
const path = require('path')
const api = require('./server/routes/api')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const wonders = [
    { name: "Mount Everest", location: "Nepal", visited: false },
    { name: "Grand Canyon", location: "Arizona", visited: false },
    { name: "Botanical Gardens", location: "Singapore", visited: true },
    { name: "Pantheon", location: "Greece", visited: false },
    { name: "Colosseum", location: "Italy", visited: true }
]

app.get('/wonders', function (req, res) {
    res.send(wonders)
})

app.post('/wonder', function (req, res) {
    console.log("Someone's trying to make a post request")
    let wonder = req.body
    wonder.visited = false
    wonders.push(wonder)
    res.send("completed adding wonder")
    
})

app.put('/wonder/:name', function (req, res) {
    console.log("About to update someone")
    let wonder = req.params.name
    wonders.find(w => w.name === wonder).visited = true
    res.end()// don't forget to end the cycle!
    
})

app.delete('/wonder/:name', function (req, res) {
    let wonder = req.params.name
    let wondersIndex = wonders.findIndex(w => w.name === wonder)
    wonders.splice(wondersIndex, 1)
    res.end()
})

const port = 1337 //because why not
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})