import React from "react";

type CoordsProps = {
  rows: number;
  columns: number;
  padding_units: number;
  units: number;
};

function Coords(props: CoordsProps) {
  const { rows, columns, padding_units, units } = props;
  const gap_units = 100;
  const coords_width = 18;
  const coords_height = 30;
  const coords_width_offset = -coords_width / 2;
  const coords_height_offset = coords_height / 2;
  const coords_top_offset = -(units / 2) - padding_units + coords_height_offset;
  const coords_left_offset = -(units / 2) - padding_units + coords_width_offset;
  const coords = [];
  for (let i = 0; i < rows; i++) {
    const offset = gap_units * i;
    coords.push(
      <text
        key={`left-${i}`}
        x={coords_left_offset}
        y={offset + coords_height_offset}
        lengthAdjust="spacingAndGlyphs"
        textLength={coords_width}
        fontSize={coords_height}
        fontFamily="monospace"
      >
        {i + 1}
      </text>
    );
  }
  for (let i = 0; i < columns; i++) {
    const offset = gap_units * i;
    coords.push(
      <text
        key={`top-${i}`}
        x={offset + coords_width_offset}
        y={coords_top_offset}
        lengthAdjust="spacingAndGlyphs"
        textLength={coords_width}
        fontSize={coords_height}
        fontFamily="monospace"
      >
        {String.fromCharCode(i + 65)}
      </text>
    );
  }
  return <>{coords}</>;
}

export default Coords;
