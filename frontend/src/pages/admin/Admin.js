import {useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import AdminContainer from "../../common/styled/containers/AdminContainer";
import Sidebar from "./components/Sidebar";
import Orders from "./Orders/OrdersNew";
import Customers from "./Customers/CistomersNew";
import Items from "./Items/ItemsNew";
import {getFromLocal} from "../../helpers/localStorage";

function Admin() {
    const [showSidebar, setShowSidebar] = useState(false)

    if(!getFromLocal('token')) return <Redirect to='/login' />

    return (
        <>
            <Sidebar toggle={(show) => setShowSidebar(show)} show={showSidebar} />
            <AdminContainer fullWidth={showSidebar}>
                <Switch>
                    <Route path="/admin/orders" component={Orders} />
                    <Route path="/admin/customers" component={Customers} />
                    <Route path="/admin/items" component={Items} />
                    {/*<Route path="/admin/predict" component={Items} />*/}
                </Switch>
            </AdminContainer>
        </>
    );
}

export default Admin;
