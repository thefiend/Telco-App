const express = require('express')
const app = express()
const port = 3000

app.get('/dashboard/:number', (req, res) => {
  res.send('Hello World! Number entered: ' + req.params.number)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))