import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import { data } from './data';

const App = () => {
  const [slides, setSlides] = useState(data);
  const [index, setIndex] = useState(0);

  const getNextSlide = useCallback(() => {
    setIndex(oldIndex => {
      let index = oldIndex + 1;
      if (index > slides.length - 1) {
        index = 0;
      }
      return index;
    });
  }, [slides.length]);

  const getPrevSlide = () => {
    if (index > 0) {
      setIndex(index => index - 1);
    } else {
      setIndex(slides.length - 1);
    }
    return index;
  };

  // index in dependency because every time index change manualy 3 sec start over this is correct
  useEffect(() => {
    const interval = setInterval(() => {
      getNextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [index, getNextSlide]);

  return (
    <div className="slider-container">
      {slides.map((slide, slideIndex) => {
        const { id, name, image, desc } = slide;
        let position = 'nextSlide';
        if (slideIndex === index) position = 'activeSlide';
        if (
          slideIndex === index - 1 ||
          (index === 0 && slideIndex === slides.length - 1)
        )
          position = 'prevSlide';
        return (
          <article className={position} key={id}>
            <img className="slide-img" src={image} alt={name} />
            <h2>{name}</h2>
            <p>{desc}</p>
          </article>
        );
      })}

      <button className="next" onClick={getNextSlide}>
        next
      </button>
      <button className="prev" onClick={getPrevSlide}>
        prev
      </button>
    </div>
  );
};

export default App;
