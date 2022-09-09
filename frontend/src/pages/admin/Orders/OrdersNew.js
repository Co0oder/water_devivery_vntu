import React, {useState, useEffect} from "react";
import debounce from "lodash/debounce";
import FormHelperText from "@material-ui/core/FormHelperText";
import {saveOrderAction, deleteOrderAction, getOrdersAction} from "../../../api/orders";
import {BodyContainer, HeaderContainer} from "../../../common/styled/containers/AdminContainer";
import PhoneMask from "../../../common/components/PhoneMask";
import Table from "../components/Table";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomSelectFilter from "../components/CustomSelectFilter";
import CustomTextFilter from "../components/CustomTextFilter";
import FormTextInput from "../components/FormTextInput";
import FormSelect from "../components/FormSelect";
import {DISTRICTS} from "../../../constants/areas";
import {DELIVERY_TIME_OPTIONS} from "../../../constants/form";
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
        field: 'house_number',
        title: '№ дому',
        editComponent: props => (<FormTextInput
            props={props}
            validate={validate.required}
            errorMessage={ERRORS.REQUIRED}
        />),
        filterComponent: (props) => <CustomTextFilter props={props} label="№ дому" />
    },
    {
        field: 'flat_number',
        title: '№ кв.',
        editComponent: props => (<FormTextInput
            props={props}
            validate={validate.number()}
            errorMessage={ERRORS.NUMBER}
        />),
        filterComponent: (props) => <CustomTextFilter props={props} label="№ кв." />
    },
    {
        field: 'items',
        title: 'Товари',
        editComponent: props => (<FormTextInput
            props={props}
            validate={validate.required}
            errorMessage={ERRORS.REQUIRED}
        />),
        filterComponent: (props) => <CustomTextFilter props={props} label="Товари" />
    },
    {
        field: 'price',
        title: 'Ціна',
        editComponent: props => (<FormTextInput
            props={props}
            validate={validate.required}
            errorMessage={ERRORS.REQUIRED}
        />),
        filterComponent: (props) => <CustomTextFilter props={props} label="Ціна" />
    },
    {
        field: 'delivery_date',
        title: 'Дата',
        type: "date",
        dateSetting: { locale: "en-GB" },
        customFilterAndSearch: (term, rowData) => {
            const date = new Date(new Date(rowData.delivery_date).toDateString())
            return new Date(term[0]) <= date && new Date(term[1]) >= date
        },
        filterComponent: (props) => <CustomDatePicker {...props} />
    },
    {
        field: 'delivery_time',
        title: 'Час',
        dateSetting: { locale: "en-GB" },
        customFilterAndSearch: (term, rowData) => {
            if (term.length === 0) return true
            return term.includes(rowData.delivery_time)
        },
        editComponent: props => (<FormSelect
            props={props}
            options={DELIVERY_TIME_OPTIONS}
            validate={validate.required}
            errorMessage={ERRORS.REQUIRED} />),
        filterComponent: (props) => (
            <CustomSelectFilter
                props={props}
                multiple={true}
                options={DELIVERY_TIME_OPTIONS}
                title="Час"/>
        )
    },
    {
        field: 'comment',
        title: 'Коментар',
        filterComponent: (props) => <CustomTextFilter props={props} label="Коментар" />
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

function Orders() {
    const [orders, setOrders] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const getOrders = async () => {
            try {
                const {data} = await getOrdersAction()
                setOrders(data.map(d => ({ ...d, items: d.items.join() })))
            } catch (e) {
                console.error(e)
            }
        }
        getOrders()
    }, [])

    useEffect(() => {
        debounceClearError()
    }, [error])

    const debounceClearError = debounce(() => { setError('') }, 3000)

    const onAdd = async (newData, resolve, reject) => {
        if (!validate.validateAll(newData, VALIDATE_FIELDS)) {
            setError(ERRORS.FAIL_VALIDATION)
            reject()
            return
        }
        try {
            const data = {
                ...newData,
                phone: newData.phone.replace(/[^\d]/g,''),
                items: [newData.items]
            }
            await saveOrderAction(data)
            setOrders([data, ...orders])
            resolve()
        } catch (e) {
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
            const data = {
                ...newData,
                phone: newData.phone.replace(/[^\d]/g,''),
                items: [newData.items]
            }
            await saveOrderAction(data)
            const dataUpdate = [...orders]
            const index = oldData.tableData.id
            dataUpdate[index] = data
            setOrders(dataUpdate)
            resolve()
        } catch (e) {
            setError(ERRORS.DEFAULT)
            reject()
        }
    }

    const onDelete = async (oldData, resolve, reject) => {
        try {
            await deleteOrderAction(oldData.id)
            setOrders(orders.filter(i => i.id !== oldData.id))
            resolve()
        } catch (e) {
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
                    title="Замовлення"
                    data={orders}
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

export default Orders;
