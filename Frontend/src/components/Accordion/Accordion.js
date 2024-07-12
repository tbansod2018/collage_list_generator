import React, { useState } from 'react';
import './accordion.css'; 
import up from "./upload.png"
import down from "./arrow-down-sign-to-navigate.png"

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (

    <div className='container'>
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        
        <div>{isActive ? <img src={up} alt="" /> : <img src={down} alt="" />}</div>
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
    </div>
  );
};

export default Accordion;
