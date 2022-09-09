import { Link, useLocation, useHistory } from "react-router-dom";
import ShoppingCart from '@material-ui/icons/ShoppingCartRounded'
import SidebarStyled from "../styled/SidebarStyled";
import SidebarHeader from "../styled/SidebarHeader";
import SidebarTitle from "../styled/SidebarTitle";
import SidebarMenu from "../styled/SidebarMenu";
import { logoutAction } from "../../../api/admin"

import SidebarLink from "../styled/SidebarLink";
import { ReactComponent as HomeIcon } from '../../../static/img/admin/home.svg'
import { ReactComponent as CallIcon } from '../../../static/img/admin/call.svg'
import { ReactComponent as OrderIcon } from '../../../static/img/admin/order.svg'
import { ReactComponent as UsersIcon } from '../../../static/img/admin/users.svg'
import { ReactComponent as ExitIcon } from '../../../static/img/admin/exit.svg'

import { ReactComponent as AlarmIcon } from '../../../static/img/admin/alarm.svg'
import { ReactComponent as ArrowIcon } from '../../../static/img/admin/arrow.svg'

const iconStyles = {
    width: '35px',
    height: '35px',
    paddingRight: '15px',
    color: 'white'
}

const iconArrowStyles = {
    width: '35px',
    height: '35px',
    cursor: 'pointer',
    transition: '0.5s'
}

const SidebarData = [
    {
        title: 'Сайт',
        path: '/',
        icon: <HomeIcon style={iconStyles}/>
    },
    {
        title: 'Замовлення',
        path: '/admin/orders',
        icon: <OrderIcon style={iconStyles}/>
    },
    {
        title: 'Клієнти',
        path: '/admin/customers',
        icon: <UsersIcon style={iconStyles}/>
    },
    {
        title: 'Ймовірні замовлення',
        path: '/admin/predict',
        icon: <AlarmIcon style={iconStyles}/>
    },
    {
        title: 'Товари',
        path: '/admin/items',
        icon: <ShoppingCart style={iconStyles}/>
    },
    {
        title: 'Вихід',
        path: '#',
        icon: <ExitIcon style={iconStyles}/>
    }
]

function Sidebar({toggle, show}) {
    const location = useLocation()

    return (
        <SidebarStyled open={show}>
            <SidebarHeader>
                { show && <span>ADMIN PANEL</span>}
                <ArrowIcon
                    style={{
                            ...iconArrowStyles,
                            transform: `${show ? 'rotate(0deg)' : 'rotate(180deg)'}`
                    }}
                    onClick={() => toggle(!show)} />
            </SidebarHeader>
            { show && <SidebarTitle>VODA</SidebarTitle>}
            <SidebarMenu open={show}>
                {
                    SidebarData.map( (item, index) => {
                        return (
                            <Link key={index} to={item.path} onClick={item.path === '#' ? () => logout() : null}>
                                <SidebarLink open={show} active={location.pathname === item.path}>
                                    {item.icon}
                                    { show && <span>{item.title}</span> }
                                </SidebarLink>
                            </Link>
                        )
                    })
                }
            </SidebarMenu>
        </SidebarStyled>
    );
}

async function logout(locATION) {
    await logoutAction();
    window.location.reload(false);
}

export default Sidebar;
