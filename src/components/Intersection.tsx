import { connect } from "react-redux";
import React from "react";

import { SyntheticEvent } from "react";

interface IntersectionOwnProps {
  x: number;
  y: number;
  clickCallback: (x: number, y: number) => void;
}

interface IntersectionStateProps {
  color?: string;
}

interface IntersectionProps
  extends IntersectionOwnProps,
    IntersectionStateProps {}

function Intersection(props: IntersectionProps) {
  const { x, y, clickCallback, color } = props;
  const gap_units = 100;
  const cx = x * gap_units;
  const cy = y * gap_units;
  const r = gap_units / 2.2;
  const colorAttributes: { [index: string]: string | undefined } = {};
  if (color !== undefined) {
    colorAttributes["stroke"] = "black";
    colorAttributes["fill"] = color;
  } else {
    colorAttributes["fill"] = "none";
  }

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    clickCallback(x, y);
  };

  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      {...colorAttributes}
      pointerEvents="visible"
      onClick={handleClick}
    ></circle>
  );
}

const mapStateToProps = (state: any, ownProps: IntersectionProps) => {
  const { x, y } = ownProps;
  return { color: state[x]?.[y] };
};

export default connect(mapStateToProps)(Intersection);
