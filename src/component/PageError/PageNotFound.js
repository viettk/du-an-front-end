import React from 'react';
import './errorpage.css';

function PageNotFound() {
    return (
        <div>
        <div id="background" />
        <div className="top">
          <h1>404</h1>
          <h3>Không tìm thấy trang</h3>
        </div>
        <div className="container">
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
          <div className="shadow" />
        </div>
        <a href="" style={{position: 'absolute',left: "50%",  transform: `translate(${-50}%, ${0}px)` }}> ← Quay lại Trang chủ</a>
      </div>

    );
}
export default PageNotFound;