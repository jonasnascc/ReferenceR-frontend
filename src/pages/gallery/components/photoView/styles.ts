import styled from "@emotion/styled";

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

export const SwiperContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`