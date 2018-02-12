const fetch = require('node-fetch')
const Hue = require('node-hue-api')

const ethPriceAPI = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'

const HueApi = Hue.HueApi
const HueLightState = Hue.lightState

const host = "192.168.0.24"
const username = "xrvO5QZn9lqCGs4DLzZbi2AtFZDtMXtb1--50JCw"
const light = 4

const hue = new HueApi(host, username)

let state = null
let currentPrice = 0

const ethPrice = first => {
  fetch(ethPriceAPI).then(response => response.json()).then(data => {
    if (first) {
      currentPrice = data.USD
      console.log(currentPrice)

    } else if (currentPrice !== data.USD) {
      const dir = currentPrice > data.USD ? 'down' : 'up'
      const rgb = dir === 'up' ? [0, 255, 0] : [255, 0, 0]

      currentPrice = data.USD
      state = HueLightState.create().on().rgb(...rgb)

      hue.setLightState(light, state, function(err, lights) {
        if (err) {
          console.log(JSON.stringify(err, null, 2))
        }
      })

      console.log(`Price has gone ${dir}!`, currentPrice)
    }
  })
}

const init = () => {
  ethPrice(true)
  setInterval(ethPrice, 1000)
}

init(true)
