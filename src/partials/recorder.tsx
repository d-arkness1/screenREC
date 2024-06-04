import React from 'react';

const Recorder = () => {
  return (
    <section className="sh__recorder">
      <div className="sh__wrp">
        {/* <a className="sh__logo"></a> */}
        <picture className="sh__logo--img">
          <source srcSet="images/logo.png?as=avif&width=400" type="image/avif" />
          <source srcSet="images/logo.png?as=webp&width=400" type="image/webp" />
          <source srcSet="images/logo.png?width=400" type="image/png" />
          <img src="images/logo.png?width=400" alt="test image" />
        </picture>
        <h1 className="sh__logo--text">
          Screen <span>REC</span> <sup>Î²eta</sup>
        </h1>
      </div>
      <div className="sh__header">
        <h2 className="sh__header--title outro">
          <span>Your video is ready to be exported</span>
        </h2>
        <h2 className="sh__header--title recording">
          <span>You are currently <span className="red--text">recording</span></span>
        </h2>
        <h2 className="sh__header--title intro">
          {/* <span>A simple web screen recorder</span> */}
        </h2>
      </div>
      <div className="sh__choice">
        <div className="sh__dropdown">
          <button type="button" className="sh__dropdown--btn">
            <img className="sh__dropdown--icon camera" src="./images/camera.svg" alt="camera icon" />
            <span className="sh__dropdown--defaultOption">What do you want to record?</span>
            <img className="sh__dropdown--icon chevron" src="./images/chevron-down.svg" alt="chevron icon" />
          </button>
          <ul className="sh__dropdown__list">
            <li className="sh__dropdown__list--item" data-value="screen">Record your Screen</li>
            <li className="sh__dropdown__list--item" data-value="screen-mic">Record your Screen with Audio</li>
          </ul>
        </div>
        <input type="text" className="sh__choice--filename" id="filename" placeholder="Name your recording" autoComplete="off" />
        <button type="button" className="sh__btn record" id="start">
          <span className="pulse">
            <span>I’m ready to record</span>
          </span>
        </button>
      </div>
      <div className="sh__video--wrp">
        <div className="sh__video--sheet">
          <video className="sh__video" id="preview" width="100%" height="100%" autoPlay muted></video>
        </div>
        <button className="sh__btn sh__video--btn1 pause" id="pauseAndResume">Pause/Resume</button>
        <button className="sh__btn sh__video--btn" id="stop">Stop</button>
        <a className="sh__btn sh__download-btn" id="download">
          <img className="sh__download-btn--icon" src="./images/download.svg" alt="download icon" />
          <span className="sh__download-btn--text">Download now</span>
        </a>
      </div>
    </section>
  );
};

export default Recorder;