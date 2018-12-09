import moment from 'https://unpkg.com/moment@2.22.2/src/moment.js'

console.log('timeleft started')

const $ = document.querySelector.bind(document)
const hoursPerWeek = 40
let $summaryRow = $('.max-summary').querySelector('tbody tr');
let $totalCol = $summaryRow.querySelector('td:last-child');
let $leftCol = $totalCol.cloneNode(true);
let complete = toAspMsDuration($totalCol.querySelector('.max-summary-text').innerHTML)

let left =  moment.duration(hoursPerWeek, 'hours').subtract(moment.duration(complete))

$leftCol.querySelector('.max-summary-text').innerHTML =  `${Math.floor(left.asHours())}:${left.minutes()}`
$leftCol.querySelector('.max-summary-heading').innerHTML = 'Left'
$summaryRow.appendChild($leftCol);

function toAspMsDuration(str) {
    return str + ':00'
}

