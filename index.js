const Hue = require("node-hue-api")
const HueApi = Hue.HueApi
const HueLightState = Hue.lightState

const host = "192.168.0.24"
const username = "xrvO5QZn9lqCGs4DLzZbi2AtFZDtMXtb1--50JCw"
const hue = new HueApi(host, username)
let state

const log = data => {
  console.log(JSON.stringify(data, null, 2));
}

state = HueLightState.create().on().white(500, 70)

hue.setLightState(4, state, function(err, lights) {
  if (err) {
    log(err)
    return
  }

  log(lights)
})
