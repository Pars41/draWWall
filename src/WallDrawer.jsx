import React, { useState } from 'react';

const WallDrawer = () => {
  const [roomWidth, setRoomWidth] = useState('');
  const [roomHeight, setRoomHeight] = useState('');
  const [wall, setWall] = useState('');

  const drawWall = () => {
    const wallThickness = 20; // Duvar kalınlığı
    const patternWidth = 20; // Desen genişliği
    const patternHeight = 20; // Desen yüksekliği

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

    // U şeklindeki çizim
    const UShape = (
      <g fill="gray">
        {/* Üst yatay çizgi */}
        <rect
          x={wallThickness / 2}
          y={wallThickness / 2}
          width={roomWidth - wallThickness}
          height={wallThickness}
          fill="gray"
        />
        {/* Sol dikey çizgi */}
        <rect
          x={wallThickness / 2}
          y={wallThickness / 2}
          width={wallThickness}
          height={roomHeight - wallThickness}
          fill="gray"
        />
        {/* Sağ dikey çizgi */}
        <rect
          x={roomWidth - wallThickness / 2}
          y={wallThickness / 2}
          width={wallThickness}
          height={roomHeight - wallThickness}
          fill="gray"
        />
      </g>
    );

    // Duvarı oluştur
    const wall = (
      <svg width={roomWidth + wallThickness} height={roomHeight + wallThickness}>
        {/* Taralı desen */}
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

        {/* Duvar */}
        <rect
          x={wallThickness / 2}
          y={wallThickness / 2}
          width={roomWidth - wallThickness}
          height={roomHeight - wallThickness}
          fill="white"
        />

        {/* U şeklindeki çizimi içini desenle doldur */}
        <g transform={`translate(0, ${wallThickness})`} fill="url(#pattern)">
          {UShape}
        </g>
      </svg>
    );

    setWall(wall);
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
      <button onClick={drawWall}>Duvarı Çiz</button>
      <div style={{ display: 'inline-block', marginLeft: '20px' }}>
        {wall}
      </div>
    </div>
  );
};

export default WallDrawer;
