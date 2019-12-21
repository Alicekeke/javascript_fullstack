import _ from 'lodash'
import './style/index.scss'

function createElement() {
  let div = document.createElement('div')
  div.innerHTML = _.join(['my', 'name', 'is', 'keke'], '')
  div.className = 'box'
  return div
}

document.body.appendChild(createElement())