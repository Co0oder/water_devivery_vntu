import React, {useState, useEffect} from "react";
import debounce from "lodash/debounce"
import FormHelperText from "@material-ui/core/FormHelperText";
import {saveItemAction, deleteItemAction, getItemsAction} from "../../../api/items";
import {BodyContainer, HeaderContainer} from "../../../common/styled/containers/AdminContainer";
import Table from "../components/Table";
import FormTextInput from "../components/FormTextInput";
import FormFileInput from "../components/FormFileInput";
import ERRORS from "../../../constants/errors";
import validate from "../../../helpers/validate";
import {Alert} from "@material-ui/lab";

const VALIDATE_FIELDS = {
    // image: 'image',
    title: 'required',
    price: 'number',
    description: 'required',
};

const columns = [
    {
        field: 'image',
        title: 'Фото',
        render: rowData => <img src={rowData.image} style={{width: 120}}/>,
        editComponent:  props => (<FormFileInput
            props={props}
            // validate={validate.image}
            // errorMessage={ERRORS.IMAGE}
        />),
    },
    {
        field: 'title',
        title: 'Ім\'я',
        editComponent: props => (<FormTextInput
            props={props}
            validate={validate.required}
            errorMessage={ERRORS.REQUIRED}
        />),
    },
    {
        field: 'order',
        title: 'Приорітет',
        editComponent: props => (<FormTextInput
            props={props}
            validate={validate.number}
            errorMessage={ERRORS.NUMBER}
        />),
    },
    {
        field: 'price',
        title: 'Ціна',
        editComponent: props => (<FormTextInput
            props={props}
            validate={validate.number}
            errorMessage={ERRORS.NUMBER}
        />),
    },
    {
        field: 'description',
        title: 'Опис',
        editComponent: props => (<FormTextInput
            props={props}
            validate={validate.required}
            errorMessage={ERRORS.REQUIRED}
        />),
    },
    {
        field: 'details',
        title: 'Деталі',
        editComponent: props => (<FormTextInput
            props={props}
        />),
    },
    {
        field: 'created_at',
        title: 'Створено',
        type: "date",
        dateSetting: { locale: "en-GB" },
        editComponent: () => <FormHelperText>Дата ставиться автомитично</FormHelperText>,
    },
];

function Items() {
    const [items, setItems] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        getItemsAction().then(data => {
            setItems(data)
        }).catch(e => {
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
            await saveItemAction(preparePostData(data))
            setItems([data, ...items])
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
            const [updatedItem] = await saveItemAction(preparePostData(newData), newData.id)
            const dataUpdate = [...items]
            const index = oldData.tableData.id
            dataUpdate[index] = updatedItem
            setItems(dataUpdate)
            resolve()
        } catch (e) {
            setError(ERRORS.DEFAULT)
            reject()
        }
    }

    const onDelete = async (oldData, resolve, reject) => {
        try {
            await deleteItemAction(oldData.id)
            setItems(items.filter(i => i.id !== oldData.id))
            resolve()
        } catch (e) {
            setError(ERRORS.DEFAULT)
            reject()
        }
    }

    const preparePostData = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key]) formData.append(key, data[key])
        })
        return formData
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
                    title="Товари"
                    data={items}
                    columns={columns}
                    onAdd={onAdd}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            </BodyContainer>
        </>
    );
}

export default Items;
