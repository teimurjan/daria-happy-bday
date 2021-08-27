import { AnimatePresence, motion, DraggableProps } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { ReactNode, useCallback, useRef } from "react";
import { Box } from "rebass";
interface Props {
  children: ReactNode;
  pagination: readonly [number | undefined, "forward" | "backward"];
  onNext?: () => void;
  onPrev?: () => void;
}

const variants = {
  enter: (pagination: Props["pagination"]) => {
    return {
      x: pagination[1] === "forward" ? 500 : -500,
      opacity: 0,
    };
  },
  idle: {
    x: 0,
    opacity: 1,
  },
  exit: (pagination: Props["pagination"]) => {
    return {
      x: pagination[1] === "backward" ? 500 : -500,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Slideshow = ({ children, pagination, onNext, onPrev }: Props) => {
  const motionRef = useRef<HTMLDivElement>(null);
  const [[width, height], setSize] = useState([0, 0]);

  useEffect(() => {
    const handleSizeChange = () => {
      if (motionRef.current) {
        setSize([
          motionRef.current.offsetWidth,
          motionRef.current.offsetHeight,
        ]);
      }
    };

    // Not a good way but a quick fix of getting height from the div where img is rendered
    const timeoutID = setTimeout(handleSizeChange, 50);

    window.addEventListener("resize", handleSizeChange);

    return () => {
      clearTimeout(timeoutID);
      window.removeEventListener("resize", handleSizeChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination[0]]);

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
    <Box width={width} height={height}>
      <AnimatePresence initial={false} custom={pagination}>
        <motion.div
          key={pagination[0]}
          ref={motionRef}
          custom={pagination}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
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
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default Slideshow;
