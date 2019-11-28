import Duration from './Duration.js'
import './ProgressIndicator.js'
import addDuration from './addDuration.js'


const $ = document.querySelector.bind(document)
const daysInWeek = 5
const hoursPerWeek = 40
const hoursPerDay = hoursPerWeek / daysInWeek
const weekends = new Set([5, 6]);
const HOLIDAY_THRESHHOLD = 3;

let $summaryRow = $('.max-summary').querySelector('tbody tr');
let $totalCol = $summaryRow.querySelector('td:last-child');
let $leftCol = $totalCol.cloneNode(true);
let complete = Duration.fromAspTime($totalCol.querySelector('.max-summary-text').innerHTML)

const $dayCells = Array.from($summaryRow.querySelectorAll('td:not(:last-child)'))
const holidays = $dayCells.reduce(getHolidays, []);
complete = holidays.reduce(plusPeriod, complete)
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
$dayCells.forEach(showDayHoursLeft)

function plusPeriod(a, b) {
    return a.plus(b)
}


function getHolidays(holidays, $cell, i) {
    const hours = getDayHoursComplete($cell).as('hours');
    if (hours < HOLIDAY_THRESHHOLD && !weekends.has(i) && !isCurrentDayOfWeek(i + 1)) {
        holidays.push(Duration.fromObject({hours: hoursPerDay - hours}));
    }
    return holidays;
}

function isCurrentDayOfWeek(dayOfWeek) {
    return dayOfWeek === (new Date()).getDay()
}

function showDayHoursLeft($cell) {
    let complete = getDayHoursComplete($cell)
    let perDay = Duration.fromObject({hours: hoursPerDay})
    let left = perDay.minus(complete)
    const finish = addDuration(left)
    $cell.querySelector('.max-summary-text').title =  `left ${left.toFormat('h:mm')}, finish ${finish.format('H:mm')}`
}

function getDayHoursComplete($cell) {
    return Duration.fromAspTime($cell.querySelector('.max-summary-text').innerHTML)
}
