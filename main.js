import moment from 'https://unpkg.com/moment@2.22.2/src/moment.js'

import './ProgressIndicator.js'

console.log('timeleft started')

const $ = document.querySelector.bind(document)
const hoursPerWeek = 40
let $summaryRow = $('.max-summary').querySelector('tbody tr');
let $totalCol = $summaryRow.querySelector('td:last-child');
let $leftCol = $totalCol.cloneNode(true);
let complete = toAspMsDuration($totalCol.querySelector('.max-summary-text').innerHTML)

let perWeek = moment.duration(hoursPerWeek, 'hours')
let left =  perWeek.subtract(moment.duration(complete))
let $leftSummary = $leftCol.querySelector('.max-summary-text')
$leftSummary.innerHTML =  `${Math.floor(left.asHours())}:${left.minutes()}`
let $progress = document.createElement('pie-progress')
$progress.setAttribute('percent', left.asHours() / perWeek.asHours())
$leftSummary.appendChild($progress)
$leftCol.querySelector('.max-summary-heading').innerHTML = 'Left'
$summaryRow.appendChild($leftCol);
debugger
function toAspMsDuration(str) {
    return str + ':00'
}

