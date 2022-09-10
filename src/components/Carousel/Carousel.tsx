import React, {
  useRef,
  useState,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
  useEffect,
} from "react";
import styled from "styled-components";
import { ArrowLeft, ArrowRight } from "@styled-icons/fa-solid";

import { CarouselProps, PaginationArrowProps } from "./Carousel.types";

const StyledArrowLeft = styled(ArrowLeft)<PaginationArrowProps>`
  width: 20px;
  height: 20px;
  color: ${({ paginationArrowColor }) => paginationArrowColor || "black"};
`;
const StyledArrowRight = styled(ArrowRight)<PaginationArrowProps>`
  height: 20px;
  width: 20px;
  color: ${({ paginationArrowColor }) => paginationArrowColor || "black"};
`;

const StyledCarousel = styled.ul<CarouselProps>`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${({ vertical }) => vertical && "column"};
  list-style: none;
  width: ${({ width, fullWidth }) => width || (fullWidth && "100%")};
  height: ${({ height, fullHeight }) =>
    height || (fullHeight ? "100%" : "200px")};
  overflow: auto;
  scroll-snap-type: ${({ vertical }) =>
    vertical ? "y mandatory" : "x mandatory"};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

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

const StyledWrapper = styled.div<CarouselProps>`
  width: ${({ width, fullWidth }) => width || (fullWidth && "100%")};
  height: ${({ height, fullHeight }) =>
    height || (fullHeight ? "100%" : "200px")};
  position: relative;
`;

const StyledNextButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

const StyledBackButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

export function Carousel({
  children,
  horizontal = true,
  vertical = false,
  disableListDefaultStyles = true,
  pagination = true,
  paginationArrowColor,
  ...rest
}: CarouselProps) {
  const slidesRef = useRef<{
    [id: string]: HTMLInputElement;
  }>({});
  const updatedChildren = childrenWithProps(children, slidesRef);
  const [currentSlide, setCurrentSlide] = useState({ id: 0 });

  function handleNext() {
    const currentSlideId = getCurrentSlideId(slidesRef);
    setCurrentSlide((prev) => {
      const selectedId = getSelectedId(prev.id, currentSlideId);
      if (selectedId === updatedChildren.length - 1) return { ...prev, id: 0 };

      return { id: selectedId + 1 };
    });
  }

  function handleBack() {
    const currentSlideId = getCurrentSlideId(slidesRef);
    setCurrentSlide((prev) => {
      const selectedId = getSelectedId(prev.id, currentSlideId);
      if (selectedId === 0) return { ...prev, id: updatedChildren.length - 1 };

      return { id: selectedId - 1 };
    });
  }

  useEffect(() => {
    if (pagination && !vertical) {
      slidesRef.current[`carousel-${currentSlide.id}`].scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentSlide]);

  return (
    <StyledWrapper {...rest}>
      <>
        <StyledCarousel
          disableListDefaultStyles={disableListDefaultStyles}
          vertical={vertical}
          horizontal={horizontal}
          {...rest}
        >
          {updatedChildren}
        </StyledCarousel>

        {pagination && !vertical && (
          <>
            <StyledBackButton onClick={handleBack}>
              <StyledArrowLeft paginationArrowColor={paginationArrowColor} />
            </StyledBackButton>
            <StyledNextButton onClick={handleNext}>
              <StyledArrowRight paginationArrowColor={paginationArrowColor} />
            </StyledNextButton>
          </>
        )}
      </>
    </StyledWrapper>
  );
}

function childrenWithProps(
  children: ReactElement | ReactElement[],
  slidesRef: React.MutableRefObject<{
    [id: string]: HTMLInputElement;
  }>
) {
  return Children.map(
    children,
    (child: ReactElement<{ id: string; ref: (ref: any) => void }>, index) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          id: `carousel-${index}`,
          ref: (node: HTMLInputElement) => {
            slidesRef.current[`carousel-${index}`] = node;
          },
        });
      }

      return child;
    }
  );
}

// This function will return true or false if an element is or isn't
// in viewport, that will help us to select only the element that is
// currently selected in the slider.
function isInViewport(element: HTMLInputElement) {
  const rect = element.getBoundingClientRect();

  return (
    rect.left >= 0 &&
    rect.bottom <= document.documentElement.clientHeight &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Since now user can change slides through pagination and also mouse scrolling
// we needed a solution in order to get the current slide in case user navigates with mouse scrolling and at some point
// starts to use pagination. That is the purpose of the function below
function getCurrentSlideId(
  slidesRef: React.MutableRefObject<{
    [id: string]: HTMLInputElement;
  }>
) {
  for (const [key, node] of Object.entries(slidesRef.current)) {
    if (isInViewport(node)) return Number(key.split("-")[1]);
  }

  return 0;
}

// This function helps us to ensure that the correct slide id is being used to calculate
// the next slide
function getSelectedId(stateId: number, currentSlideId: number) {
  if (stateId !== currentSlideId) return currentSlideId;

  return stateId;
}
