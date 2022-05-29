import TableCell from './TableCell';
import Table from "../../../../common/styled/table/Table";
import Tbody from "../../../../common/styled/table/Tbody";
import Thead from "../../../../common/styled/table/Thead";
import Tr from "../../../../common/styled/table/Tr";
import Th from "../../../../common/styled/table/Th";

function CallsTable({calls}) {
    const onUpdateRoom = () => {}
    const onDeleteRoom = () => {}
    return (
        <Table
            columns={[
                {min: '100px', max: '3fr'},
                {min: '110px', max: '4fr'},
                {min: '85px', max: '.6fr'}
            ]}>
            <Thead>
                <Tr>
                    <Th>Ім'я</Th>
                    <Th>Телефон</Th>
                    <Th>Дії</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    calls.map( (call) => {
                        return (
                            <TableCell key={call.id} call={call} onUpdate={onUpdateRoom} onDelete={onDeleteRoom}/>
                        )
                    })
                }
            </Tbody>
        </Table>
    );
}

export default CallsTable;
