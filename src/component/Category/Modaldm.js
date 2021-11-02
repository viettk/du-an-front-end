
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'react-bootstrap';


function Modaldm({show ,setShow}){

    const dong = () => {
        setShow(false);
    }

    return(
        <div>
        <Modal show={show} onHide={() => dong()}>
            <Modal.Header>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <div className="form-group">

                    </div>
                    <div className="form-group">
                      
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button >Save</button>
            </Modal.Footer>
        </Modal>
    </div>
    );
}
export default Modaldm;