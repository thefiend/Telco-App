const express = require('express')
const app = express()
const port = 3000



app.get('/dashboard/:number', (req, res) => {
  res.json({
    data: {
      used: 2,
      total: 10,
      unit: 'gb'
    },
    voice: {
      used: 20,
      total: 100,
      unit: "mins"
    },
    SMS: {
      used: 10,
      total: 100,
      unit: "messages"
    }
  })
})

app.get('/addon/:type', (req, res) => {
  let response = {}
  response[req.params.type] = [
    {
      name: 'Addon 1',
      id: 'ABC'
    },
    {
      name: 'Addon 2',
      id: 'ABCC'
    }
  ]
  res.json(response)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))