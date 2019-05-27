import Duration from './Duration.js'
import './ProgressIndicator.js'
import addDuration from './addDuration.js'


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
$leftSummary.innerHTML =  left.toFormat('h:mm')
let $progress = document.createElement('pie-progress')
$progress.setAttribute('percent', complete.as('hours') / perWeek.as('hours'))
$leftSummary.appendChild($progress)
$leftCol.querySelector('.max-summary-heading').innerHTML = 'Left'
$progress.title = `Friday finish ${addDuration(left).format('H:mm')}` // TODO: needs a bit more work

$summaryRow.appendChild($leftCol);
Array.from($summaryRow.querySelectorAll('td:not(:last-child)')).forEach(showDayHoursLeft)

function showDayHoursLeft($cell) {
    let complete = Duration.fromAspTime($cell.querySelector('.max-summary-text').innerHTML)
    let perDay = Duration.fromObject({hours: hoursPerDay})
    let left = perDay.minus(complete)
    const finish = addDuration(left)
    $cell.querySelector('.max-summary-text').title =  `left ${left.toFormat('h:mm')}, finish ${finish.format('H:mm')}`
}

