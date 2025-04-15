import { useState, useEffect, useRef } from "react";

export const useImagePixelColor = (imageUrl: string) => {
  const [color, setColor] = useState<string>("#ffffff");
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const img = imageRef.current;

    // Only proceed if the image is already loaded
    if (!img.complete) {
      const handleLoad = () => {
        extractColor(img);
      };
      img.addEventListener("load", handleLoad);
      return () => img.removeEventListener("load", handleLoad);
    }

    // If image is already loaded, extract color immediately
    extractColor(img);
  }, [imageUrl]);

  const extractColor = (img: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas size to 1x1 to get just the first pixel
    canvas.width = 1;
    canvas.height = 1;

    // Draw the image at the correct scale
    ctx.drawImage(img, 0, 0, 1, 1);

    // Get the pixel data
    const pixelData = ctx.getImageData(0, 0, 1, 1).data;

    // Convert to hex color
    const hexColor = `#${pixelData[0].toString(16).padStart(2, "0")}${pixelData[1].toString(16).padStart(2, "0")}${pixelData[2].toString(16).padStart(2, "0")}`;

    setColor(hexColor);
  };

  return { color, imageRef };
};
