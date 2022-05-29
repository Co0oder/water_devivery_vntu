import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ColorBlock from "../styled/ColorBlock";
import ReviewCard from "./ReviewCard";
import {countReviewsToShow} from "../../../helpers/widthHelper"
import WaveWrap from "../styled/WaveWrap";
import WaveContainer from "../styled/WaveContainer";
import {getReviews} from "../../../api/reviews";


const reviews = [
    {
        id: 1,
        name: 'Name',
        description: 'Уже дуже давно користуюся послугами цієї компанії.Завжди приємно дивують швидкістю доставки. Пару раз натиснув кнопочки на їх сайті і вода тут як тут. Водій у них завжди охайний та ввічливий.І найголовніше, вода незмінно приємна на смак. Взагалі супер!'
    },
    {
        id: 2,
        name: '',
        description: 'Уже дуже давно користуюся послугами цієї компанії.Завжди приємно дивують швидкістю доставки. Пару раз натиснув кнопочки на їх сайті і вода тут як тут. Водій у них завжди охайний та ввічливий.І найголовніше, вода незмінно приємна на смак. Взагалі супер!'
    },
    {
        id: 3,
        name: '',
        description: 'Уже дуже давно користуюся послугами цієї компанії.Завжди приємно дивують швидкістю доставки. Пару раз натиснув кнопочки на їх сайті і вода тут як тут. Водій у них завжди охайний та ввічливий.І найголовніше, вода незмінно приємна на смак. Взагалі супер!'
    }
]
export default function Reviews() {
    const [reviews, setReviews] = useState([])
    const [settings, setSettings] = useState({
        className: 'center',
        // autoplay: true,
        dots: true,
        slide: true,
        infinite: true,
        speed: 500,
        slidesToShow: countReviewsToShow(),
        slidesToScroll: 1,
    })

    useEffect(() => {
        getReviews().then(({ data }) => {
            setReviews(data)
        })
    }, [])

    useEffect(() => {
        if (countReviewsToShow() > reviews.length && reviews.length) {
            setSettings({...settings, slidesToShow: reviews.length})
        }
    }, [reviews])

    return (
        <ColorBlock color="#1C9AB3">
            <div style={{width: '85%', margin: 'auto', padding: '70px 0'}}>
                <Slider {...settings}>
                    {
                        reviews.map(item => <ReviewCard key={item.id} item={item}/>
                        )
                    }
                </Slider>
            </div>
            <WaveContainer>
                <WaveWrap color="#006d8e">
                    <div /><div />
                </WaveWrap>
            </WaveContainer>
        </ColorBlock>
);
}
