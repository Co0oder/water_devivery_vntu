import {useEffect, useState} from 'react'
import {Element, scroller} from 'react-scroll';
import keyBy from "lodash/keyBy";
import sortBy from "lodash/sortBy";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import ThreeSteps from "./components/ThreeSteps";
import Advantages from "./components/Advantages";
import FeedbackModal from "./components/FeedbakModal";
import Action from "./components/Action";
import Items from "./components/Items";
import FirstScreen from "./components/FirstScreen";
import MainFormModal from "./components/MainFormModal";
import BasketModal from "./components/BasketModal";
import {getItemsAction} from "../../api/items";
import {
    addToBasket, deleteFromBasket, getItemsFromBasket, deleteAllFromBasket
} from "../../helpers/basketHelper";
import {saveOrderAction} from "../../api/orders";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
const useStyles = makeStyles((theme) => ({
    alert: {
        borderRadius: '30px'
    },
}));

function Alert(props) {
    const classes = useStyles();
    return <MuiAlert className={classes.alert} elevation={6} variant="filled" {...props} />;
}

function Home() {
    const WATER_ID = 1
    const [items, setItems] = useState({})
    const [itemsInBasket, setItemsInBasket] = useState([])
    const [showFeedbackModal, setShowFeedbackModal] = useState(false)
    const [showMainFormModal, setShowMainFormModal] = useState(false)
    const [showBasketModal, setShowBasketModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState('')

    useEffect(() => {
        getItemsAction().then(data => {
            const itemsObj = keyBy(data, 'id')
            setItems(itemsObj)
            setItemsInBasket(getItemsFromBasket().map(id => {
                if (itemsObj[id]) {
                    return { ...itemsObj[id], count: 1 }
                } else {
                    deleteFromBasket(id)
                }
            }).filter(i => i))
        })
    }, [])

    const addItemToBasket = (id) => {
        if (!itemsInBasket.some(item => item.id === id)) {
            setItemsInBasket([...itemsInBasket, { ...items[id], count: 1 }])
            addToBasket(id)
            setShowSuccessModal('Товар успішно додано')
        } else {
            setShowSuccessModal('Товар вже додано в корзину')
        }
    }

    const changeCounter = (index, type) => {
        let itemsCopy = [...itemsInBasket];
        if (type === 'reduce' && itemsCopy[index].count > 1) {
            itemsCopy[index].count -= 1
        } else if (type === 'delete') {
            const id = itemsCopy[index].id;
            itemsCopy = itemsInBasket.filter(item => item.id !== id)
            deleteFromBasket(id)
        } else if (type === 'increase') {
            itemsCopy[index].count += 1
        }
        setItemsInBasket(itemsCopy)
    }

    const submitBasket = () => {
        setShowBasketModal(false)
        setTimeout(() => {
            setShowMainFormModal(true)
        }, 0)
    }

    const sendOrder = async (clientData) => {
        try {
            await saveOrderAction({
                ...clientData,
                items: itemsInBasket.map(({ title, count }) => `${title} (${count})`),
                price: itemsInBasket.reduce((acc, item) => acc + (item.price * item.count), 0),
            })
        } catch (e) {
            console.log('sendOrder --> ', e);
        }
        setItemsInBasket([])
        deleteAllFromBasket()
    }

    const fastOrder = () => {
        if (!itemsInBasket.some(item => item.id === WATER_ID)) {
            setItemsInBasket([...itemsInBasket, { ...items[WATER_ID], count: 1 }])
            addToBasket(WATER_ID)
        }
        setShowBasketModal(true)
    }

    const fiveBottleAction = () => {
        if (!itemsInBasket.some(item => item.id === WATER_ID)) {
            setItemsInBasket([...itemsInBasket, { ...items[WATER_ID], count: 5 }])
            addToBasket(WATER_ID)
        }
        setShowBasketModal(true)
    }

    const scrollToItems = () => {
        scroller.scrollTo('items', {
            duration: 1000,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }
    return (
        <>
            <FirstScreen
                itemsCount={itemsInBasket.length}
                fastOrder={fastOrder}
                showBasketModal={() => setShowBasketModal(true)}
                scrollToItems={scrollToItems}
            />
            <Action twoBottleAction={fiveBottleAction} />
            <Advantages />
            <Element name="items">
                <Items items={sortBy(Object.values(items), i => i.order)} addItemToBasket={addItemToBasket}/>
            </Element>
            <ThreeSteps />
            <Reviews />
            <Footer />
            <FeedbackModal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)}/>
            <MainFormModal show={showMainFormModal} sendOrder={sendOrder}
                           onHide={() => setShowMainFormModal(false)} />
            <BasketModal itemsInBasket={itemsInBasket} changeCounter={changeCounter} submitBasket={submitBasket}
                         show={showBasketModal} onHide={() => setShowBasketModal(false)} />


            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                open={!!showSuccessModal}
                onClose={() => setShowSuccessModal('')}
            >
                <Alert onClose={() => setShowSuccessModal('')} severity="success">
                    {showSuccessModal}
                </Alert>
            </Snackbar>

        </>
    )
};

export default Home;
