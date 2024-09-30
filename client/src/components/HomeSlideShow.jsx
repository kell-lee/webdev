import React from "react";
import { ImageA } from "../ImageA";
import { useState, useEffect } from "react";

import "../style/slideshow.css";

export default function Slideshow() {
  const [currImg, setCurrImg] = useState(0);

  useEffect(() => {
    const imgLength = ImageA.length;
    const slideDelay = setInterval(() => {
      setCurrImg((currImg + 1) % imgLength);
    }, 2000);
    return () => clearInterval(slideDelay);
  }, [currImg]);
  useEffect(() => {
    setCurrImg(0);
  }, []);
  return (
    <div className="slideshow">
      <div className="slideshow-image">
        <img src={ImageA[currImg].path} alt={ImageA[currImg].alt}></img>
      </div>
    </div>
  );
}
