import { motion } from "framer-motion";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Box } from "rebass";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

const backdropVariants = {
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  hidden: { opacity: 0 },
};

const modalVariants = {
  visible: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.5 },
  },
  hidden: { opacity: 0 },
};

const MotionBox = motion(Box);

const root = document.getElementById("modal");

const Modal = ({ children, onClose }: Props) =>
  root
    ? createPortal(
        <>
          <MotionBox
            onClick={onClose}
            sx={{
              top: 0,
              left: 0,
              position: "fixed",
              width: "100%",
              height: "100%",
              zIndex: 10,
              background: "rgba(0, 0, 0, 0.7)",
            }}
            initial="hidden"
            animate="visible"
            variants={backdropVariants}
          />
          <MotionBox
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
            initial="hidden"
            animate="visible"
            variants={modalVariants}
          >
            {children}
          </MotionBox>
        </>,
        root
      )
    : null;

export default Modal;
