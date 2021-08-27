import { useCallback, useMemo, useState } from "react";

import { birthdayItems } from "../data";

const useBirthdayIteSlides = () => {
  const [[index, direction], setPagination] = useState<
    [number | undefined, "forward" | "backward"]
  >([undefined, "forward"]);
  const chosenItem = useMemo(
    () => (typeof index === "number" ? birthdayItems[index] : undefined),
    [index]
  );

  const handleNext = useCallback(() => {
    if (typeof index === "number") {
      setPagination([(index + 1) % birthdayItems.length, "forward"]);
    }
  }, [index]);

  const handlePrev = useCallback(() => {
    if (typeof index === "number") {
      setPagination([
        index === 0 ? birthdayItems.length - 1 : index - 1,
        "backward",
      ]);
    }
  }, [index]);

  const setIndex = useCallback(
    (newIndex: number | undefined) => {
      setPagination([newIndex, direction]);
    },
    [direction]
  );

  return {
    pagination: [index, direction] as const,
    chosenItem,
    setIndex,
    handleNext,
    handlePrev,
  };
};

export default useBirthdayIteSlides;
