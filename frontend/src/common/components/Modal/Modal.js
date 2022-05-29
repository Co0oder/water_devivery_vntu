import React, {useEffect} from "react";
import Close from '@material-ui/icons/CloseRounded';
import IconButton from "@material-ui/core/IconButton";
import {useTransition} from "react-spring";
import {makeStyles} from "@material-ui/core/styles";
import ModalStyled from "./styled/ModalStyled";
import WrapModal from "./styled/WrapModal";
import ModalWrapHide from "./styled/ModalWrapHide";

const useStyles = makeStyles((theme) => ({
    close: {
        zIndex: 100,
        position: "absolute",
        right: 10,
        top: 10,
        '&:hover': {
            color: '#ea6262',
        },
    }
}));

function Modal({ show, onHide, children }) {
    const classes = useStyles();
    const modalContent = useTransition(show, null, {
        from: { transform: `scale(1.5)`, opacity: 0 },
        enter: { transform: `scale(1)`, opacity: 1 },
        leave: { transform: `scale(1.5)`, opacity: 0 },
        unique: true
    })
    const modalWrap = useTransition(show, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        unique: true
    })

    useEffect(() => {
        if(show){
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        }
    })

    return modalWrap.map(({ item, key, props }) =>
        item ? (
            <WrapModal style={props}>
                <ModalWrapHide onClick={onHide}/>
                {modalContent.map(({ item, key, props }) =>
                    item ? (
                        <ModalStyled key={key} style={props}>
                            <IconButton onClick={onHide}
                                        className={classes.close} >
                                <Close />
                            </IconButton>
                            <div>{children}</div>
                        </ModalStyled>
                    ) : null
                )}
            </WrapModal>
        ) : null
    )
}

export default Modal;
