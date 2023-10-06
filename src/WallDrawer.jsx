import React, { useState } from 'react';

const WallDrawer = () => {
  const [roomWidth, setRoomWidth] = useState('');
  const [roomHeight, setRoomHeight] = useState('');
  const [wall, setWall] = useState('');
  const [numPartitions, setNumPartitions] = useState('');
  const [partitionDepth, setPartitionDepth] = useState('')


  const drawWall = () => {
    const wallThickness = 20; // Duvar kalınlığı
    const patternWidth = 20; // Desen genişliği
    const patternHeight = 20; // Desen yüksekliği

    const partitionThickness = 5; // Ara duvar kalınlığı
  const partitionColor = 'lightgray'; // Ara duvar rengi

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
            fill={(i + j) % 2 === 0 ? 'gray' : 'white'}
          />
        );
      }
    }

    const partitionWidth = (roomWidth - wallThickness) / (numPartitions);

    const partitions = [];
    for (let i = 1; i < numPartitions; i++) {
      const partitionX = wallThickness / 2 + i * partitionWidth;
      partitions.push(
        <rect
          key={`partition-${i}`}
          x={partitionX - wallThickness / 2}
          y={wallThickness}
          width={partitionThickness}
          height={partitionDepth}
          fill={partitionColor} // Farklı renkler için burada değişiklik yapıldı
        />
      );
    }

    const UShapeWithPartitions = (
      <g fill="gray">
        <rect
          x={wallThickness / 2}
          y={wallThickness / 2}
          width={roomWidth - wallThickness}
          height={wallThickness}
          fill="gray"
        />
        <rect
          x={wallThickness / 2}
          y={wallThickness / 2}
          width={wallThickness}
          height={roomHeight - wallThickness}
          fill="gray"
        />
        <rect
          x={roomWidth - wallThickness / 2}
          y={wallThickness / 2}
          width={wallThickness}
          height={roomHeight - wallThickness}
          fill="gray"
        />
        {partitions}
      </g>
    );

    const updatedWall = (
      <svg width={roomWidth + wallThickness} height={roomHeight + wallThickness}>
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

  return (
    <div style={{ textAlign: 'center' }}>
      <label>
        Oda genişliği:
        <input
          type="number"
          value={roomWidth}
          onChange={(e) => setRoomWidth(parseInt(e.target.value))}
        />
      </label>
      <label>
        Oda yüksekliği:
        <input
          type="number"
          value={roomHeight}
          onChange={(e) => setRoomHeight(parseInt(e.target.value))}
        />
      </label>
      <label>
        Kabin adedi:
        <input
          type="number"
          value={numPartitions}
          onChange={(e) => setNumPartitions(parseInt(e.target.value))}
        />
      </label>
      <label>
        Kabin Derinliği:
        <input
          type="number"
          value={partitionDepth}
          onChange={(e) => setPartitionDepth(parseInt(e.target.value))}
        />
      </label>
      <button onClick={drawWall}>Duvarı Çiz</button>
      <div style={{ display: 'inline-block', marginLeft: '20px' }}>
        {wall}
      </div>
    </div>
  );
};

export default WallDrawer;
