import {useState} from "react";
import {Redirect} from "react-router-dom";
import ButtonColor from "../../../common/styled/buttons/ButtonColor";
import TextButton from "../../../common/styled/text/TextButton";

import {loginAction} from "../../../api/admin";
import {setToLocal} from "../../../helpers/localStorage";
import LoginFromContainer from "./styled/LoginFromContainer";
import LoginFromWrap from "./styled/LoginFromWrap";
import LoginFormInput from "./styled/LoginFormInput";

function Login() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const onSubmit = async () => {
        try {
            const { user } = await loginAction({login, password});
            setToLocal({ token: user });
            if (user) {
                setRedirect(true);
            }
        } catch (e) {
            console.error('Login Error: ',  e);
        }
    }

    if(redirect) return <Redirect to='/admin/calls' />

    return (
        <LoginFromContainer>
            <LoginFromWrap>
                <TextButton weight="900" size="28" style={{color: 'black', margin: 'auto'}}>ADMIN</TextButton>
                <LoginFormInput value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логін" />
                <LoginFormInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
                <ButtonColor onClick={onSubmit} color='#F14B26' style={{padding: '15px 30px', margin: '30px 60px 0px 60px'}}>
                    <TextButton weight="500" size="17">Ввійти</TextButton>
                </ButtonColor>
            </LoginFromWrap>
        </LoginFromContainer>
    )
}

export default Login;
