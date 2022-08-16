import { ReactElement } from "react";
export interface CarouselProps {
  children: ReactElement[] | ReactElement;
  fullWidth?: boolean;
  fullHeight?: boolean;
  width?: string;
  height?: string;
  className?: string;
  vertical?: boolean;
  horizontal?: boolean;
  disableListDefaultStyles?: boolean;
}
