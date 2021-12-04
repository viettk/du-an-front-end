import axios from "axios";
import React, { useEffect, useState } from "react";
import AddressApi from "../../api/AddressApi";
import CartApi from "../../api/CartApi";
import CookieService from "../../cookie/CookieService";
import ModalAddress from "./ModalAddress";
import './adress.css';

function Address() {
    const token = localStorage.token;
    const [result, setResult] = useState([]);
    const [ma, setMa] = useState(0);
    const [show, setShow] = useState(false);
    const [reload, setReload] = useState(true);
    const emailc = CookieService.getCookie('email');
    const customerId = CookieService.getCookie('id');

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await CartApi.getAddress(customerId, emailc);
                console.log(response)
                setResult(response)
            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, [reload]);

    const getMa = (id) =>{
        setShow(true);
        setMa(id);
      }


    const getMahidden = () =>{
        setMa(0);
        setShow(true);
    }


    const onReload = () =>{
        if(reload){
            setReload(false);
        } else {
            setReload(true);
        }
    }

    const xoadc = (id)=>{
        AddressApi.xoadc(id, emailc).then(resp =>{
            onReload();
        });    
    }

    return (
        <div className="all-dc">
             <ModalAddress show={show} setShow={setShow} ma={ma} setMa={setMa} reload={reload} setReload={setReload}  />
            <span className='add-rigth'>
                <button type="button" className="btn btn-danger addAdress"  onClick={() => getMahidden()} disabled={result.length >= 3 ? "disabled" : ""} > Thêm</button>
            </span>
            {
                result.map(result =>
                    <div className="add-information" key={result.id}>
                        <span>
                            <p className="thanh-p-address">Tên người nhận: </p>
                            <p className="thanh-p-address">Địa chỉ: </p>
                            <p className="thanh-p-address">Số điện thoại: </p>
                        </span>
                        <div>
                            <p className="add-right">{result.name}</p>
                            <p className="add-right">{result.address}</p>
                            <p className="add-right">{result.phone}</p>
                        </div>
                        <div className="add-function">
                            <button type="button" className="btn btn-default add-add" onClick={() => getMa(result.id)} ><i class="fa fa-edit"></i></button>
                            <br/>
                            <button type="button" className="btn btn-default add-delete" onClick={() => xoadc(result.id)} ><i class="fa fa-trash"></i></button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
export default Address;