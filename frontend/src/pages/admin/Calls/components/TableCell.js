import React from "react";

import { ReactComponent as EditIcon } from '../../../../static/img/admin/edit.svg'
import { ReactComponent as DeleteIcon } from '../../../../static/img/admin/delete.svg'
import Td from "../../../../common/styled/table/Td.js";
import Tr from "../../../../common/styled/table/Tr.js";

function TableCell({call, onUpdate, onDelete}) {

    return (
        <Tr>
            <Td>{call.name}</Td>
            <Td>{call.phone}</Td>
            <Td>
                <EditIcon onClick={() => onUpdate(call)} />
                <DeleteIcon onClick={() => onDelete(call.id)} />
            </Td>
        </Tr>
    )
}

export default TableCell;
