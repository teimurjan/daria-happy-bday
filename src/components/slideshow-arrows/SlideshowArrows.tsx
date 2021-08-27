import { motion } from "framer-motion";
import EmojiButton from "../emoji-button";

interface Props {
  onNext?: () => void;
  onPrev?: () => void;
}

const bounceTransition = {
  x: {
    duration: 1,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
};

const MotionEmojiButton = motion(EmojiButton);

const ArrowControls = ({ onNext, onPrev }: Props) => {
  return (
    <>
      <MotionEmojiButton
        sx={{ position: "absolute", left: "2%", top: "50%" }}
        variants={{
          visible: { opacity: 1, x: ["-20%", "20%"], y: "-50%" },
          hidden: { opacity: 0, x: ["-20%", "20%"], y: "-50%" },
        }}
        animate={onPrev ? "visible" : "hidden"}
        transition={bounceTransition}
        onClick={onPrev}
      >
        ⬅️
      </MotionEmojiButton>

      <MotionEmojiButton
        sx={{ position: "absolute", right: "2%", top: "50%" }}
        variants={{
          visible: { opacity: 1, x: ["20%", "-20%"], y: "-50%" },
          hidden: { opacity: 0, x: ["20%", "-20%"], y: "-50%" },
        }}
        animate={onNext ? "visible" : "hidden"}
        transition={bounceTransition}
        onClick={onNext}
      >
        ➡️
      </MotionEmojiButton>
    </>
  );
};

export default ArrowControls;
