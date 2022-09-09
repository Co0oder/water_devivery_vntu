import {useState} from "react";

import { ReactComponent as SaveIcon } from '../../../../static/img/admin/save.svg'
import { ReactComponent as DeleteIcon } from '../../../../static/img/admin/delete.svg'

import Td from "../../../../common/styled/table/Td.js";
import Tr from "../../../../common/styled/table/Tr.js";
import TableInput from "../../../../common/styled/table/TableInput";

const iconStyles = {
    width: '25px',
    height: '25px',
    fill: '#64ba7d',
    cursor: 'pointer'
}

function TableFormCell({order = {}, onSave, onCancel}) {
    const [name, setName] = useState(order.name || '')
    const [tel, setTel] = useState(order.phone || '')
    const [address, setAddress] = useState(order.address || '')
    const [houseNum, setHouseNum] = useState('')
    const [flatNum, setFlatNum] = useState('')
    const [volume, setVolume] = useState(order.volume || '')
    const [count, setCount] = useState(order.amount || '')
    const [deliveryDate, setDeliveryDate] = useState(order.name || '')
    const [deliveryTime, setDeliveryTime] = useState(order.name || '')
    const [comment, setComment] = useState(order.comment || '')

    const onSaveOrder = () => {
        onSave({
            name,
            address,
            house_number: houseNum,
            flat_number: flatNum,
            amount: count,
            phone: tel.replace(/[^\d]/g,''),
            delivery_date: deliveryDate,
            delivery_time: deliveryTime,
            comment,
        })
    }

    return (
        <Tr>
            <Td>
                <TableInput value={name} onChange={(e) => setName(e.target.value)} />
            </Td>
            <Td>
                <TableInput value={tel} onChange={(e) => setTel(e.target.value)} />
            </Td>
            <Td>
                <TableInput value={address} onChange={(e) => setAddress(e.target.value)} />
            </Td>
            <Td>
                <TableInput value={houseNum} onChange={(e) => setHouseNum(e.target.value)} />
            </Td>
            <Td>
                <TableInput value={flatNum} onChange={(e) => setFlatNum(e.target.value)} />
            </Td>
            <Td>
                <TableInput value={count} onChange={(e) => setCount(e.target.value)} />
            </Td>
            <Td>
                <TableInput value={volume} onChange={(e) => setVolume(e.target.value)} />
            </Td>
            <Td>
                <TableInput value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
            </Td>
            <Td>
                <TableInput value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} />
            </Td>
            <Td>
                <TableInput value={comment} onChange={(e) => setComment(e.target.value)} />
            </Td>
            <Td>
                <SaveIcon style={iconStyles} onClick={onSaveOrder} />
                <DeleteIcon
                    style={{...iconStyles, fill: '#d96161'}}
                    onClick={() => order.type === 'edit' ? onCancel(order.id) : onCancel()} />
            </Td>
        </Tr>
    )
}

export default TableFormCell;
