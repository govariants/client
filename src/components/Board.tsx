import { connect } from "react-redux";
import Coords from "./Coords";
import Grid from "./Grid";
import Intersection from "./Intersection";
import { playStone } from "../reducers/boardReducer";
import React from "react";

interface BoardOwnProps {
  rows: number;
  columns: number;
  coords: boolean;
}

interface BoardDispatchProps {
  playStone: any;
}

interface BoardProps extends BoardOwnProps, BoardDispatchProps {}

const Board = (props: BoardProps) => {
  const { rows, columns, coords, playStone } = props;

  const handleIntersectionClick = (x: number, y: number) => {
    playStone({ x: x, y: y, color: "black" });
  };

  const makeIntersection = (x: number, y: number): JSX.Element => (
    <Intersection
      key={`intersection-${x}-${y}`}
      x={x}
      y={y}
      clickCallback={handleIntersectionClick}
    />
  );

  const intersections = [];
  for (let ix = 0; ix < columns; ++ix) {
    for (let iy = 0; iy < rows; ++iy) {
      intersections.push(makeIntersection(ix, iy));
    }
  }

  const grid_width_units = (columns - 1) * 100;
  const grid_height_units = (rows - 1) * 100;
  const coords_units = 100;
  const padding_units = 50;
  const extra_units = padding_units + (coords ? coords_units : 0);
  return (
    <svg
      viewBox={`${-extra_units} ${-extra_units} ${
        grid_width_units + extra_units * 2
      } ${grid_height_units + extra_units * 2}`}
    >
      <Grid rows={rows} columns={columns} />
      <Coords
        rows={rows}
        columns={columns}
        padding_units={padding_units}
        units={coords_units}
      />
      {intersections}
    </svg>
  );
};

const mapDispatchToProps = {
  playStone,
};

export default connect(null, mapDispatchToProps)(Board);
