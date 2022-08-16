import React, {
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
} from "react";
import styled from "styled-components";

import { CarouselProps } from "./Carousel.types";

const StyledCarousel = styled.ul<CarouselProps>`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${({ vertical }) => vertical && "column"};
  list-style: none;
  width: ${({ width, fullWidth }) => width || (fullWidth && "100vw")};
  height: ${({ height, fullHeight }) =>
    height || (fullHeight ? "100vh" : "200px")};
  overflow: auto;
  scroll-snap-type: ${({ vertical }) =>
    vertical ? "y mandatory" : "x mandatory"};

  & > * {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    scroll-snap-align: center;
  }

  & > *:nth-child(odd) {
    background-color: ${({ disableListDefaultStyles }) =>
      !disableListDefaultStyles && "salmon"};
  }

  & > *:nth-child(even) {
    background-color: ${({ disableListDefaultStyles }) =>
      !disableListDefaultStyles && "rebeccapurple"};
  }
`;

export function Carousel({
  children,
  horizontal = true,
  vertical = false,
  disableListDefaultStyles = true,
  ...rest
}: CarouselProps) {
  const updatedChildren = childrenWithProps(children);

  return (
    <StyledCarousel
      disableListDefaultStyles={disableListDefaultStyles}
      vertical={vertical}
      horizontal={horizontal}
      {...rest}
    >
      {updatedChildren}
    </StyledCarousel>
  );
}

function childrenWithProps(children: ReactElement | ReactElement[]) {
  return Children.map(
    children,
    (child: ReactElement<{ id: string }>, index) => {
      if (isValidElement(child)) {
        return cloneElement(child, { id: `carousel-${index}` });
      }

      return child;
    }
  );
}
