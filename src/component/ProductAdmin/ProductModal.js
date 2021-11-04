import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import ProductApi from "../../api/ProductApi";
import CategoryApi from "../../api/CategoryApi";

function ProductModal({ show, setShow, ma, setMa }) {

    const [detail, setDetail] = useState({
        id:'',

        category:'',

        name:'',

        status:'',

        price:'',

        createDate:'',

        number:'',

        describe:'',

        photo:''
    });

    const dong = () => {
        setShow(false);
        setDetail({});
        setLoi({});
        setMa(0);
        setMess({});
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


    useEffect(() => {
        const fetchList = async () =>{
          try{
            const response = await CategoryApi.getParent();
            setParent(response);  

            if(ma !== 0 || ma !== undefined ){
                const resp = await ProductApi.getIdProduct(ma);
                setDetail(resp);
                console.log(resp);
            }
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [ma]);


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

    //Thêm mới hoặc Cập nhật Sản phẩm
    const update = () => {
        if(detail.id == 0){
            axios({
                url: 'http://localhost:8080/danh-muc',
                method: 'POST',
                type: 'application/json',
                data: detail,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(resp => {
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
            });
        }
        else{
            axios({
                url: 'http://localhost:8080/danh-muc/'+ detail.id,
                method: 'PUT',
                type: 'application/json',
                data: detail,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(resp => {
                setDetail({
                    ...detail,
                    name: resp.data.name,
                    parent_name: resp.data.parent_name,
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
            });
        }
    }
    return (
        <div>
            <Modal show={show} onHide={() => dong()}>
                <Modal.Header>
                    {
                        ma == 0 || ma == undefined ? <span>Thêm Sản phẩm mới</span> : <span>Cập nhật Sản phẩm {detail.name}</span>
                    }
                    <button type="button" class="btn-close" aria-label="Close" onClick={() => dong()}></button>
                </Modal.Header>

                <Modal.Body>
                    <form>

                        <div className="form-group">
                            <label>Tên Sản phẩm</label>
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

                        <div className="form-group">
                            <label>Trạng thái</label>
                            <input className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <div className="form-group">
                            <label>Số lượng</label>
                            <input className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <div className="form-group">
                            <label>Giá bán</label>
                            <input className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <div className="form-group">
                            <label>Mô tả</label>
                            <textarea className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <div className="form-group">
                            <label>Ngày tạo</label>
                            <input className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <div className="form-group">
                            <label>Mã SKU</label>
                            <input className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <div className="form-group">
                            <label>Ngày phát hành</label>
                            <input className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <div className="form-group">
                            <label>Giá phát hành</label>
                            <input className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <div className="form-group">
                            <label>Cân nặng</label>
                            <input className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <div className="form-group">
                            <label>Chiều dài</label>
                            <input className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <div className="form-group">
                            <label>Chiều cao</label>
                            <input className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>

                        <div className="form-group">
                            <label>Length</label>
                            <input className="form-control" type="text" onChange={(e) => updateName(e)} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span> 
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" class="btn btn-primary" onClick={() => update()} >Save</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default ProductModal;