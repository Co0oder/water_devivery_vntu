import {useState, useEffect} from "react";
import OrdersTable from "./components/OrdersTable";
import {getOrders, sendOrderData} from "../../../api/orders";
import {COUNT_ITEMS_ON_PAGE} from "../../../constants/default";
import PaginationTable from "../../../common/components/Pagination/Pagination";
import {BodyContainer, FooterContainer, HeaderContainer} from "../../../common/styled/containers/AdminContainer";
import Button from '@material-ui/core/Button';
import urls from '../../../api/urls/urls'
import Table from "./components/Table";

function Orders() {
    const [orders, setOrders] = useState([])
    const [ordersOnShow, setOrdersOnShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [countPages, setCountPages] = useState(1);

    useEffect(() => {
        const getData = async () => {
            try {
                const {data} = await getOrders()
                setOrders(data)
            } catch (e) {
                console.error(e)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        setOrdersOnShow(getRoomsByPage(currentPage));
        setCountPages(getCountPages());
    }, [orders])

    const onAddOrder = () => {
        if ((orders[0] && orders[0].type !== 'add') || !orders.length) {
            setOrders([{id: Math.random(), type: 'add'}, ...orders])
        }
    }

    const onEditOrder = (id) => {
        const a = ordersOnShow.map(order => {
            if (order.id === id) return {...order, type: 'edit'}
            return order
        })
        setOrdersOnShow(a)
    }

    const onSave = async (order) => {
        try {
            const {errors} = await sendOrderData(order)
            if (errors) return
            setOrders([order, ...orders])
        } catch (e) {
            console.error('Sending Order Error: ', e)
        }
    }

    const onCancel = (id) => {
        if (id) {
            const a = ordersOnShow.map(order => {
                if (order.id === id) {
                    const newOrder = {...order}
                    delete newOrder.type
                    return newOrder
                }
                return order
            })
            setOrdersOnShow(a)
        } else if (orders[0] && (orders[0].type === 'add' || orders[0].type === 'edit')) {
            const [first, ...last] = orders
            setOrders(last)
        }
    }

    const getRoomsByPage = (pageNumber) => {
        return orders.filter((_, i) => (i >= (pageNumber-1)*COUNT_ITEMS_ON_PAGE && i < pageNumber*COUNT_ITEMS_ON_PAGE))
    }

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setOrdersOnShow(getRoomsByPage(pageNumber));
    }

    const getCountPages = () => {
        return Math.ceil(orders.length/COUNT_ITEMS_ON_PAGE)
    }

    return (
        <>
            <HeaderContainer>
                <Button style={{margin: '10px'}} onClick={onAddOrder} variant="contained" color="primary">Додати замовлення</Button>
                <Button style={{margin: '10px'}} variant="contained" color="primary" href={`${urls.orders}/pdf`}>Замовлення</Button>
                <Button style={{margin: '10px'}} variant="contained" color="primary" href={`${urls.history}/pdf`}>Передбачення</Button>
            </HeaderContainer>
            <BodyContainer>
                {/*<OrdersTable*/}
                {/*    orders={ordersOnShow}*/}
                {/*    onSave={onSave}*/}
                {/*    onCancel={onCancel}*/}
                {/*    onEdit={onEditOrder}/>*/}
                <Table data={orders} />
            </BodyContainer>
            <FooterContainer>
                {/*<PaginationTable countPages={countPages} currentPage={currentPage} onPageChange={onPageChange}/>*/}
            </FooterContainer>
        </>
    );
}

export default Orders;
