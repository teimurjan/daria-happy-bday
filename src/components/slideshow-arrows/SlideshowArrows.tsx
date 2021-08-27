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
        sx={{ position: "fixed", left: "2%", top: "50%", zIndex: 30 }}
        animate={{ x: ["20%", "-20%"], y: "-50%" }}
        transition={bounceTransition}
        onClick={onPrev}
      >
        ⬅️
      </MotionEmojiButton>

      <MotionEmojiButton
        sx={{ position: "fixed", right: "2%", top: "50%", zIndex: 30 }}
        animate={{ x: ["-20%", "20%"], y: "-50%" }}
        transition={bounceTransition}
        onClick={onNext}
      >
        ➡️
      </MotionEmojiButton>
    </>
  );
};

export default ArrowControls;
