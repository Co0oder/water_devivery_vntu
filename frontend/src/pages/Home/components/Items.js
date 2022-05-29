import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ColorBlock from "../styled/ColorBlock";
import ItemCard from "./ItemCard";
import {countItemsToShow} from "../../../helpers/widthHelper"
import WaveWrap from "../styled/WaveWrap";
import WaveContainer from "../styled/WaveContainer";

export default function Items({ items, addItemToBasket }) {
    const [settings, setSettings] = useState({
        className: 'center',
        // autoplay: true,
        dots: true,
        slide: true,
        infinite: true,
        speed: 500,
        slidesToShow: countItemsToShow(),
        slidesToScroll: 1,
    })

    useEffect(() => {
        if (countItemsToShow() > items.length && items.length) {
            console.log(items.length)
            setSettings({...settings, slidesToShow: items.length})
        }
    }, [items])

    return (
        <ColorBlock color="#1C9AB3">
            <div style={{width: '85%', margin: 'auto', padding: '70px 0'}}>
                <Slider {...settings}>
                    {
                        items.map(item => <ItemCard key={item.id} item={item} addItemToBasket={addItemToBasket} />
                        )
                    }
                </Slider>
            </div>
            <WaveContainer>
                <WaveWrap color="#AADAE8">
                    <div /><div />
                </WaveWrap>
            </WaveContainer>
        </ColorBlock>
);
}
