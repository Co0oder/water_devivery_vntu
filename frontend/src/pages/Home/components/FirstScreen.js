import {useSpring} from "react-spring";
import MountainWrapper from "../styled/MountainWrapper";
import mountain from '../../../static/img/mounting_background.svg'
import Header from "../components/Header";
import Container from "../../../common/styled/containers/Container";
import Bottle from "../styled/Bottle";
import TitleText from "../styled/TitleText";
import MainTextWrap from "../styled/MainTextWrap";
import ButtonColor from "../../../common/styled/buttons/ButtonColor";
import TextButton from "../../../common/styled/text/TextButton";
import MainButtonWrap from "../styled/MainButtonWrap";
import Mountain from "../styled/Mountain";
import {i18n, keys} from '../../../i18n';


function Home({itemsCount, fastOrder, showBasketModal, scrollToItems}) {
    const props = useSpring({
        from: { transform: `translate(200%, 0)`, opacity: 0 },
        to: { transform: `translate(5px, 0)`, opacity: 1 },
    })

    return (
        <MountainWrapper>
            <Mountain src={mountain} />
            <Container>
                <Header itemsCount={itemsCount} fastOrder={fastOrder} showBasketModal={showBasketModal} />
                <MainTextWrap style={{'textShadow': '2px 2px 5px rgb(28, 154, 179)'}}>
                    <TitleText style={{textAlign: "start"}} size="70">{i18n.t(keys.topSection.title.first)}<br/>{i18n.t(keys.topSection.title.second)}</TitleText>
                </MainTextWrap>
                <MainButtonWrap>
                    <ButtonColor
                        color='#F14B26' style={{padding: '16px 46px'}}
                        onClick={scrollToItems}
                    >
                        <TextButton size="23">{i18n.t(keys.topSection.orderBtn)}</TextButton>
                    </ButtonColor>
                </MainButtonWrap>
                <Bottle style={props} />
            </Container>
        </MountainWrapper>
    );
}

export default Home;
