import React, { useState, useEffect } from "react";
import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";
import axios from 'axios';

import Card from "./Card";
//import data from "../data.js";

import "./css/deck.css";
import './css/loading_heart.css';

const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot: 0,
  //rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
  10}deg) rotateZ(${r}deg) scale(${s})`;

async function getData(props) {
  await axios.get(`http://${process.env.REACT_APP_IP}:8000/api/profiles/${props.userID}`)
  .then(reponse => {
    console.log(reponse)
  })
}

const Deck = (props) => {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_IP}:8000/api/profiles/${props.userID}`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        setData(response);
        setLoading(false);
      })
      .catch(err => {
      });
  }, []);

    const [gone] = useState(() => new Set());

    const [cardState, set] = useSprings(data.length, i => ({
      ...to(i),
      from: from(i)
    }));

    const bind = useGesture(
      ({
        args: [index],
        down,
        delta: [xDelta],
        distance,
        direction: [xDir],
        velocity
      }) => {
        const trigger = velocity > 0.2;

        const dir = xDir < 0 ? -1 : 1;

        if (!down && trigger) {
          gone.add(index);
          
          const send = {
            "index": index,
             "giverid": props.userID,
             "direction": dir
          }

          fetch(`http://${process.env.REACT_APP_IP}:8000/api/give_vote`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(send)
           });
        }

        set(i => {
          if (index !== i) return;
          const isGone = gone.has(index);

          const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

          const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

          const scale = down ? 1.1 : 1;
          return {
            x,
            rot,
            scale,
            delay: undefined,
            config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
          };
        });

        if (!down && gone.size === data.length) {
          setTimeout(() => gone.clear() || set(i => to(i)), 600);
        }
      }
    );

    if (!isLoading) {
      return (
        <div id='recommendations'>
          {cardState.map(({ x, y, rot, scale }, i) => (
            <Card
              key={i}
              i={i}
              x={x}
              y={y}
              rot={rot}
              scale={scale}
              trans={trans}
              data={data}
              bind={bind}
            />
          ))}
        </div>
      );
    }
    else {
      return (
        <div className="container" style={{height: '100vh'}}>
        <div class="flex-container">
          <div class="unit">
            <div class="heart">
              <div class="heart-piece-0"></div>
              <div class="heart-piece-1"></div>
              <div class="heart-piece-2"></div>
              <div class="heart-piece-3"></div>
              <div class="heart-piece-4"></div>
              <div class="heart-piece-5"></div>
              <div class="heart-piece-6"></div>
              <div class="heart-piece-7"></div>
              <div class="heart-piece-8"></div>
            </div>
            <p>love is love</p>
          </div>
        </div>
        </div>
      );
    }
}

export default Deck;