import TableCell from './TableCell';
import Table from "../../../../common/styled/table/Table";
import Tbody from "../../../../common/styled/table/Tbody";
import Thead from "../../../../common/styled/table/Thead";
import Tr from "../../../../common/styled/table/Tr";
import Th from "../../../../common/styled/table/Th";
import TableFormCell from "./TableFormCell";

function CallsTable({orders, onSave, onCancel, onEdit}) {
    const onDeleteRoom = () => {}
    return (
        <Table
            columns={[
                {min: '120px', max: '3fr'},
                {min: '130px', max: '2fr'},
                {min: '180px', max: '3fr'},
                {min: '81px', max: '1fr'},
                {min: '80px', max: '1fr'},
                {min: '400px', max: '2fr'},
                {min: '120px', max: '2fr'},
                {min: '120px', max: '2fr'},
                {min: '130px', max: '4fr'},
                {min: '100px', max: '1.5fr'},
            ]}
        >
            <Thead>
                <Tr>
                    <Th>Ім'я</Th>
                    <Th>Телефон</Th>
                    <Th>Адреса</Th>
                    <Th>№ буд.</Th>
                    <Th>№ кв.</Th>
                    <Th>Товари</Th>
                    <Th>Дата</Th>
                    <Th>Час</Th>
                    <Th>Коментар</Th>
                    <Th>Дії</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    orders.map( (order) => {
                        if (order.type === 'add' || order.type === 'edit') {
                            return (
                                <TableFormCell
                                    key={order.id}
                                    order={order}
                                    onSave={onSave}
                                    onCancel={onCancel}/>
                            )
                        }
                        return (
                            <TableCell
                                key={order.id}
                                order={order}
                                onEdit={onEdit} onDelete={onDeleteRoom}/>
                        )
                    })
                }
            </Tbody>
        </Table>
    );
}

export default CallsTable;
