import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const LogoSvg = ({ w, h, color, props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={w ?? 74}
    height={h ?? 74}
    fill="none"
    {...props}
  >
    <Path
      fill={color ?? "#710193"}
      d="M0 37C0 16.566 16.566 0 37 0s37 16.566 37 37-16.566 37-37 37S0 57.434 0 37Z"
    />
    <Path
      fill="#fff"
      d="M53.86 18.5H36.09a8.022 8.022 0 0 0 8.022 8.022h3.274v3.16a8.022 8.022 0 0 0 8.017 8.017V20.042c0-.852-.69-1.542-1.542-1.542Z"
    />
    <Path
      fill="#fff"
      d="M45.068 27.354h-17.77a8.022 8.022 0 0 0 8.016 8.017h3.274v3.17a8.022 8.022 0 0 0 8.021 8.012V28.896c0-.852-.69-1.542-1.541-1.542Z"
    />
    <Path
      fill="#fff"
      d="M36.27 36.203H18.5a8.022 8.022 0 0 0 8.022 8.022h3.284v3.16a8.022 8.022 0 0 0 8.006 8.017V37.745c0-.851-.69-1.542-1.542-1.542Z"
    />
  </Svg>
);
