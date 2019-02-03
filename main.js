import Duration from './Duration.js';

import './ProgressIndicator.js';

console.log('timeleft started')

const $ = document.querySelector.bind(document)
const daysInWeek = 5
const hoursPerWeek = 40
const hoursPerDay = hoursPerWeek / daysInWeek
let $summaryRow = $('.max-summary').querySelector('tbody tr');
let $totalCol = $summaryRow.querySelector('td:last-child');
let $leftCol = $totalCol.cloneNode(true);
let complete = Duration.fromAspTime($totalCol.querySelector('.max-summary-text').innerHTML)

let perWeek = Duration.fromObject({hours: hoursPerWeek})
let left =  perWeek.minus(complete)
let $leftSummary = $leftCol.querySelector('.max-summary-text')
$leftSummary.innerHTML =  `${Math.floor(left.as('hours'))}:${zeroPad(2, left.minutes)}`
let $progress = document.createElement('pie-progress')
$progress.setAttribute('percent', complete.as('hours') / perWeek.as('hours'))
$leftSummary.appendChild($progress)
$leftCol.querySelector('.max-summary-heading').innerHTML = 'Left'

$summaryRow.appendChild($leftCol);
debugger
Array.from($summaryRow.querySelectorAll('td:not(:last-child)')).forEach(showDayHoursLeft)

function showDayHoursLeft($cell) {
    let complete = Duration.fromAspTime($cell.querySelector('.max-summary-text').innerHTML)
    let perDay = Duration.fromObject({hours: hoursPerDay})
    let left = perDay.minus(complete)
    $cell.querySelector('.max-summary-text').title =  `left ${Math.floor(left.as('hours'))}:${zeroPad(2, left.minutes)}`
}

function zeroPad(length = 2, number) {
    return String(number).padStart(length, '0')
}