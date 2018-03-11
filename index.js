import {utils} from 'pixi.js/dist/pixi.min'
import {getBoardConfiguration, getRenderType} from './app/configuration'
import {createApp} from './app/App'

utils.sayHello(getRenderType())
document.getElementById('game-play').appendChild(createApp(getBoardConfiguration()))
