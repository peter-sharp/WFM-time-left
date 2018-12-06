import moment from 'https://unpkg.com/moment@2.22.2/src/moment.js'

console.log('timeleft started')

const $ = document.querySelector.bind(document)
const hoursPerWeek = '40:00'
let $summaryRow = $('.max-summary').querySelector('tbody tr');
let $totalCol = $summaryRow.querySelector('td:last-child');
let $leftCol = $totalCol.cloneNode(true);
let complete = $totalCol.querySelector('.max-summary-text').innerHTML
let left = moment.duration(hoursPerWeek).subtract(moment.duration(complete))

$leftCol.querySelector('.max-summary-text').innerHTML = `${left.hours()}:${left.minutes()}`
$leftCol.querySelector('.max-summary-heading').innerHTML = 'Left'
$summaryRow.appendChild($leftCol);

