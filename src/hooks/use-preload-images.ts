import { useEffect } from "react";

const usePreloadImages = (srcs: string[]) => {
  useEffect(() => {
    srcs.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default usePreloadImages;
