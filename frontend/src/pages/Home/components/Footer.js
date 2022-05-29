import ColorBlock from "../styled/ColorBlock";
import ContainerCenter from "../../../common/styled/containers/ContainerCenter";
import RowCenter from "../styled/RowCenter";
import Logo from "../styled/Logo";
import RowBetween from "../styled/RowFooter";
import TextButton from "../../../common/styled/text/TextButton";
import { ReactComponent as Instagram } from '../../../static/img/instagram.svg'
import Facebook from "@material-ui/icons/Facebook";
import Email from "@material-ui/icons/Email";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    icon: {
        color: "white",
        fontSize: '30px'
    },
    inst: {
        color: "white",
        fill: "white",
        width: '55px',
        height: '55px'
    }
}));

function Action() {
    const classes = useStyles();

    return (
        <ColorBlock color="#006d8e">
            <ContainerCenter>
                <RowCenter>
                    <Logo href="/" />
                </RowCenter>
                <br/><br/><br/>
                <RowBetween style={{alignItems: 'center', maxWidth: '1000px'}}>
                    <a href='/'>
                        <TextButton size='16'>Каталог товарів</TextButton>
                    </a>
                    <a href=''>
                        <TextButton size='16'>Про воду</TextButton>
                    </a>
                    <a href=''>
                        <TextButton size='16'>Контакти</TextButton>
                    </a>
                    <TextButton size='16'>Слідкуй за нами в соцмережах</TextButton>
                    <RowCenter>
                        <IconButton href="https://www.facebook.com/zdorova.voda.vinn/"
                                    className={classes.icon} aria-label="delete">
                            <Facebook className={classes.icon} />
                        </IconButton>
                        <IconButton href="mailto:zdorova.voda.vinn@gmail.com"
                                    className={classes.icon} aria-label="delete">
                            <Email className={classes.icon} />
                        </IconButton>
                        <IconButton href="https://www.instagram.com/zdorova.voda.vin/"
                                    className={classes.inst} aria-label="delete">
                            <Instagram />
                        </IconButton>
                    </RowCenter>
                </RowBetween>
                <br/><br/><br/><br/>
            </ContainerCenter>
        </ColorBlock>
    );
}

export default Action;
