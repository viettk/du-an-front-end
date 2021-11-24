import React from 'react';
import './pageError.css';

function PageNotFound() {
  return (
    <div style={{ display: "grid", marginTop: "120px" }}>
      <div className="top" style={{ textAlign: "center", position: "absolute", top: "190px", left: "44%" }}>
        <h1>404</h1>
        <h3>page not found</h3>
      </div>
      <div>
        <div className="ghost-copy">
          <div className="one" />
          <div className="two" />
          <div className="three" />
          <div className="four" />
        </div>
        <div className="ghost">
          <div className="face">
            <div className="eye" />
            <div className="eye-right" />
            <div className="mouth" />
          </div>
        </div>
        <div className="shadow" >
          <button className="er-button" type="button" style={{ marginTop: "30px" }}>Quay lại ♡</button>
        </div>
      </div>
    </div>

  );
}
export default PageNotFound;