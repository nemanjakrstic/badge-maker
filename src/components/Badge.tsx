import { Box, Slider, Stack, Checkbox } from "@mantine/core";
import { useState } from "react";
import { useImagePixelColor } from "../hooks/useImagePixelColor";

interface BadgeProps {
  image: string;
}

// Base DPI for standard screens
const BASE_DPI = 96;
// Pixels per millimeter at base DPI
const PX_PER_MM = BASE_DPI / 25.4;

export const Badge = ({ image }: BadgeProps) => {
  const [scale, setScale] = useState(1);
  const [showGuides, setShowGuides] = useState(true);
  const { color: backgroundColor, imageRef } = useImagePixelColor(image);

  // Get the device's pixel ratio
  const devicePixelRatio = window.devicePixelRatio || 1;
  // Calculate the actual DPI based on device pixel ratio
  const actualDPI = BASE_DPI * devicePixelRatio;

  // Convert mm to pixels using actual DPI
  const outerDiameter = 54 * (actualDPI / 25.4); // 54mm
  const innerDiameter = 44 * (actualDPI / 25.4); // 44mm
  const safeDiameter = 40 * (actualDPI / 25.4); // 40mm

  return (
    <Stack align="center" gap="md">
      <Box
        style={{
          position: "relative",
          width: outerDiameter,
          height: outerDiameter,
          borderRadius: "50%",
          border: "1px solid #ccc",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor,
        }}
      >
        {/* Image container - using outer diameter */}
        <Box
          style={{
            width: outerDiameter,
            height: outerDiameter,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            ref={imageRef}
            src={image}
            alt="Badge"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${scale})`,
              transformOrigin: "center",
            }}
          />
        </Box>

        {/* Safe area (40mm) */}
        {showGuides && (
          <Box
            style={{
              position: "absolute",
              width: safeDiameter,
              height: safeDiameter,
              borderRadius: "50%",
              backgroundColor: "rgba(128, 128, 128, 0.2)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Inner circle (44mm) */}
        {showGuides && (
          <Box
            style={{
              position: "absolute",
              width: innerDiameter,
              height: innerDiameter,
              borderRadius: "50%",
              border: "1px dashed #666",
              pointerEvents: "none",
            }}
          />
        )}
      </Box>

      <Stack align="center" gap="xs">
        <Checkbox
          label="Show guides"
          checked={showGuides}
          onChange={(event) => setShowGuides(event.currentTarget.checked)}
        />
        <Slider
          value={scale}
          onChange={setScale}
          min={0.5}
          max={2}
          step={0.1}
          label={(value) => `${(value * 100).toFixed(0)}%`}
          style={{ width: "200px" }}
        />
      </Stack>
    </Stack>
  );
};
