import React from "react";
import { string, number, array } from "prop-types";
import { animated, interpolate } from "react-spring";
import Carousel from "nuka-carousel";
import Test from './Test';

const ageCalculation = (date) => {
  const now = new Date();
  const birthdate = new Date(date);

  let diff = now.getTime() - birthdate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

const Card = ({ i, x, y, rot, scale, trans, bind, data }) => {
  const { name, age, distance, text, pics, anthem } = data[i];

  return (
    <animated.div
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans)
        }}
      >
        <div id="dc" >
          <Carousel>
            {pics.map((pic, index) => (
              <img id="di" src={pic} key={index} alt="profilePicture" />
            ))}
          </Carousel>
          <h2>{name},</h2>
          <h2>{ageCalculation(age)}</h2>
          <h5>{distance}</h5>
          <h5>{text}</h5>
          <div><Test songID={anthem}></Test></div>
        </div>
      </animated.div>
    </animated.div>
  );
};

Card.propTypes = {
  name: string,
  age: number,
  distance: string,
  text: string,
  pics: array
};

export default Card;
