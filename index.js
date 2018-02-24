import {Application, loader, Sprite, utils} from 'pixi.js/dist/pixi.min'
import {getBoardConfiguration, getRenderType} from './app/configuration'
import {createApp} from './app/App'

utils.sayHello(getRenderType())
document.body.appendChild(createApp(getBoardConfiguration()))
