const turn = require('../turn.js')
const router = require('express').Router()
const shortid = require('shortid')

const config = {
      "baseUrl": "",
      "iceServers": [{
                "url": "stun:stun.l.google.com:19302",
                "urls": "stun:stun.l.google.com:19302"
            }]
};


const BASE_URL = config['baseUrl']
const cfgIceServers = config['iceServers']

router.get('/', (req, res) => {
  res.redirect(`${BASE_URL}/call/${shortid.generate()}`)
})

router.get('/:callId', (req, res) => {
  const iceServers = turn.processServers(cfgIceServers)
  res.render('call', {
    callId: encodeURIComponent(req.params.callId),
    iceServers
  })
})

module.exports = router
