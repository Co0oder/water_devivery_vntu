import React, {useState, useEffect} from "react";
import debounce from "lodash/debounce";
import FormHelperText from "@material-ui/core/FormHelperText";
import {addCustomerAction, deleteCustomerAction, getCustomersAction} from "../../../api/customers";
import {BodyContainer, HeaderContainer} from "../../../common/styled/containers/AdminContainer";
import PhoneMask from "../../../common/components/PhoneMask";
import Table from "../components/Table";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomSelectFilter from "../components/CustomSelectFilter";
import CustomTextFilter from "../components/CustomTextFilter";
import FormTextInput from "../components/FormTextInput";
import FormSelect from "../components/FormSelect";
import {DISTRICTS} from "../../../constants/areas";
import ERRORS from "../../../constants/errors";
import validate from "../../../helpers/validate";
import {Alert} from "@material-ui/lab";

const VALIDATE_FIELDS = {
    name: 'required',
    phone: 'phone',
    region: 'required',
    address: 'required'
};

const columns = [
    {
        field: 'name',
        title: 'Ім\'я',
        editComponent: props => (<FormTextInput
            props={props}
            validate={validate.required}
            errorMessage={ERRORS.REQUIRED}
        />),
        filterComponent: (props) => <CustomTextFilter props={props} label="Ім'я" />
    },
    {
        field: 'phone',
        title: 'Телефон',
        editComponent: props => (<FormTextInput
            props={props}
            mask={PhoneMask}
            validate={validate.phone}
            errorMessage={ERRORS.PHONE}
        />),
        filterComponent: (props) => <CustomTextFilter props={props} label="Телефон" />
    },
    {
        field: 'region',
        title: 'Район',
        editComponent: props => (<FormSelect
            props={props}
            options={DISTRICTS}
            validate={validate.required}
            errorMessage={ERRORS.REQUIRED} />),
        customFilterAndSearch: (term, rowData) => {
            if (term.length === 0) return true
            return term.includes(rowData.region)
        },
        filterComponent: (props) => <CustomSelectFilter props={props} options={DISTRICTS} title="Район"/>
    },
    {
        field: 'address',
        title: 'Адреса',
        editComponent: props => (<FormTextInput
            props={props}
            validate={validate.required}
            errorMessage={ERRORS.REQUIRED}
        />),
        filterComponent: (props) => <CustomTextFilter props={props} label="Адреса" />
    },
    {
        field: 'created_at',
        title: 'Створено',
        type: "date",
        dateSetting: { locale: "en-GB" },
        customFilterAndSearch: (term, rowData) => {
            const date = new Date(new Date(rowData.created_at).toDateString())
            return new Date(term[0]) <= date && new Date(term[1]) >= date
        },
        editComponent: () => <FormHelperText>Дата ставиться автомитично</FormHelperText>,
        filterComponent: (props) => <CustomDatePicker {...props} />
    },
];

function Customers() {
    const [customers, setCustomers] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        getCustomersAction().then(({data}) => {
            setCustomers(data.map(item => ({...item, address: `${item.address}, ${item.house_number}`})))
        }).catch(e => {
            console.log('getCustomersAction err -->', e)
            setError(ERRORS.DEFAULT)
        })
    }, [])

    useEffect(() => {
        debounceClearError()
    }, [error])

    const debounceClearError = debounce(() => { setError('') }, 3000)

    const onAdd = async (data, resolve, reject) => {
        if (!validate.validateAll(data, VALIDATE_FIELDS)) {
            setError(ERRORS.FAIL_VALIDATION)
            reject()
            return
        }

        try {
            await addCustomerAction({...data, phone: data.phone.replace(/[^\d]/g,'')})
            setCustomers([data, ...customers])
            resolve()
        } catch (e) {
            console.log('addCustomerAction err -->', e)
            setError(ERRORS.DEFAULT)
            reject()
        }
    }

    const onUpdate = async (newData, oldData, resolve, reject) => {
        if (!validate.validateAll(newData, VALIDATE_FIELDS)) {
            setError(ERRORS.FAIL_VALIDATION)
            reject()
            return
        }

        try {
            await addCustomerAction({...newData, phone: newData.phone.replace(/[^\d]/g,'')})
            const dataUpdate = [...customers]
            const index = oldData.tableData.id
            dataUpdate[index] = {...newData, phone: newData.phone.replace(/[^\d]/g,'')}
            setCustomers(dataUpdate)
            resolve()

        } catch (e) {
            console.log('addCustomerAction err -->', e)
            setError(ERRORS.DEFAULT)
            reject()
        }
    }

    const onDelete = async (oldData, resolve, reject) => {
        try {
            await deleteCustomerAction(oldData.id)
            setCustomers(customers.filter(i => i.id !== oldData.id))
            resolve()
        } catch (e) {
            console.log('deleteCustomerAction err -->', e)
            setError(ERRORS.DEFAULT)
            reject()
        }
    }


    return (
        <>
            <HeaderContainer>
                {
                    error ? <Alert severity="error">{error}</Alert> : null
                }
            </HeaderContainer>
            <BodyContainer>
                <Table
                    title={`Клієнти ${customers.length}`}
                    data={customers}
                    columns={columns}
                    filtering={true}
                    onAdd={onAdd}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            </BodyContainer>
        </>
    );
}

export default Customers;
