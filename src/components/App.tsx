import { Container, Title, Stack } from "@mantine/core";
import { useState, useCallback } from "react";
import { ImageDrop } from "./ImageDrop";
import { ImageList } from "./ImageList";

export const App = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then((imageUrls) => {
      setImages((prev) => [...prev, ...imageUrls]);
    });
  }, []);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Title order={1} ta="center">
          Badge Maker
        </Title>
        <ImageDrop onDrop={handleDrop} />
        {images.length > 0 && <ImageList images={images} />}
      </Stack>
    </Container>
  );
};
