import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {ReactComponent as EditIcon} from "../../../../static/img/admin/edit.svg";
import {ReactComponent as DeleteIcon} from "../../../../static/img/admin/delete.svg";

const columns = [
    { id: 'name', label: 'Ім\'я', minWidth: 170 },
    { id: 'phone', label: 'Телефон', minWidth: 100 },
    { id: 'address', label: 'Адреса', minWidth: 100 },
    { id: 'house_number', label: '№ буд.', minWidth: 81 },
    { id: 'flat_number', label: '№ кв.', minWidth: 80 },
    { id: 'items', label: 'Товари', minWidth: 100, format: items => items.join('|||') },
    { id: 'delivery_date', label: 'Дата', minWidth: 100 },
    { id: 'delivery_time', label: 'Час', minWidth: 100 },
    { id: 'comment', label: 'Коментар', minWidth: 100 },
];


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '100%',
    },
});

export default function StickyHeadTable({rows}) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <TableContainer className={classes.container}>
                <Table className={classes.root} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell style={{ minWidth: 100 }}>
                                Дії
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell>
                                        <EditIcon />
                                        <DeleteIcon />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    );
}
