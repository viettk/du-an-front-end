import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import CategoryApi from '../../api/CategoryApi';
import { Alert, Snackbar } from '@mui/material';


function Modaldm({ show, setShow, ma, setMa , reload, setReload}) {

    const [detail, setDetail] = useState({
        id: '',
        name: '',
        parent_name: null
    });

    const dong = () => {
        setShow(false);
        setLoi({});
        setMess({})
        setDetail({});
        setMa(0);
    }

    const [ parent, setParent ] = useState([]);

    //Thông báo lỗi
    const [mess, setMess] = useState({
        errorMessage: ''
    });
    const [loi, setLoi] = useState({
        name: '',
        parent_name: ''
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchList = async () =>{
          try{
              const response = await CategoryApi.getParent();
              setParent(response);
              if(ma != undefined || ma != undefined){
                const resp = await CategoryApi.getIdCategory(ma);
                setDetail(resp);
              } else {
                  setDetail({
                    id: '',
        name: '',
        parent_name: null  
                  })
              }
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [ma, reload]);
    //lấy dữ liệu từ input
    const updateName = (e) => {
        const newvalue = e.target.value;
        setDetail({
            ...detail,
            name: newvalue,
        });
    }

    const updateParent = (e) => {
        const newvalue = e.target.value;
        setDetail({
            ...detail,
            parent_name: newvalue,
        });
    }
    
    const onReload = () =>{
        if(reload){
            setReload(false);
        } else {
            setReload(true);
        }
    }

    //Thêm mới hoặc Cập nhật Sản phẩm
    const update = () => {
        if(detail.id == 0 || detail.id == undefined){
            try {
                CategoryApi.postDm(detail).then(resp => {
                    setDetail(resp);          
                    dong(); 
                    setOpen(true);
                }).catch((error) => {
                    console.log(error.response.data)
                    if (error.response) {
                        setLoi(error.response.data);
                        setMess(error.response.data);
                    } else if (error.request) {
                        console.log(error.request );
                    } else {
                        console.log('Error', error.message.data);
                    }
                });
            } catch (error) {
                console.error(error)
            }
            onReload();
        }
        else{
            try {
                CategoryApi.putDm(detail.id, detail).then(resp => {
                    setDetail({
                        ...detail,
                        name: resp.name,
                        parent_name: resp.parent_name,
                    });
                    dong(); 
                    setOpen(true);
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

    const handleClose = () =>{
        setOpen(false);
    }
    return (
        <div>
            <Modal show={show} onHide={() => dong()}>
                <Modal.Header>
                    {
                        ma == 0 || ma == undefined ? <span>Thêm danh mục mới</span> : <span>Cập nhật danh mục {detail.name}</span>
                    }
                    <button type="button" class="btn-close" aria-label="Close" onClick={() => dong()}></button>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Tên Danh mục</label>
                            <input className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>
                        <div className="form-group">
                            <label>Danh mục cha</label>
                            <select class="form-select form-select-sm" aria-label=".form-select-sm example" onChange={(e)=>updateParent(e)} value={detail.parent_name}>
                                        <option>Chọn</option>
                                {
                                    parent.map(parent => (
                                        <option key={parent} >{parent}</option>
                                    ))
                                }
                            </select>
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.parent_name}</span>
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" class="btn btn-primary" onClick={() => update()} >Lưu</button>
                </Modal.Footer>
            </Modal>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Thao tác thành công!
                </Alert>
            </Snackbar>
        </div>
    );
}
export default Modaldm;