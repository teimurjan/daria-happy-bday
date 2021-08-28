import { AnimatePresence, motion, DraggableProps } from "framer-motion";
import { ReactNode, useCallback } from "react";
import { Box } from "rebass";
import { getFullHeight } from "../../utils";

interface Props {
  children: ReactNode;
  pagination: readonly [number | undefined, "forward" | "backward"];
  onSlideBackdropClick: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const variants = {
  enter: (pagination: Props["pagination"]) => {
    const x = pagination[1] === "forward" ? 500 : -500;
    return {
      x,
      opacity: 0,
    };
  },
  idle: {
    x: 0,
    opacity: 1,
  },
  exit: (pagination: Props["pagination"]) => {
    const x = pagination[1] === "backward" ? 500 : -500;
    return {
      x,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Slides = ({
  children,
  pagination,
  onSlideBackdropClick,
  onNext,
  onPrev,
}: Props) => {
  const handleDragEnd: DraggableProps["onDragEnd"] = useCallback(
    (e, { offset, velocity }) => {
      const swipe = swipePower(offset.x, velocity.x);

      if (swipe < -swipeConfidenceThreshold) {
        onNext?.();
      } else if (swipe > swipeConfidenceThreshold) {
        onPrev?.();
      }
    },
    [onNext, onPrev]
  );

  return (
    <AnimatePresence initial={false} custom={pagination}>
      <motion.div
        key={pagination[0]}
        custom={pagination}
        style={{
          position: "fixed",
          top: "calc(50% - 50vh)",
          left: "calc(50% - 50vw)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: getFullHeight(),
          width: "100vw",
        }}
        variants={variants}
        initial="enter"
        animate="idle"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30, duration: 0.5 },
          opacity: { duration: 0.4 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={handleDragEnd}
        onClick={onSlideBackdropClick}
      >
        <Box onClick={(e) => e.stopPropagation()}>{children}</Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default Slides;
