import React, { useState } from "react";
import "./About.css"; // Make sure the path to About.css is correct
import Accordion from "./Accordion/Accordion";
import { accordionData } from "./Accordion/AccordionData";

const About = () => {
  // Destructure useState properly and rename variables if needed
  const [s, sets] = useState("");

  return (
    <div className="about">
      <div className="statement">
        <p>
          The MHT CET College Predictor 2024 is designed to assess your chances of
          admission to B.Tech colleges in Maharashtra based on previous year's MHT
          CET percentile and ranks. By entering your CET exam percentile and
          reservation category, you can receive a personalized list of colleges in
          Maharashtra where you may have admission opportunities.
        </p>
        <p>
          Our college predictor uses historical cutoff data to generate the option
          form, offering you a list of colleges you may consider. Please proceed
          with filling out the form understanding that cutoffs can change
          annually, and therefore, your actual admission prospects may differ.
        </p>
      </div>

      <hr />

      <div className="accordion">
        {/* Use proper key prop for each item in accordionData */}
        {accordionData.map((item, index) => (
          <Accordion key={index} title={item.title} content={item.content} />
        ))}
      </div>
    </div>
  );
};

export default About;
