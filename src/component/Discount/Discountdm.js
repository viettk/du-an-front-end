import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import DiscountApi from '../../api/DiscountApi';


function Discountdm({ show, setShow, ma, setMa , reload , setReload}) {
    const [detail, setDetail] = useState({
        id: '',
        name: '',
        valueDiscount:'',
        number:'',
        open_day:'',
        end_day:''
    });

    const dong = () => {
        setShow(false);
        setDetail({});
        setLoi({});
        setMa(0);
        setMess({});
    }

    //Thông báo lỗi
    const [mess, setMess] = useState({
        errorMessage: ''
    });
    const [loi, setLoi] = useState({
        name: '',
        valueDiscount:'',
        number:'',
        open_day:'',
        end_day:''
    });


    useEffect(() => {
        const fetchList = async () =>{
          try{
            if(ma !== 0 ){
                const resp = await DiscountApi.getIdDiscount(ma);
                setDetail(resp);
            }
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [ma, reload]);

      const onReload = () =>{
        if(reload){
            setReload(false);
        } else {
            setReload(true);
        }
    }
    //lấy dữ liệu từ input
    const updateName = (e) => {
        const newvalue = e.target.value;
        setDetail({
            ...detail,
            name: newvalue,
        });
    }

    const updatevalueDiscount = (e) => {
        const newvalue = e.target.value;
        setDetail({
            ...detail,
            valueDiscount: newvalue,
        });
    }
    const updatenumber = (e) => {
        const newvalue = e.target.value;
        setDetail({
            ...detail,
            number: newvalue,
        });
    }
    const updateopen_day = (e) => {
        const newvalue = e.target.value;
        setDetail({
            ...detail,
            open_day: newvalue,
        });
    }
    const updateend_day = (e) => {
        const newvalue = e.target.value;
        setDetail({
            ...detail,
            end_day: newvalue,
        });
    }
    //Thêm mới hoặc Cập nhật Sản phẩm
    const update = () => {
        if(detail.id == 0 || detail.id == undefined ){
            try {
                DiscountApi.postDiscount(detail).then(resp => {
                    setDetail(resp);
                    dong();
                }).catch((error) => {
                    if (error.response) {
                        setLoi(error.response.data);
                        setMess(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                });;
            } catch (error) {
                console.error(error)
            }
        }
        else{
            try {
                DiscountApi.putDiscount(detail.id, detail).then(resp => {
                    setDetail({
                        ...detail,
                        name: resp.name,
                        valueDiscount:resp.valueDiscount,
                        number:resp.number,
                        open_day:resp.open_day,
                        end_day:resp.end_day,
                    });
                    dong();
                }).catch((error) => {
                    if (error.response) {
                        setLoi(error.response.data);
                        setMess(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                });;
            } catch (error) {
                console.error(error)
            }
        }
        onReload();
    }
    return (
        <div>
            <Modal show={show} onHide={() => dong()}>
                <Modal.Header>
                    {
                        ma == 0 || ma == undefined ? <span>Thêm phiếu giảm giá</span> : <span>Cập nhật phiếu giảm giá {detail.name}</span>
                    }
                    <button type="button" class="btn-close" aria-label="Close" onClick={() => dong()}></button>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Tên</label>
                            <input className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                        </div>
                        <div className="form-group">
                            <label>Giá giảm</label>
                            <input className="form-control" type="text" onChange={(e) => updatevalueDiscount(e)} value={detail.valueDiscount} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.valueDiscount}</span>
                        </div>
                        <div className="form-group">
                            <label>Số lượng</label>
                            <input className="form-control" type="text" onChange={(e) => updatenumber(e)} value={detail.number} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.number}</span>
                        </div>
                        <div className="form-group">
                            <label>Ngày bắt đầu</label>
                            <input className="form-control" type="date" onChange={(e) => updateopen_day(e)} value={detail.open_day} />
<span style={{ color: "red", fontSize: "13px" }}>{loi.open_day}</span>
                        </div>
                        <div className="form-group">
                            <label>Ngày kết thúc</label>
                            <input className="form-control" type="date" onChange={(e) => updateend_day(e)} value={detail.end_day} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.end_day}</span>
                        </div>
                    </form>                          
                     <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                            
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" class="btn btn-primary" onClick={() => update()} >Lưu</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default Discountdm;
