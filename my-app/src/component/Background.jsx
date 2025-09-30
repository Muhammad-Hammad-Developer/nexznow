import React from 'react'
import vid1 from "../assets/vid1.mp4"


function Background({ heroCount }) {

  if (heroCount === 0) {
    return (
      <video
        src={vid1}
        autoPlay
        loop
        muted
        playsInline
        className="w-[100%] h-[100%] object-cover"
      />
    )
  } else if (heroCount === 1) {
    return (
      <video
        src={vid1}
        autoPlay
        loop
        muted
        playsInline
        className="w-[100%] h-[100%] object-cover"
      />
    )
  } else if (heroCount === 2) {
    return (
      <video
        src={vid1}
        autoPlay
        loop
        muted
        playsInline
        className="w-[100%] h-[100%] object-cover"
      />
    )
  } else if (heroCount === 3) {
    return (
      <video
        src={vid1}
        autoPlay
        loop
        muted
        playsInline
        className="w-[100%] h-[100%] object-cover"
      />
    )
  }
}

export default Background
