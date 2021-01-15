import React, { useState, useEffect } from "react";
import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";
import axios from 'axios';

import Card from "./Card";
import Pulse from "./Pulse";

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

function Deck({userID, data}) {

  const [doFetch, setFetch] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function giveVote(index, direction) {
      const send = {
        "index": index,
        "giverid": userID,
        "direction": direction
      }

      await fetch(`${process.env.REACT_APP_IP}/api/give_vote`, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(send)
        })
        .then(() => {
          setLoading(false);
        });
    }
    
    if (doFetch !== "") {
      const temp = doFetch.split(',');
      giveVote(temp[0], temp[1]);
    }
  }, [doFetch])

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

      let temp = "";

      if (!down && trigger) {
        gone.add(index);
        temp = `${index},${dir}`;
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

      if(temp.length != 0) {
        setLoading(true);
        setFetch(temp);
      }

      /*
      if (!down && gone.size === data.length) {
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
      }
      */
    }
  );

  if(isLoading) {
    return (
      <h1>fetch loading...</h1>
    );
  }
  else if(cardState.length != gone.size) {
    return (
      <>
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
      </>
    );
  }
  else {
    return(<Pulse userID={userID} />);
  }
}

export default Deck;