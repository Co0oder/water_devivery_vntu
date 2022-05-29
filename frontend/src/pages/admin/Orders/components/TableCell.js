import React from "react";
import moment from "moment";

import { ReactComponent as EditIcon } from '../../../../static/img/admin/edit.svg'
import { ReactComponent as DeleteIcon } from '../../../../static/img/admin/delete.svg'
import Td from "../../../../common/styled/table/Td.js";
import Tr from "../../../../common/styled/table/Tr.js";

function TableCell({order, onEdit, onDelete}) {

    return (
        <Tr>
            <Td>{order.name}</Td>
            <Td>{order.phone}</Td>
            <Td>{order.address}</Td>
            <Td>{order.house_number}</Td>
            <Td>{order.flat_number}</Td>
            <Td>{order.items.join('\n')}</Td>
            <Td>{moment(order.delivery_date).format('DD-MM-YYYY')}</Td>
            <Td>{order.delivery_time}</Td>
            <Td>{order.comment}</Td>
            <Td>
                <EditIcon onClick={() => onEdit(order.id)} />
                <DeleteIcon onClick={() => onDelete(order.id)} />
            </Td>
        </Tr>
    )
}

export default TableCell;
