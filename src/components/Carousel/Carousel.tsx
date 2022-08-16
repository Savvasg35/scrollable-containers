import React, { FC } from "react";
import styled from "styled-components";

import { CarouselProps } from "./Carousel.types";

const StyledCarousel = styled.ul<CarouselProps>`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  list-style: none;
  width: ${({ width, fullWidth }) => width || (fullWidth ? "100vw" : "600px")};
  height: ${({ height, fullHeight }) =>
    height || (fullHeight ? "100vh" : "600px")};
  overflow: auto;
  scroll-snap-type: x mandatory;

  & > * {
    display: grid;
    place-items: center;
    color: white;
    font-size: 3rem;

    aspect-ratio: 2/1;
    width: 100%;
    flex-shrink: 0;
    scroll-snap-align: start;
  }

  & > *:nth-child(odd) {
    background-color: salmon;
  }

  & > *:nth-child(even) {
    background-color: rebeccapurple;
  }
`;

export const Carousel: FC<CarouselProps> = ({ children, ...rest }) => {
  return <StyledCarousel {...rest}>{children}</StyledCarousel>;
};
