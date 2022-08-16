import React from "react";
import { Story, Meta } from "@storybook/react";

import { Carousel } from "../components/Carousel";
import { CarouselProps } from "../components/Carousel/Carousel.types";

import "./Carousel.css";

export default {
  component: Carousel,
} as Meta<typeof Carousel>;

export const Primary: Story<CarouselProps> = (args) => {
  return (
    <Carousel {...args} className="carousel">
      <li>2</li>
    </Carousel>
  );
};

export const Secondary: Story<CarouselProps> = (args) => (
  <Carousel {...args}>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </Carousel>
);
