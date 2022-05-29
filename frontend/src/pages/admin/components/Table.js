import {forwardRef, useState} from 'react';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBoxRounded';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function Table({title, data, columns, onUpdate, onAdd, onDelete, filtering = false}) {
    const [showFilters, setShowFilters] = useState(false)
    const actions = []
    if (filtering) actions.push({
        icon: tableIcons.Filter,
        tooltip: 'Показати фільтри',
        isFreeAction: true,
        onClick: () => { setShowFilters(!showFilters) }
    })
    return (
        <MaterialTable
            stickyHeader aria-label="sticky table"
            title={title}
            columns={columns}
            data={data}
            icons={tableIcons}
            localization={{ body: { editRow: { deleteText: 'Впевнені що хочете видалити?' } } }}
            options={{
                search: true,
                exportButton: {
                    csv: true,
                    pdf: false
                },
                filtering: showFilters,
                addRowPosition: 'first',
                maxBodyHeight: '80vh',
                pageSize: 10,
                pageSizeOptions: [10, 20, 50]
            }}
            actions={actions}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        onUpdate(newData, oldData, resolve, reject);
                    }),
                onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                        onAdd(newData, resolve, reject)
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                        onDelete(oldData, resolve, reject)
                    }),
            }}
        />
    );
}

export default Table;
