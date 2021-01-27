import React, { useState, useEffect } from "react";
import { string, number, array } from "prop-types";
import { animated, interpolate } from "react-spring";
import Carousel from "nuka-carousel";
import Test from './Test';
import { InputTags } from 'react-bootstrap-tagsinput';
import { useGesture } from "react-with-gesture";

const ageCalculation = (date) => {
  const now = new Date();
  const birthdate = new Date(date);

  let diff = now.getTime() - birthdate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

const formatText = (text) => {
  if(text !== null) {
    let temp = "";
    const charText = text.split('');

    for(let i = 0; i < charText.length; i++) {
      if(i < 86)
        temp += charText[i];
      else {
        temp += "...";
        break;
      }
    }
    return temp;
  }
  else
    return text;
}

const Card = ({ i, x, y, rot, scale, trans, bind, data }) => {
  const { name, age, distance, text, pics, anthem, activity } = data[i];

  const [userMeta, setData] = useState([]);

  const handleClick = () => {
    userMeta.length === 0 ? setData(data[i].user) : setData([]);
  }

  const showMeta = (user) => {
    if(user.length !== 0) {
      return (
        <>
          <div>
            {user.description !== null &&
              <p>{user.description}</p>
            }
            {user.gender !== null &&
              <p>Gender: {user.gender}</p>
            }
            {user.job_title !== null &&
              <p>Current job: {user.job_title}</p>
            }
            {user.company !== null &&
              <p>Company: {user.company}</p>
            }
            {user.school !== null &&
              <p>School: {user.school}</p>
            }
            {user.sexual_orientation !== null &&
              <p>Sexual orientation: {user.sexual_orientation}</p>
            }
            {anthem !== null &&
              <div>
                <label>Anthem:</label>
                <Test songID={anthem}></Test>
            </div>
            }
            <InputTags values={user.passion.split(",")} onTags={(value) => console.log(value)} />
          </div>
        </>
      );
    }
  }

  return (
    <>
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
            <h2 onClick={handleClick}>{name},</h2>
            <h2>{ageCalculation(age)}</h2>
            <h6>{distance}</h6>
            {activity === true &&
              <h6>Recently active</h6>
              /*
                <svg xmlns="http://www.w3.org/2000/svg" style={{height:'5%'}}>
                    <circle cx="14" cy="5" r="5" fill="green" />
                  </svg>
              */
            }
            <br />
            <h6>{formatText(text)}</h6>
          </div>
        </animated.div>
        {showMeta(userMeta)}
      </animated.div>
    </>
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
