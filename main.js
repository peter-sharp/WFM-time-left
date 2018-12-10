import Duration from './Duration.js';

import './ProgressIndicator.js';

console.log('timeleft started')

const $ = document.querySelector.bind(document)
const hoursPerWeek = 40
let $summaryRow = $('.max-summary').querySelector('tbody tr');
let $totalCol = $summaryRow.querySelector('td:last-child');
let $leftCol = $totalCol.cloneNode(true);
let complete = Duration.fromAspTime($totalCol.querySelector('.max-summary-text').innerHTML)

let perWeek = Duration.fromObject({hours: hoursPerWeek})
let left =  perWeek.minus(complete)
let $leftSummary = $leftCol.querySelector('.max-summary-text')
$leftSummary.innerHTML =  `${Math.floor(left.as('hours'))}:${left.minutes}`
let $progress = document.createElement('pie-progress')
$progress.setAttribute('percent', left.as('hours') / perWeek.as('hours'))
$leftSummary.appendChild($progress)
$leftCol.querySelector('.max-summary-heading').innerHTML = 'Left'

$summaryRow.appendChild($leftCol);
debugger

