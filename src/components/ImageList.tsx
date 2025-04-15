import { SimpleGrid } from "@mantine/core";
import { Badge } from "./Badge";

interface ImageListProps {
  images: string[];
}

export const ImageList = ({ images }: ImageListProps) => {
  return (
    <SimpleGrid cols={3} spacing="xl">
      {images.map((image, index) => (
        <Badge key={index} image={image} />
      ))}
    </SimpleGrid>
  );
};
