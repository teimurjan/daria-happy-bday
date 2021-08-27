import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Box, BoxProps } from "rebass";

interface Props extends BoxProps {
  in: number;
  children: ReactNode;
}

const variants = {
  visible: (in_: number) => ({
    opacity: 1,
    transition: { delay: in_, duration: 0.5 },
  }),
  hidden: { opacity: 0 },
};

const MotionBox = motion(Box);

const Appear = ({ children, in: in_, sx }: Props) => (
  <MotionBox
    custom={in_}
    initial="hidden"
    animate="visible"
    variants={variants}
    sx={sx}
  >
    {children}
  </MotionBox>
);

export default Appear;
