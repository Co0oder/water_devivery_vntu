import {useRef, useEffect, useState} from "react";
import {useSpring} from "react-spring";
import TitleText from "../styled/TitleText";
import TextButton from "../../../common/styled/text/TextButton";
import WaveWrap from "../styled/WaveWrap";
import Counter from "../styled/Counter";
import ColorBlock from "../styled/ColorBlock";
import TelInput from "../styled/TelInput";
import TelFormWrap from "../styled/TelFormWrap";
import TelFormBtn from "../styled/TelFormBtn";
import ContainerCenter from "../../../common/styled/containers/ContainerCenter";
import SubtitleTextWrap from "../styled/SubtitleTextWrap";
import WaveContainer from "../styled/WaveContainer";
import {i18n, keys} from '../../../i18n';
import ButtonColor from "../../../common/styled/buttons/ButtonColor";

function Action({twoBottleAction}) {
    const [animateCounter, setAnimateCounter] = useState(false)
    const props = useSpring({
        config: { duration: 1000 },
        number: animateCounter ? 35 : 1,
        from: { number: 1 },
    })
    const counter = useRef(null)

    const isCounterVisible = () => {
        const position = counter.current.getBoundingClientRect();
        if(position.top >= 0 && position.bottom <= window.innerHeight) {
            setAnimateCounter(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', isCounterVisible)

        return () => {
            window.removeEventListener('scroll', isCounterVisible)
        }
    })

    return (
        <>
        <SubtitleTextWrap style={{marginTop: '100px'}}>
        <TitleText color='black'>{i18n.t(keys.actionSection.title.first)}</TitleText>
        <TitleText color='black'>{i18n.t(keys.actionSection.title.second)}</TitleText>
        </SubtitleTextWrap>
        <WaveContainer>
            <WaveWrap>
                <div /><div />
            </WaveWrap>
        </WaveContainer>
        <ColorBlock>
            <ContainerCenter>
                <Counter ref={counter}>{props.number.interpolate(val => (+val).toFixed(0))}</Counter>
                <TitleText color='black' size='20'>{i18n.t(keys.actionSection.title2)}</TitleText>
                <TelFormWrap>
                    <ButtonColor
                        color='#F14B26' style={{padding: '16px 46px'}}
                        onClick={twoBottleAction}
                    >
                        <TextButton size="23">{i18n.t(keys.actionSection.button)}</TextButton>
                    </ButtonColor>
                </TelFormWrap>
                <TitleText color='black' size='20'>
                {i18n.t(keys.actionSection.title3)}
                </TitleText>
            </ContainerCenter>
            <WaveContainer>
                <WaveWrap color="#AADAE8">
                    <div /><div />
                </WaveWrap>
            </WaveContainer>
        </ColorBlock>
        </>
    );
}

export default Action;
