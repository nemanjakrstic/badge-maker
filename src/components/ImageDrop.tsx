import { Box, Text, Paper } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

interface ImageDropProps {
  onDrop: (files: File[]) => void;
}

export const ImageDrop = ({ onDrop }: ImageDropProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: true,
  });

  return (
    <Paper
      {...getRootProps()}
      p="xl"
      radius="md"
      withBorder
      style={{
        cursor: "pointer",
        borderStyle: "dashed",
        borderWidth: 2,
        backgroundColor: isDragActive ? "var(--mantine-color-blue-light)" : undefined,
      }}
    >
      <input {...getInputProps()} />
      <Box ta="center">
        <IconPhoto size={48} stroke={1.5} />
        <Text size="xl" mt="md">
          {isDragActive ? "Drop the images here" : "Drag and drop images here, or click to select"}
        </Text>
        <Text size="sm" c="dimmed" mt={7}>
          Supports: PNG, JPG, JPEG, GIF
        </Text>
      </Box>
    </Paper>
  );
};
