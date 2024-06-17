import styled from "@emotion/styled";
import { CustomButton } from "../../../../shared/components/Buttons/styles";
import { Swiper } from "swiper/react";

export const Slider = styled(Swiper)`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
`

export const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`

export const PhotoViewImage = styled.img`
    max-height: 100%;
    max-width: 100%;
    object-fit: scale-down;
    overflow: hidden;
    /* display: loading ? "none" : "" */
`

export const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`

export const CloseButton = styled(CustomButton)`
    position:absolute;
    top:2vh;
    right:.5vw;
    z-index:10;
    color: white;
    height: 50px;
`

export const PhotoDescription = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-family: "Inter", sans-serif;
    width: 100%;
    max-height: 30%;
    background: rgba(0,0,0,.5);
    padding: 10px;
    color: white;
    z-index: 9;
    top:2vh;
    left:0;
    font-size: 22px;
    flex-wrap: wrap;
`