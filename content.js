'use strict';
const browser = this.browser || this.chrome
const script = document.createElement('script')
script.setAttribute('type', 'module')
script.setAttribute('src', browser.extension.getURL('main.js'))
const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement

head.insertBefore(script, head.lastChild)