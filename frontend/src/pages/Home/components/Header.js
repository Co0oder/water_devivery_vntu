import HeaderLanding from "../styled/HeaderLanding";
import Logo from "../styled/Logo";
import ButtonColor from "../../../common/styled/buttons/ButtonColor";
import TextButton from "../../../common/styled/text/TextButton";
import PhoneWrap from "../styled/PhoneWrap";
import Basket from '@material-ui/icons/ShoppingBasketRounded';
import Phone from '@material-ui/icons/PhoneInTalkRounded';
import isMobile from "../../../helpers/isMobileHelper";
import {i18n, keys} from '../../../i18n';
import PhoneText from "../../../common/styled/text/PhoneText";
import {makeStyles} from "@material-ui/core/styles";
import {Badge, withStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    icon: {
        color: "white",
        cursor: "pointer",
        fontSize: 40,
        '&:hover': {
            color: '#d9d9d9',
        },
    }
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        top: '8px',
        right: '4px',
    },
}))(Badge);

function Header({itemsCount, fastOrder, showBasketModal}) {
    const classes = useStyles();
    return (
        <HeaderLanding>
            <Logo href="/" />
            <ButtonColor color='#F14B26' onClick={fastOrder}>
                <TextButton size='16'>{i18n.t(keys.topSection.callBtn)}</TextButton>
            </ButtonColor>
            <PhoneWrap>
                <a href="tel:+38093000833">
                    <Phone className={classes.icon} />
                </a>
                <PhoneText size="18" href="tel:+38093000833">{!isMobile() ? `093000833` : ''}</PhoneText>
            </PhoneWrap>
            <PhoneWrap>
                <a href="tel:+380432526526">
                    <Phone className={classes.icon} />
                </a>
                <PhoneText size="18" href="tel:+380432526526">{!isMobile() ? `0432526526` : ''}</PhoneText>
            </PhoneWrap>
            {/*{!isMobile() ? <LanguageSelect /> : null}*/}
            <StyledBadge badgeContent={itemsCount} color="primary">
                <Basket className={classes.icon} onClick={showBasketModal}/>
            </StyledBadge>
        </HeaderLanding>
    );
}

export default Header;
