// jQuery('head').append(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.18/css/dataTables.bootstrap.css" />`)
// jQuery(function($){
//     let $table = $('.HtmlGrid');
//     $heading = $table.find('.HtmlGridHeadingRow')
//     let $newHeadingContents = $heading.clone().find('td');
//     $heading.remove();
//     let $newHeading = $('<thead><tr class="HtmlGridHeadingRow"></tr></thead>');
//     let $newHeadingRow = $newHeading.find('tr');
//     $newHeadingContents.each(function() {
//         let $heading = $('<th>');
        
//         Array.from(this.attributes).forEach(attr => {
//             $heading.attr(attr.name, attr.value)
//         });
//         $heading.html(this.innerHTML)
//         $newHeadingRow.append($heading);
//     });
//     let $summaryRows = $table.find('tbody tr:has(.summary-cell)');
//     let $childTbRows = $summaryRows.clone();
//     $summaryRows.remove();
//     $table.prepend($newHeading);
//     debugger
//     $table.DataTable();
// })

console.log('timeleft started')
(function($){
        let $summaryRow = $('.max-summary').find('tbody tr');
        let $totalCol = $summaryRow.find('td:last');
        let $leftCol = $totalCol.clone();
        let complete = $totalCol.find('.max-summary-text').html()
        let hours = moment('40:00',"HH:mm").diff(moment(complete,"HH:mm"), 'hours')
        let minutes = moment('40:00',"HH:mm").diff(moment(complete,"HH:mm"), 'minutes') - 60 * hours;
        
        $leftCol.find('.max-summary-text').html(`${hours}:${minutes}`);
        $leftCol.find('.max-summary-heading').html('Left');
        $summaryRow.append($leftCol);
   
})(jQuery);
