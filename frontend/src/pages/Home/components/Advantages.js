import {useRef, useEffect, useState} from "react";
import TitleText from "../styled/TitleText";
import WaveWrap from "../styled/WaveWrap";
import ColorBlock from "../styled/ColorBlock";
import ContainerCenter from "../../../common/styled/containers/ContainerCenter";
import AdvantagesWrap from "../styled/AdvantagesWrap";
import AdvantageCard from "../styled/AdvantageCard";
import AdvantgeIcon_1 from "../styled/AdvantgeIcon_1";
import AdvantgeIcon_2 from "../styled/AdvantgeIcon_2";
import AdvantgeIcon_3 from "../styled/AdvantgeIcon_3";
import AdvantageText from "../styled/AdvantageText";
import {useSpring} from "react-spring";
import WaveContainer from "../styled/WaveContainer";
import { i18n, keys} from "../../../i18n"

function Advantages() {
    const [showAnimation, setShowAnimation] = useState(false)
    const props = useSpring({
        from: { transform: `translate(-100%, 0)`, opacity: 0 },
        to: async (next) => {
            await next({
                transform: showAnimation ? `translate(5px, 0)` : `translate(-100%, 0)`,
                opacity: showAnimation ? 1 : 0
            })
            await next({
                transform: showAnimation ? `translate(0, 0)` : `translate(-100%, 0)`,
                opacity: showAnimation ? 1 : 0
            })
        },
    })
    const advantages = useRef(null)

    const isAdvantagesVisible = () => {
        const position = advantages.current.getBoundingClientRect();
        if(position.top < window.innerHeight-300 && position.bottom >= 0) {
            setShowAnimation(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', isAdvantagesVisible)

        return () => {
            window.removeEventListener('scroll', isAdvantagesVisible)
        }
    })

    return (
        <ColorBlock color="#AADAE8">
            <ContainerCenter>
                <TitleText color='black'>{i18n.t(keys.advantages.title.first)}</TitleText>
                <TitleText color='black'>{i18n.t(keys.advantages.title.second)}</TitleText>
                <AdvantagesWrap ref={advantages} style={props}>
                    <AdvantageCard>
                        <AdvantgeIcon_1 />
                        <AdvantageText>
                            <p>{i18n.t(keys.advantages.one.p1)}</p>
                            <p>{'\u00A0'}<span>{i18n.t(keys.advantages.one.p2)}</span>{'\u00A0'}</p>
                            <p>{i18n.t(keys.advantages.one.p3)}</p>
                            <p>{i18n.t(keys.advantages.one.p4)}{'\u00A0'}<span>{i18n.t(keys.advantages.one.p5)}{'\u00A0'}</span></p>
                        </AdvantageText>
                    </AdvantageCard>
                    <AdvantageCard>
                        <AdvantgeIcon_2 />
                        <AdvantageText>
                            <p>{i18n.t(keys.advantages.two.p1)}
                                {'\u00A0'}<span>{i18n.t(keys.advantages.two.p2)}</span>{'\u00A0'}
                                {i18n.t(keys.advantages.two.p3)}</p>{i18n.t(keys.advantages.two.p4)}<p>{i18n.t(keys.advantages.two.p5)}</p>
                            <p>{'\u00A0'}<span>{i18n.t(keys.advantages.two.p6)}{'\u00A0'}</span></p>
                        </AdvantageText>
                    </AdvantageCard>
                    <AdvantageCard>
                        <AdvantgeIcon_3 />
                        <AdvantageText>
                            <p>{i18n.t(keys.advantages.three.p1)}</p><p>{i18n.t(keys.advantages.three.p2)}</p>
                            <p>{'\u00A0'}<span>{i18n.t(keys.advantages.three.p3)}</span>{'\u00A0'}
                            {i18n.t(keys.advantages.three.p4)}</p>
                            <p>{'\u00A0'}<span>{i18n.t(keys.advantages.three.p5)}{'\u00A0'}</span></p>
                        </AdvantageText>
                    </AdvantageCard>
                </AdvantagesWrap>
            </ContainerCenter>
            <WaveContainer>
                <WaveWrap color="#1C9AB3">
                    <div /><div />
                </WaveWrap>
            </WaveContainer>
        </ColorBlock>
    );
}

export default Advantages;
