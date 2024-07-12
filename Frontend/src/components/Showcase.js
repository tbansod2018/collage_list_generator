import "./Showcase.css"
import img from "./Untitled design (3).png"

export default function Showcase() {


  const handleScrollToPosition = () => {
    const scrollToY = 600; 

    window.scrollTo({
      top: scrollToY,
      behavior: 'smooth' 
    });
  };


  return (
    <div className="showcase">
      <div className="title">
        <h1>MHT-CET College Predictor</h1>
      </div>

      <div className="content">
        <div className="img">
        <img src={img} alt="" />
        </div>
        <div className="text">
        <p>
          Giving your exam score will help us recommend you better colleges and
          admissions. If you don’t have actual score, then enter expected score.
        </p>
        <button onClick={handleScrollToPosition} className="btn1">Predict Now!</button>
        
        </div>
      </div>
      
    </div>
    
  );
}
