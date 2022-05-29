import {useSpring} from "react-spring";
import TitleText from "../styled/TitleText";
import WaveWrap from "../styled/WaveWrap";
import ColorBlock from "../styled/ColorBlock";
import ContainerCenter from "../../../common/styled/containers/ContainerCenter";
import Row from "../styled/Row";
import Drop from "../styled/Drop";
import StepTextWrap from "../styled/StepTextWrap";
import Text from "../styled/Text";
import WaveContainer from "../styled/WaveContainer";
import IconWrapper from "../styled/IconWrapper";

import { ReactComponent as PhoneIcon } from '../../../static/img/phone.svg'
import { ReactComponent as SendIcon } from '../../../static/img/send.svg'
import { ReactComponent as LaptopIcon } from '../../../static/img/laptop.svg'
import { ReactComponent as CarIcon } from '../../../static/img/car.svg'
import { ReactComponent as AlarmIcon } from '../../../static/img/alarm.svg'
import { ReactComponent as HomeIcon } from '../../../static/img/home.svg'
import { ReactComponent as WalletIcon } from '../../../static/img/wallet.svg'
import { ReactComponent as CardIcon } from '../../../static/img/card.svg'
import IconWithTextWrap from "../styled/IconWithTextWrap";

import {i18n, keys} from '../../../i18n';

const iconStyles = {
    width: '35px',
    height: '35px',
}

function Home() {
    const props = useSpring({
        config: { duration: 1500 },
        number: 40,
        from: { number: 1 },
        immediate: true,
    })

    return (
        <ColorBlock color="#AADAE8">
            <ContainerCenter>
                <TitleText color='black' >{i18n.t(keys.threeSteps.title)}</TitleText>
                <Row>
                    <Drop />
                    <StepTextWrap>
                        <TitleText>{i18n.t(keys.threeSteps.one.title)}</TitleText>
                        <Text>{i18n.t(keys.threeSteps.one.subtitle)}</Text>
                        <IconWrapper>
                            <PhoneIcon style={iconStyles}/>
                            <SendIcon style={iconStyles}/>
                            <LaptopIcon style={iconStyles}/>
                        </IconWrapper>
                    </StepTextWrap>
                </Row>
                <Row>
                    <Drop />
                    <StepTextWrap>
                        <TitleText>{i18n.t(keys.threeSteps.two.title)}</TitleText>
                        <Text>{i18n.t(keys.threeSteps.two.subtitle)}</Text>
                        <IconWrapper>
                            <CarIcon style={iconStyles}/>
                            <AlarmIcon style={iconStyles}/>
                            <HomeIcon style={iconStyles}/>
                        </IconWrapper>
                    </StepTextWrap>
                </Row>
                <Row>
                    <Drop />
                    <StepTextWrap>
                        <TitleText>{i18n.t(keys.threeSteps.three.title)}</TitleText>
                        <Text>{i18n.t(keys.threeSteps.three.subtitle)}</Text>
                        <IconWrapper>
                            <IconWithTextWrap>
                                <WalletIcon style={iconStyles}/>
                                <Text size={20}>{i18n.t(keys.threeSteps.three.cash)}</Text>
                            </IconWithTextWrap>
                            <IconWithTextWrap>
                                <CardIcon style={iconStyles}/>
                                <Text size={20}>{i18n.t(keys.threeSteps.three.nonCash)}</Text>
                            </IconWithTextWrap>
                        </IconWrapper>
                    </StepTextWrap>
                </Row>
            </ContainerCenter>
            <WaveContainer>
                <WaveWrap color="#1C9AB3">
                    <div /><div />
                </WaveWrap>
            </WaveContainer>
        </ColorBlock>
    );
}

export default Home;
