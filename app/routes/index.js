var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {

  app.get('/logs', (req, res) => {
    let logsArray = []
    // grab all logs from DB
    let logs = db.collection('logs').find().toArray((err, logs)=>{
      logs.forEach((log) => {
        logsArray.push(log)
      })
      // return array of log objects as JSON response
      res.json(logsArray)
    })
  })

  app.get('/logs/:id', (req, res) => {
      // grab log id from URL params
      const id = req.params.id
      const details = { '_id': new ObjectID(id) }
      if(id){
        // search for record by Object id
        db.collection('logs').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'})
          } else {
            res.send(item)
          }
        })
      } else {
        res.send({'error':'An error has occurred'})
      }
  })

  app.post('/logs', (req, res) => {
    // create a log from request body
    const log = { text: req.body.body, title: req.body.title }
    // insert log into 'logs' collection
    db.collection('logs').insert(log, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' })
      } else {
        // respond to client with result of operation
        res.send(result.ops[0])
      }
    })
  })

  app.delete('/logs/:id', (req, res) => {
    // grab log id from URL params
    const id = req.params.id
    const details = { '_id': new ObjectID(id) }
    db.collection('logs').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'})
      } else {
        res.send('Log ' + id + ' has been deleted!')
      }
    })
  })

  app.put('/logs/:id', (req, res) => {
    const id = req.params.id
    const details = { '_id': new ObjectID(id) }
    const log = { text: req.body.body, title: req.body.title }
    db.collection('logs').update(details, log, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'})
      } else {
          res.send(log)
      }
    })
  })

}
