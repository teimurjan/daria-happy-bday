import { ReactNode } from "react";
import { Button, Text, ButtonProps } from "rebass";
import { motion } from "framer-motion";

interface Props extends ButtonProps {
  children: ReactNode;
}

const MotionButton = motion(Button);

const PulseButton = ({ children, sx, onClick }: Props) => (
  <MotionButton
    sx={{
      ...sx,
      borderRadius: 20,
      textTransform: "uppercase",
      color: "black",
      cursor: "pointer",
    }}
    animate={{
      scale: [0.9, 1, 0.9],
      boxShadow: [
        "0 0 0 0 rgba(255, 255, 255, 0.7)",
        "0 0 0 20px rgba(255,  255,  255,  0)",
        "0 0 0 0 rgba(255,  255,  255,  0)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    }}
    onClick={onClick}
  >
    <Text fontSize={[4, 6]}>{children}</Text>
  </MotionButton>
);

export default PulseButton;
