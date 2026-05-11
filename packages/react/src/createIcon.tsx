import {
  forwardRef,
  createElement,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type SVGProps,
} from "react";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  /** width and height of the SVG. Defaults to "1em" so it scales with font-size. */
  size?: number | string;
}

export type Icon = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

// The icons are filled outline paths on a 1024x1024 grid (as exported from the
// webfont source), so color is controlled via `fill: currentColor` and there is
// no adjustable stroke width.
export function createIcon(displayName: string, pathData: string): Icon {
  const Component = forwardRef<SVGSVGElement, IconProps>(function Icon(
    { size = "1em", ...rest },
    ref
  ) {
    return createElement(
      "svg",
      {
        ref,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024",
        width: size,
        height: size,
        fill: "currentColor",
        "aria-hidden": rest["aria-label"] ? undefined : true,
        focusable: false,
        ...rest,
      },
      createElement("path", { d: pathData })
    );
  });
  Component.displayName = displayName;
  return Component;
}
