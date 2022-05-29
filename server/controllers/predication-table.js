const PdfTable = require('voilab-pdf-table')
const PdfDocument = require('pdfkit');
const _ = require('lodash');

module.exports = {
    create: function (predications) {
        const pdf = new PdfDocument({
                margin: 10,
                autoFirstPage: false,
        })

        pdf.registerFont('FreeSerif',`${__dirname}/../font/FreeSerif.ttf`);
        pdf.font('FreeSerif');
        pdf.fontSize(20);
        const table = new PdfTable(pdf, {
                bottomMargin: 10
        });
        
        table
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: 'name'
            }))

            .setColumnsDefaults({
                headerBorder: 'TBLR',
                border: 'TBLR',
                align: 'left'
            })
            // add table columns
            .addColumns([
                {
                    id: 'number',
                    header: '№',
                    width: 20,
                    align:'center'
                },
                {
                    id: 'name',
                    header: 'Ім\'я',
                    width: 50,
                    align:'center'
                },
                {
                    id: 'phone',
                    header: 'Телефон',
                    width: 100,
                    align:'left'
                },
                {
                    id: 'region',
                    header: 'Район',
                    width: 100,
                    align: 'left'
                },
                {
                    id: 'predicate_date',
                    header: 'Передбачувана дата',
                    width: 140,
                    align: 'left'
                }
            ])
            // add events (here, we draw headers on each new page)
            .onPageAdded(function (tb) {
                tb.addHeader();
            });
 
        // if no page already exists in your PDF, do not forget to add one
        pdf.addPage();
 
        pdf.fontSize(13);
        table.addBody(predications.map((predict, index) => ({
            number: index+1,
            name: predict.name, 
            phone: predict.phone, 
            region: predict.region,
            predicate_date: `${new Date(predict.predicated_date).toLocaleDateString()}`,
        })));
        return pdf;
    }
};