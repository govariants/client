import React from "react";

type GridProps = {
  rows: number;
  columns: number;
};

function Grid(props: GridProps) {
  const { rows, columns } = props;
  const lines = [];
  const gap_units = 100;
  const grid_width = (columns - 1) * gap_units;
  const grid_height = (rows - 1) * gap_units;
  const stroke_attributes = { stroke: "black", strokeWidth: 5 };
  for (let i = 0; i < rows; ++i) {
    const offset = gap_units * i;
    lines.push(
      <line
        key={`line-row-${i + 1}`}
        x1={0}
        x2={grid_width}
        y1={offset}
        y2={offset}
        {...stroke_attributes}
      />
    );
  }
  for (let i = 0; i < columns; ++i) {
    const offset = gap_units * i;
    lines.push(
      <line
        key={`line-column-${i + 1}`}
        x1={offset}
        x2={offset}
        y1={0}
        y2={grid_height}
        {...stroke_attributes}
      />
    );
  }
  return <>{lines}</>;
}

export default Grid;
