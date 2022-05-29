const PdfTable = require('voilab-pdf-table')
const PdfDocument = require('pdfkit');
const _ = require('lodash');

module.exports = {
    create: function (orders) {
        const pdf = new PdfDocument({
                margin: 10,
                autoFirstPage: false,
        })

        pdf.registerFont('FreeSerif',`${__dirname}/../font/FreeSerif.ttf`);
        pdf.font('FreeSerif');
        pdf.fontSize(10);
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
                    width: 40,
                    align:'left'
                },
                {
                    id: 'phone',
                    header: 'Телефон',
                    width: 60,
                    align: 'left'
                },
                {
                    id: 'address',
                    header: 'Адреса',
                    width: 150,
                    align: 'left'
                },
                {
                    id: 'items',
                    header: 'Товари',
                    width: 120,
                    align: 'left'
                },
                {
                    id: 'price',
                    header: 'Вартість',
                    width: 45,
                    align: 'left'
                },
                {
                    id: 'delivery_date',
                    header: 'Термін доставки',
                    width: 110,
                    align: 'center'
                },
            ])
            // add events (here, we draw headers on each new page)
            .onPageAdded(function (tb) {
                tb.addHeader();
            });
 
        // if no page already exists in your PDF, do not forget to add one
        pdf.addPage();
 
        const ordersGroupByRegion = _.groupBy(orders, 'region');
        for(region of Object.keys(ordersGroupByRegion)){
            pdf.fontSize(14);
            pdf.text(`\n${region}\n`, 10)
            pdf.fontSize(10);
            table.addBody(ordersGroupByRegion[region].map((order, index) => ({
                number: index+1,
                name: order.name, 
                phone: order.phone, 
                address: `${order.address} №${order.house_number} ${order.flat_number ? `кв. ${order.flat_number}` : ''}`, 
                items: `${order.items}`,
                price: `${order.price}`,
                delivery_date: `${new Date(order.delivery_date).toLocaleDateString()} / ${order.delivery_time}`,
                region: order.region
            })));
        }
        return pdf;
    }
};