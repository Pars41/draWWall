import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PolylineOutlinedIcon from "@mui/icons-material/PolylineOutlined";
import ToiletImg from "./assets/ToiletWall.gif";

const WallDrawer = () => {
  const [roomWidth, setRoomWidth] = useState("");
  const [roomDepth, setRoomDepth] = useState("");
  const [layout, setLayout] = useState("");
  const [numStalls, setNumStalls] = useState("");
  const [stallDepth, setStallDepth] = useState("");

  const drawWall = () => {
    const wallThickness = 15; // Duvar kalınlığı
    const patternWidth = 20; // Desen genişliği
    const patternHeight = 20; // Desen yüksekliği
    const panel = 5; // Ara panel kalınlığı

    //Colors
    const panelColor = "#DC773F";
    const doorColor = "#9C776F";
    const plasterColor = "#77380F";
    const doorOpeningColor = "#CAAAA5";
    const wallColor = "#ACACAC";

    const numHorizontalPatterns = Math.ceil(roomWidth / patternWidth);
    const numVerticalPatterns = Math.ceil(roomDepth / patternHeight);

    const patterns = [];
    for (let i = 0; i < numVerticalPatterns; i++) {
      for (let j = 0; j < numHorizontalPatterns; j++) {
        const x = j * patternWidth;
        const y = i * patternHeight;
        patterns.push(
          <rect
            key={`${i}-${j}`}
            x={x}
            y={y}
            width={patternWidth}
            height={patternHeight}
            fill={(i + j) % 2 === 0 ? "gray" : "white"}
          />
        );
      }
    }

    const partitionWidth =
      (roomWidth - wallThickness * 2 - (numStalls - 1) * panel) / numStalls;

    const closetWidth = 36;
    const closetHeight = 68;
    console.log(partitionWidth);
    const partitions = [];
    for (let i = 1; i <= numStalls; i++) {
      const partitionX =
        2 * wallThickness + i * partitionWidth + (i - 1) * panel;
      const partitionY = wallThickness * 1.5;
      if (i !== numStalls) {
        partitions.push(
          <g key={`partition-${i}`}>
            <rect
              x={partitionX - wallThickness / 2}
              y={partitionY}
              width={panel}
              height={stallDepth}
              fill={panelColor}
            />
            {/* Adding Plaster */}
            <line
              x1={partitionX - wallThickness}
              y1={partitionY + stallDepth}
              x2={partitionX + wallThickness / 2}
              y2={partitionY + stallDepth}
              stroke={plasterColor}
              strokeWidth={3}
            />
            {/* Adding Doors */}

            <line
              x1={partitionX - partitionWidth + wallThickness / 2}
              y1={partitionY + stallDepth - wallThickness * 1.5}
              x2={partitionX - wallThickness - 3}
              y2={partitionY + stallDepth}
              stroke={doorColor}
              strokeWidth={3}
            />
            {/* Adding Doors Opening */}
            <path
              d={`M ${partitionX - partitionWidth + wallThickness / 2 + 3} ${
                partitionY + stallDepth - wallThickness * 1.5 - 5
              } Q ${partitionX - partitionWidth / 2 - 10} ${
                stallDepth / 1.5 + 10
              } ${partitionX - 15} ${partitionY + stallDepth / 2 + 15}`}
              stroke={doorOpeningColor}
              fill="transparent"
            />
          </g>
        );
      } else {
        partitions.push(
          <>
            <line
              x1={partitionX - partitionWidth + wallThickness / 2}
              y1={partitionY + stallDepth - wallThickness * 1.5}
              x2={partitionX - wallThickness - 3}
              y2={partitionY + stallDepth}
              stroke={doorColor}
              strokeWidth={3}
            />
            <path
              d={`M ${partitionX - partitionWidth + wallThickness / 2 + 3} ${
                partitionY + stallDepth - wallThickness * 1.5 - 5
              } Q ${partitionX - partitionWidth / 2 - 10} ${
                stallDepth / 1.5 + 10
              } ${partitionX - 15} ${partitionY + stallDepth / 2 + 15}`}
              stroke={doorOpeningColor}
              fill="transparent"
            />
          </>
        );
      }
    }

    partitions.push(
      <g key={`first and last plaster`}>
        <line
          x1={wallThickness * 1.5}
          y1={stallDepth + wallThickness * 1.5}
          x2={wallThickness * 2.5}
          y2={stallDepth + wallThickness * 1.5}
          stroke={plasterColor}
          strokeWidth={3}
        />
        <line
          x1={roomWidth - wallThickness}
          y1={stallDepth + wallThickness * 1.5}
          x2={roomWidth - wallThickness / 2}
          y2={stallDepth + wallThickness * 1.5}
          stroke={plasterColor}
          strokeWidth={3}
        />
      </g>
    );

    const UShapeWithPartitions = (
      <g fill={wallColor}>
        <defs>
          <pattern
            id="crossHatch"
            width="10"
            height="10"
            patternTransform="rotate(-45 5 5)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="10"
              y2="0"
              stroke={wallColor}
              strokeWidth="4"
            />
          </pattern>
        </defs>
        <rect
          x={wallThickness / 2}
          y={wallThickness / 2}
          width={roomWidth - wallThickness}
          height={wallThickness}
          fill="url(#crossHatch)"
          stroke={wallColor}
          strokeWidth="4"
        />
        <rect
          x={wallThickness / 2}
          y={wallThickness / 2}
          width={wallThickness}
          height={roomDepth - wallThickness}
          fill="url(#crossHatch)"
          stroke={wallColor}
          strokeWidth="4"
        />
        <rect
          x={roomWidth - wallThickness / 2}
          y={wallThickness / 2}
          width={wallThickness}
          height={roomDepth - wallThickness}
          fill="url(#crossHatch)"
          stroke={wallColor}
          strokeWidth="4"
        />
        {partitions}

        {/* Adding the kolzet image at partition centers */}
        {Array.from({ length: numStalls }).map((_, index) => {
          const partitionX =
            2 * wallThickness + index * partitionWidth + (index - 1) * panel;
          const partitionY = wallThickness * 1.5;

          return (
            <>
              <image
                key={`kolzet-${index}`}
                href={ToiletImg}
                x={
                  partitionX + partitionWidth / 2 - closetWidth / 2 - panel / 2
                }
                y={partitionY}
                width={closetWidth}
                height={closetHeight}
              />
              <polyline
                points={`${partitionX + 3},${
                  partitionY + closetHeight / 2 + wallThickness
                } ${partitionX - 2},${
                  partitionY + closetHeight / 2 + wallThickness - 3
                } ${partitionX + partitionWidth / 4},${
                  partitionY + closetHeight / 2 + wallThickness - 3
                }`}
                fill="none"
                stroke="black"
              />
              <text
                x={
                  partitionX + partitionWidth / 2 - closetWidth / 2 + panel / 2
                }
                y={partitionY + closetHeight / 2 + wallThickness}
                textAnchor="start"
                fill="black"
                fontSize="12px"
              >
                {partitionWidth.toFixed(1)}
              </text>
              <polyline
                points={`${partitionX + partitionWidth - 8},${
                  partitionY + closetHeight / 2 + wallThickness
                } ${partitionX + partitionWidth - panel / 2},${
                  partitionY + closetHeight / 2 + wallThickness - 3
                } ${partitionX + partitionWidth - partitionWidth / 4},${
                  partitionY + closetHeight / 2 + wallThickness - 3
                }`}
                fill="none"
                stroke="black"
              />
            </>
          );
        })}

        {/* Show roomWidth */}
        <text x={roomWidth / 2} y={-8} textAnchor="start" fill="black">
          {roomWidth}
        </text>
        <polyline
          points={`${1.5 * wallThickness},15 ${1.5 * wallThickness},${0} ${
            roomWidth - wallThickness / 2
          },${0} ${roomWidth - wallThickness / 2},15`}
          fill="none"
          stroke="black"
        />

        {/* Show roomDepth */}
        <text
          x={-roomDepth / 2}
          y={-8}
          textAnchor="end"
          fill="black"
          transform={`rotate(-90)`}
        >
          {roomDepth}
        </text>
        <polyline
          points={`${wallThickness},${wallThickness * 1.5} ${0},${
            wallThickness * 1.5
          } ${0},${roomDepth - wallThickness / 2} ${wallThickness},${
            roomDepth - wallThickness / 2
          }`}
          fill="none"
          stroke="black"
        />
        {/* Show stallDepth */}
        <text
          x={stallDepth / 2 + wallThickness}
          y={-roomWidth - 1.5 * wallThickness}
          textAnchor="start"
          fill="black"
          transform={`rotate(90)`}
        >
          {stallDepth}
        </text>
        <polyline
          points={`${roomWidth},${wallThickness * 1.5} ${
            roomWidth + wallThickness
          },${wallThickness * 1.5} ${roomWidth + wallThickness},${
            stallDepth + wallThickness * 1.5
          } ${roomWidth},${stallDepth + wallThickness * 1.5}`}
          fill="none"
          stroke="black"
        />
      </g>
    );
    const extendAmount = 30;
    const updatedWall = (
      <svg
        width={roomWidth + wallThickness + 2 * extendAmount} // Sağ ve sol tarafa extendAmount ekleniyor
        height={roomDepth + wallThickness + 2 * extendAmount} // Üst ve alt tarafa extendAmount ekleniyor
        viewBox={`-${extendAmount} -${extendAmount} ${
          roomWidth + wallThickness + 2 * extendAmount
        } ${roomDepth + wallThickness + 2 * extendAmount}`}
      >
        <defs>
          <pattern
            id="pattern"
            width={patternWidth}
            height={patternHeight}
            patternUnits="userSpaceOnUse"
          >
            {patterns}
          </pattern>
        </defs>

        <rect
          x={wallThickness / 2}
          y={wallThickness / 2}
          width={roomWidth - wallThickness}
          height={roomDepth - wallThickness}
          fill="white"
        />

        <g transform={`translate(0, ${wallThickness})`} fill="url(#pattern)">
          {UShapeWithPartitions}
        </g>
      </svg>
    );

    setLayout(updatedWall);
  };
  console.log(numStalls);
  return (
    <div style={{ textAlign: "center" }}>
      <div className="navbar">
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Room width (cm)"
          type="number"
          value={roomWidth}
          onChange={(e) => setRoomWidth(parseInt(e.target.value))}
        />
        <TextField
          type="number"
          id="outlined-basic"
          variant="outlined"
          label="Room depth (cm)"
          value={roomDepth}
          onChange={(e) => setRoomDepth(parseInt(e.target.value))}
        />
        <TextField
          label="Number of stalls"
          id="outlined-basic"
          variant="outlined"
          type="number"
          value={numStalls}
          onChange={(e) => setNumStalls(parseInt(e.target.value))}
        />

        <TextField
          type="number"
          value={stallDepth}
          onChange={(e) => setStallDepth(parseInt(e.target.value))}
          id="outlined-basic"
          label="Stall Depth (cm)"
          variant="outlined"
        />
        <Button onClick={drawWall} variant="contained" color="success">
          Draw <PolylineOutlinedIcon />
        </Button>
      </div>

      <div style={{ display: "inline-block", marginLeft: "20px" }}>
        {layout}
      </div>
    </div>
  );
};

export default WallDrawer;
