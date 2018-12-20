const turn = require('../turn.js')
const router = require('express').Router()
const shortid = require('shortid')

const config = {
  "iceServers": [{
    "url": "stun:stun.l.google.com:19302",
    "urls": "stun:stun.l.google.com:19302"
  }]
};

const cfgIceServers = config['iceServers']

router.get('/', (req, res) => {
  res.redirect(`/call/${shortid.generate()}`)
})

router.get('/:callId', (req, res) => {
  const iceServers = turn.processServers(cfgIceServers)
  res.render('call', {
    callId: encodeURIComponent(req.params.callId),
    iceServers
  })
})

module.exports = router
