function genPDF(id, name) {
    var doc = new jsPDF('p', 'pt');
    var elem = document.getElementById(id);
    var data = doc.autoTableHtmlToJson(elem);
    data.columns.pop();


    //Do not print the header if current page not the first page.

    doc.autoTable(data.columns, data.rows, {
        drawHeaderRow: function (row, data) {
            if (data.pageCount > 1) {
                return false;
            }
            console.log(row);

        }
    });

    doc.save(`${name}.pdf`);
}

$('#personpdfbtn').click(function (e) { 
    e.preventDefault();
    genPDF('persontable', 'persons');
    return false; 
});