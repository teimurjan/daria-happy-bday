import { Box, Card, Image, Text } from "rebass";

interface Props {
  src: string;
  title: string;
  description?: string;
}

const PhotoCard = ({ src, title, description }: Props) => {
  return (
    <Box sx={{ background: "white", color: "black" }} width={["80vw", 512]}>
      <Card
        sx={{
          p: 1,
          borderRadius: 2,
          boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
        }}
      >
        <Image src={src} />
        <Box px={2}>
          <Text fontSize={6}>{title}</Text>
          {description && <Text fontSize={4}>{description}</Text>}
        </Box>
      </Card>
    </Box>
  );
};

export default PhotoCard;
