import { useCallback } from "react";
import { Text } from "rebass";
import AnimatedText from "./components/animated-text";
import Appear from "./components/appear";
import Modal from "./components/modal";
import Layout from "./components/layout";
import PulseButton from "./components/pulse-button";
import PhotoCard from "./components/photo-card";
import Slideshow from "./components/slideshow";
import SlideshowArrows from "./components/slideshow-arrows";
import { birthdayItems } from "./data";
import { useBirthdayIteSlides } from "./hooks";

const App = () => {
  const { chosenItem, pagination, setIndex, handleNext, handlePrev } =
    useBirthdayIteSlides();

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

      {chosenItem && (
        <Modal onClose={handleModalClose}>
          <Slideshow
            pagination={pagination}
            onNext={handleNext}
            onPrev={handlePrev}
          >
            <Text sx={{ textAlign: "center" }} fontSize={[6, 8]}>
              {chosenItem.label}
            </Text>
            <PhotoCard
              src={chosenItem.image}
              title={chosenItem.title}
              description={chosenItem.description}
            />
          </Slideshow>

          <SlideshowArrows onNext={handleNext} onPrev={handlePrev} />
        </Modal>
      )}
    </Layout>
  );
};

export default App;
