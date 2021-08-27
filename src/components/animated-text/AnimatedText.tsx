import { Text } from "rebass";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const variants = {
  visible: {
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
  hidden: { scale: 0, y: 200 },
};

const MotionText = motion(Text);

const AnimatedText = ({ children }: Props) => (
  <MotionText
    sx={{ textAlign: "center" }}
    fontSize={[6, 8]}
    initial="hidden"
    animate="visible"
    variants={variants}
  >
    {children}
  </MotionText>
);

export default AnimatedText;
