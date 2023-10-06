import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PolylineOutlinedIcon from "@mui/icons-material/PolylineOutlined";
import ToiletImg from "./assets/ToiletWall.gif"; // Import kolzet image

const WallDrawer = () => {
  const [roomWidth, setRoomWidth] = useState("");
  const [roomHeight, setRoomHeight] = useState("");
  const [wall, setWall] = useState("");
  const [numStalls, setNumStalls] = useState("");
  const [stallDepth, setStallDepth] = useState("");

  const drawWall = () => {
    const wallThickness = 20; // Duvar kalınlığı
    const patternWidth = 20; // Desen genişliği
    const patternHeight = 20; // Desen yüksekliği

    const panel = 5; // Ara duvar kalınlığı
    const panelColor = "#DC773F"; // Ara duvar rengi

    const numHorizontalPatterns = Math.ceil(roomWidth / patternWidth);
    const numVerticalPatterns = Math.ceil(roomHeight / patternHeight);

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
      (roomWidth - wallThickness * 2 - (numStalls - 1) * panel) /
      numStalls;

    const closetWidth = partitionWidth/2; 

    const partitions = [];
    for (let i = 1; i < numStalls; i++) {
      const partitionX = 2 * wallThickness + i * partitionWidth + (i - 1) * panel;
      const partitionY = wallThickness * 1.5;

      partitions.push(
        <rect
          key={`partition-${i}`}
          x={partitionX - wallThickness / 2}
          y={partitionY}
          width={panel}
          height={stallDepth}
          fill={panelColor} // Farklı renkler için burada değişiklik yapıldı
        />
      );
    }

    const UShapeWithPartitions = (
      <g fill="#ACACAC">
        <rect
          x={wallThickness / 2}
          y={wallThickness / 2}
          width={roomWidth - wallThickness}
          height={wallThickness}
          fill="#ACACAC"
        />
        <rect
          x={wallThickness / 2}
          y={wallThickness / 2}
          width={wallThickness}
          height={roomHeight - wallThickness}
          fill="#ACACAC"
        />
        <rect
          x={roomWidth - wallThickness / 2}
          y={wallThickness / 2}
          width={wallThickness}
          height={roomHeight - wallThickness}
          fill="#ACACAC"
        />
        {partitions}

        {/* Adding the kolzet image at partition centers */}
        {Array.from({ length: numStalls }).map((_, index) => {
      const partitionX = 2 * wallThickness + index * partitionWidth + (index - 1) * panel;
      const partitionY = wallThickness * 1.5;

      return (
        <image
          key={`kolzet-${index}`}
          href={ToiletImg}
          x={partitionX + closetWidth / 2 - panel }
          y={partitionY}
          width={closetWidth}
        />
      );
    })}

      {/* Show roomWidth */}
    <text
      x={roomWidth / 2}
      y={-8}
      textAnchor="start"
      fill="black"
    >
      {roomWidth} cm
    </text>
    <polyline
      points={`${1.5*wallThickness},15 ${1.5*wallThickness},${0} ${roomWidth-wallThickness/2},${0} ${roomWidth-wallThickness/2},15`}
      fill="none"
      stroke="black"
    />
    
    
    {/* Show roomHeight */}
    
        
      </g>
    );
    const extendAmount = 30;
    const updatedWall = (
      <svg
         width={roomWidth + wallThickness + 2 * extendAmount}  // Sağ ve sol tarafa extendAmount ekleniyor
    height={roomHeight + wallThickness + 2 * extendAmount}  // Üst ve alt tarafa extendAmount ekleniyor
    viewBox={`-${extendAmount} -${extendAmount} ${roomWidth + wallThickness + 2 * extendAmount} ${roomHeight + wallThickness + 2 * extendAmount}`}
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
          height={roomHeight - wallThickness}
          fill="white"
        />

        <g transform={`translate(0, ${wallThickness})`} fill="url(#pattern)">
          {UShapeWithPartitions}
        </g>
      </svg>
    );

    setWall(updatedWall);
  };
  console.log(numStalls)
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
          value={roomHeight}
          onChange={(e) => setRoomHeight(parseInt(e.target.value))}
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

      <div style={{ display: "inline-block", marginLeft: "20px" }}>{wall}</div>
    </div>
  );
};

export default WallDrawer;
