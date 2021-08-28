import { useCallback } from "react";
import AnimatedText from "./components/animated-text";
import Appear from "./components/appear";
import Modal from "./components/modal";
import Layout from "./components/layout";
import PulseButton from "./components/pulse-button";
import PhotoCard from "./components/photo-card";
import Slides from "./components/slides";
import SlidesArrows from "./components/slides-arrows";
import { birthdayItems } from "./data";
import { useBirthdayIteSlides } from "./hooks";
import usePreloadImages from "./hooks/use-preload-images";

const imagesToPreload = birthdayItems.map((item) => item.image);

const App = () => {
  const { chosenItem, pagination, setIndex, handleNext, handlePrev } =
    useBirthdayIteSlides();

  usePreloadImages(imagesToPreload);

  const handleModalClose = useCallback(() => setIndex(undefined), [setIndex]);

  return (
    <Layout>
      <AnimatedText>А кто это сегодня именинник?</AnimatedText>

      <Appear in={2}>
        {birthdayItems.map((item, index) => {
          const handleClick = () => setIndex(index);

          return (
            <PulseButton
              key={item.label}
              onClick={handleClick}
              sx={{
                position: "absolute",
                left: item.x,
                top: item.y,
              }}
            >
              {item.label}
            </PulseButton>
          );
        })}
      </Appear>

      {typeof chosenItem !== "undefined" && (
        <SlidesArrows onNext={handleNext} onPrev={handlePrev} />
      )}

      <Modal
        isOpen={typeof chosenItem !== "undefined"}
        onClose={handleModalClose}
      >
        <Slides
          pagination={pagination}
          onNext={handleNext}
          onPrev={handlePrev}
          onSlideBackdropClick={handleModalClose}
        >
          {chosenItem ? (
            <PhotoCard
              src={chosenItem.image}
              title={chosenItem.title}
              description={chosenItem.description}
            />
          ) : null}
        </Slides>
      </Modal>
    </Layout>
  );
};

export default App;
