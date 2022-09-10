import React from "react";

import { PaginationArrowProps } from "./Assets.types";

export default function ArrowRight({
  paginationArrowColor = "black",
}: PaginationArrowProps) {
  return (
    <svg
      width="21"
      height="24"
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.0607 13.0607C20.6464 12.4749 20.6464 11.5251 20.0607 10.9393L10.5147 1.3934C9.92893 0.807612 8.97918 0.807612 8.3934 1.3934C7.80761 1.97918 7.80761 2.92893 8.3934 3.51472L16.8787 12L8.3934 20.4853C7.80761 21.0711 7.80761 22.0208 8.3934 22.6066C8.97918 23.1924 9.92893 23.1924 10.5147 22.6066L20.0607 13.0607ZM0 13.5H19V10.5H0V13.5Z"
        fill={paginationArrowColor}
      />
    </svg>
  );
}
