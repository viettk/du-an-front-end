import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import CartApi from "../../api/CartApi";
function ModalAddress({ show, setShow, ma, setMa, reload, setReload}) {
    const token = localStorage.token;
    const [tinh, setTinh] = useState([]);
    const [quan, setQuan] = useState([]);
    const [xa, setXa] = useState([]);
    const [mess, setMess] = useState({
        errorMessage: ''
    });
    const [loi, setLoi] = useState({

        id: '',
        name: '',
        parent_name: ''
    });

    const [detail, setDetail] = useState({
        id: '',
        name: '',
        phone: '',
        address: '',
        status: 0,
        customerInput: 1,
    });

    const dong = () => {
        setShow(false);
        setDetail({
            ...detail,
            name: '',
            phone:'',
            address: '',
            status: 0
        });
        setLoi({});
        setMa(0);
        setMess({});
    }
    useEffect(() => {
        const fetchList = async () => {
            try {
                if (ma !== 0 || ma !== undefined) {
                    const resp = await CartApi.getOnAddress(ma);
                    setDetail({
                        id: resp.id,
                        name: resp.name,
                        phone: resp.phone,
                        address: resp.address,
                        status: resp.status,
                        customerInput: resp.customer.id,
                    })
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, [ma]);

    const getInputValue = (e) => {
        const { name, value } = e.target;
        setDetail({
            ...detail,
            [name]: value
        })
    }

    const onReload = () =>{
        if(reload){
            setReload(false);
        } else {
            setReload(true);
        }
    }

    const create = () => {
        if (detail.id == 0 || detail.id == undefined) {
            axios({
                url: 'http://localhost:8080/dia-chi',
                method: 'POST',
                type: 'application/json',
                data: detail,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }).then(resp => {
                setDetail(resp);
                dong();
                onReload();
            }).catch((error) => {
                if (error.response) {
                    setLoi(error.response.data);
                    setMess(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
        } else {
            axios({
                url: 'http://localhost:8080/dia-chi/' + detail.id,
                method: 'PUT',
                type: 'application/json',
                data: detail,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }).then(resp => {
                dong();
                onReload();
            }).catch((error) => {
                if (error.response) {
                    setLoi(error.response.data);
                    setMess(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
        }      
    }
console.log(detail)
    const changeStatus = ()=>{
        if(detail.status == 0){
            setDetail({
                ...detail,
                status: 1
            })
        }
        else{
            setDetail({
                ...detail,
                status: 0
            })
        }
        
    }

    return (
        <div>
            <Modal show={show} onHide={() => dong()}>
                <Modal.Header>
                    {
                        ma == 0 || ma == undefined ? <span>Thêm địa chỉ mới</span> : <span>Cập nhật địa chỉ {detail.name}</span>
                    }
                    <button type="button" class="btn-close" aria-label="Close" onClick={() => dong()}></button>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label >Tên người nhận</label>
                            <input className="form-control" type="text" defaultValue={detail.name} name="name" onChange={getInputValue} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span>
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <div className="form-group">
                            <label>Địa chỉ </label>
                            <input className="form-control" type="text" defaultValue={detail.address} name="address" onChange={getInputValue} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span>
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input className="form-control" type="text" defaultValue={detail.phone} name="phone" onChange={getInputValue} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span>
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <input type="checkbox" id="vehicle1" name="vehicle1" onChange={() => changeStatus(detail.status)} defaultValue={detail.status}
                         checked={detail.status == 0 ? "checked" : ""} />Đặt làm địa chỉ mặc định
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" class="btn btn-primary" onClick={() => create()} >Save</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default ModalAddress;