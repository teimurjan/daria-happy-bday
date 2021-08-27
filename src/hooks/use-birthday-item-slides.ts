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

  const hasNext = useMemo(
    () =>
      typeof index === "number" ? index < birthdayItems.length - 1 : false,
    [index]
  );
  const hasPrev = useMemo(
    () => (typeof index === "number" ? index > 0 : false),
    [index]
  );

  const handleNext = useCallback(() => {
    if (typeof index === "number") {
      setPagination([index + 1, "forward"]);
    }
  }, [index]);

  const handlePrev = useCallback(() => {
    if (typeof index === "number") {
      setPagination([index - 1, "backward"]);
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
    handleNext: hasNext ? handleNext : undefined,
    handlePrev: hasPrev ? handlePrev : undefined,
  };
};

export default useBirthdayIteSlides;
