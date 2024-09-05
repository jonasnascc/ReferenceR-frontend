import styled from "@emotion/styled";

export const SwiperContainer = styled.div<{countFooter?:boolean}>`
    display:flex;
    width: 100%;
    height: ${props => props.countFooter ? "calc(100% - 50px)" : "100%"};
`

export const SlideContent = styled.div`
    height: 100%;
    width: 100%;
`

export const SlideImage = styled.img`
    max-width: 100%;
    max-height: 90vh;
    display: block;
    object-fit: cover;
`