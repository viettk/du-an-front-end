import axios from "axios";
import React, { useEffect, useState } from "react";
import CartApi from "../../api/CartApi";
import ModalAddress from "./ModalAddress";

function Address() {
    const token = localStorage.token;
    const [result, setResult] = useState([]);
    const [ma, setMa] = useState(0);
    const [show, setShow] = useState(false);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await CartApi.getAddress(1);
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
        axios({
            url: 'http://localhost:8080/dia-chi/'+ id,
            method: 'delete',
            type: 'application/json',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        onReload();
    }
    console.log(reload)
    return (
        <div className="all-dc">
             <ModalAddress show={show} setShow={setShow} ma={ma} setMa={setMa} reload={reload} setReload={setReload}  />
            <button type="button"  onClick={() => getMahidden()} disabled={result.length >= 3 ? "disabled" : ""} > Thêm</button>
            {
                result.map(result =>
                    <div key={result.id} class="dia-chi">
                        <p>Tên người nhận: {result.name}</p>
                        <p>Địa chỉ: {result.address}</p>
                        <p>Số điện thoại: {result.phone}</p>
                        <button type="button" onClick={() => getMa(result.id)} >Chỉnh sửa địa chỉ</button>
                        <button type="button" onClick={() => xoadc(result.id) } >Xóa</button>
                    </div>
                )
            }
        </div>
    );
}
export default Address;