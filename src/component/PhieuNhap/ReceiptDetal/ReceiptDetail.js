import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Stack } from 'react-bootstrap';
import ReceiptApi from '../../../api/ReceiptApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { display } from '@mui/system';
import './ReceiptDetail.css';
import { confirmAlert } from 'react-confirm-alert';
import { Pagination } from '@mui/material';


function ReceiptDetail({ show, setShow, ma, setMa, reload, setReload }) {
    const onReload = () =>{
        if(reload == true){
            setReload(false);
        } else{
            setReload(true);
        }
    }
    const [load, setLoad] = useState(true);

    const onLoad = () =>{
        if(load == false){
            setLoad(true);
        } else{
            setLoad(false);
        }
    }
    const [input, setInput] = useState({
        productId:'',
        receiptId: '',
        number:'',
        price: ''
    });
    const [result, setResult] = useState([]);
    const initParams= {
        _limit : '5',
        _page : 0,
        _field: 'product.name',
        _known: 'up'
    };
    const [imgpro, setImgpro] = useState({
        img: ''
    });
    const [search, setSearch] = useState({
        sku: '',
        productName: ''
    })
    const [ page, setPage] = useState(initParams._page + 1);
    const [ count, setCount] = useState(0);
    const [params, setParams] = useState(initParams);
    const dong = () => {
        setShow(false);
        onReload();
        setInput({})
        // setDetail({});
        setLoi({
            productId: '',
            number: '',
            price: ''
        });
        // setMa(0);
        setMess({errorMessage: ''});
    }
    const [active, setActive] = useState(false); 
    const [product, setProduct] = useState([]);

    const [mess, setMess] = useState({
        errorMessage: ''
    });
    const [loi, setLoi] = useState({
        productId: '',
        number: '',
        price: ''
    });
    const searchname = (e) =>{
        const {name, value} = e.target;
        setSearch({
            ...search,
            [name]: value,
        });
        setParams({
            ...params,
            _page: 0
        });
        setPage(1);
    }

    useEffect(() => {
        const fetchList = async () =>{
          try{
            const response = await ReceiptApi.getReceiptDetail(ma, params, search.sku, search.productName);
            setResult(response.content); 
            setCount(response.totalPages);
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [ input, search, ma, load, params]);

    const [click, setClick] = useState(false);
    const addToReceiptDetail = (id) => {
        const sp = {
            productId: a.idpro,
            receiptId: input.receiptId,
            number: input.number,
            price: input.price
        }
        if(click == false){
            ReceiptApi.postReceiptDetail(sp).then(resp=>{
                clearForm(); 
                setLoi({
                    productId: '',
                    number: '',
                    price: ''
                });
                setMess({
                    errorMessage: ''
                })
            }).catch((error) => {
                if (error.response) {
                    setLoi(error.response.data);
                    setMess(error.response.data);
                    console.log(error.response.data)
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
        } else{         
            ReceiptApi.putReceiptDetail(getId, sp).then(resp=>{
                clearForm();
                setLoi({
                    productId: '',
                    number: '',
                    price: ''
                });
                setMess({
                    errorMessage: ''
                })
            }).catch((error) => {
                if (error.response) {
                    setLoi(error.response.data);
                    setMess(error.response.data);
                    console.log(error.response.data)
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
        }
    }
    const getInputValue = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            receiptId: ma,
            productId: '',
            [name]: value
        });
        setActive(false);
    }

    const getInputname = (e) =>{
        setInput({
            ...input,
            productId: e.target.value
        })
        setActive(true);
        if(input.productId != null){
            ReceiptApi.getProductNameOfReceiptDetail(e.target.value).then(resp => {
               setProduct(resp);   
            });
        } 
    }
    
    const clearForm = () =>{
        document.getElementById("form-receipt-submit").reset();
        setInput({
            ...input,
            price: '',
            number: ''
        });

        setImgpro({
            ...imgpro,
            img: ''
        })
        setClick(false);
    }

    const [a, setA] = useState({
        idpro: ''
    });
    const layId = (e, id, photo) =>{
       document.getElementById('namesp').value = e.target.innerHTML;
       setActive(false);
        setA({
            ...a,
            idpro: id
        });
        setImgpro({
            ...imgpro,
            img: photo
        })
    }
    const [getId, setGetId] = useState({
        id: ''
    })
    const edit = (e, id)=>{
        axios({
            url: 'https://tranhoangmaianh.herokuapp.com/receiptDetail/get/'+ id,
            method: 'GET',
            type: 'application/json',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => {
           setInput(resp.data);
           document.getElementById('namesp').value = resp.data.product.name;
           setA({
               ...a,
               idpro: resp.data.product.id
           })
        })
        setClick(true)
        setGetId(id);
    }

    const xoa = (id) =>{
        ReceiptApi.deleteReceiptDetail(id, ma).catch((error) => {
            if (error.response) {
                setLoi(error.response.data);
                setMess(error.response.data);
                console.log(error.response.data)
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });
         onLoad();
    }
    const handleChange = (event, value) => {
        setPage(value);
        setParams(
            {
                _limit : '5',
                _page : value-1,
            }
        );       
      };
      const changeAc = () =>{
          setActive(false)
      }
      const nameSort = (field) =>{
        if(params._known == 'up'){
            setParams({
                ...params,
                _field: field,
                _known: 'down'
            })
        } else {
            setParams({
                ...params,
                _known: 'up'
            })
        }
    }

    const priceSort = (field) =>{
        if(params._known == 'up'){
            setParams({
                ...params,
                _field: field,
                _known: 'down'
            })
        } else {
            setParams({
                ...params,
                _known: 'up'
            })
        }
    }

    const totalSort = (field) =>{
        if(params._known == 'up'){
            setParams({
                ...params,
                _field: field,
                _known: 'down'
            })
        } else {
            setParams({
                ...params,
                _known: 'up'
            })
        }
    }
    
    return (
        <div className="ok" >         
            <Modal show={show} onHide={() => dong()} fullscreen={true} >
                <Modal.Header>
                    <span className="titele-name">Phiếu nhập chi tiết</span>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => dong()}></button>
                </Modal.Header>

                <Modal.Body onClick={changeAc}>
                    <div className ="form-receipt">
                    <form id="form-receipt-submit">
                        <div className="information">
                            <div className="form-group" style={{position: "relative"}} >
                                <div className="user-box">
                                    <input id="namesp" type="text" name="productId" autoComplete = "off" onChange={getInputname} required />
                                    <label>Sản phẩm</label>
                                </div>
                                <div className={ active == true ? "receipt-hiddent-show-m active" : "receipt-hiddent-show-m"} >
                                    <ul className="receipt-product-name" >
                                    {
                                        product.length != 0 ? product.map(pr =>
                                            <li key={pr.id} defaultValue={pr.id} onClick={(e) => layId(e, pr.id, pr.photo)}>{pr.name}-Danh mục: {pr.category.name}-Danh mục cha: {pr.category.parent_name}</li>    
                                        ) : <li>Không có Sản phẩm</li>
                                        
                                    }
                                    </ul>
                                </div>
                                <span style={{ color: "red", fontSize: "13px" }}>{loi.productId}</span> 
                            </div>
                            <div className="form-group">
                                <div className="user-box">
                                    <input type="text" name="number" defaultValue={input.number} onBlur={getInputValue} onChange={getInputValue} required />
                                    <label>Số lượng</label>
                                </div>
                                <span style={{ color: "red", fontSize: "13px" }}>{loi.number}</span> 
                            </div>

                            <div className="form-group">
                                <div className="user-box">
                                    <input type="text" name="price" value={input.price} onBlur={getInputValue} onChange={getInputValue} required />
                                    <label>Giá nhập</label>
                                </div>
                                <span style={{ color: "red", fontSize: "13px" }}>{loi.price}</span> 
                            </div>
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span> 
                        </div>
                        
                        <button type="button" className="button-them" onClick={() => addToReceiptDetail()} >Thêm</button>
                        <button type="button" className="button-them" onClick={clearForm}>Clear</button>
                    </form>

                    <div>
                        <p>Hình ảnh</p>
                        {imgpro.img === '' ? <span>Không có hình ảnh</span> : <img src={'/images/' + imgpro.img} className='img-goi-y-product' /> }
                    </div>
                    </div>
                    <div className="table-receipt">
                        <table className="table table-striped">
                        <thead>
                <tr>
                    
                </tr>
            </thead>
                <tbody>
                    
                    <tr>
                        <td scope="col">STT</td>
                        <td scope="col">Hình ảnh</td>
                        <td scope="col">Mã SKU</td>
                        <td scope="col">Tên <i class={ params._known == 'up' && params._field =='product.name' ? "fa fa-angle-up searh-icon" : "fa fa-angle-down searh-icon"} onClick={() => nameSort("product.name")}></i></td>
                        <td scope="col">Giá Nhập <i class={ params._known == 'up' && params._field =='price' ? "fa fa-angle-up searh-icon" : "fa fa-angle-down searh-icon"  } onClick={() => priceSort("price")}></i></td>
                        <td scope="col">Số lượng <i class={ params._known == 'up' && params._field =='total' ? "fa fa-angle-up searh-icon" : "fa fa-angle-down searh-icon"  } onClick={() => totalSort("total")}></i></td>
                        <td scope="col">Tổng tiền</td>
                        <td scope="col">Xóa</td>
                    </tr>
                    <tr>
                        <td scope="col"></td>
                        <td scope="col"></td>
                        <td scope="col"> <input onChange={(e) => searchname(e) } name="sku" value={search.sku}  /> </td>
                        <td scope="col"> <input onChange={(e) => searchname(e) } name="productName" value={search.productName} /> </td>
                        <td scope="col"></td>
                        <td scope="col"></td>
                        <td scope="col"></td>
                        <td scope="col"></td>
                    </tr>
                </tbody>
                <tfoot style={{height: "10px"}}>
                    {
                        result.map(
                            (result, index) =>
                                <tr key={result.id}>
                                    <td>{index + 1}</td>
                                    <td>{result.product.photo}</td>
                                    <td>{result.product.sku}</td>
                                    <td>{result.product.name}</td>
                                    <td>{String(Math.round(result.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' VNĐ'}</td>
                                    <td>{result.number}</td>
                                    <td>{String(Math.round(result.total)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' VNĐ'}</td>
                                    <td>
                                        <button onClick={(e) => edit(e , result.id, result.product.photo)} type="button" style={{border: "none", marginRight: "5px", backgroundColor: "#579fe1", padding: 0}}><i className="fa fa-edit rece"></i></button>
                                        <button onClick={() => {if(window.confirm('Bạn có muôn xóa chứ')){xoa(result.id)};}}  type="button" style={{border: "none", backgroundColor: "red", padding: 0}} ><i className="fa fa-trash rece"></i></button>
                                    </td>    
                                </tr>

                        )              
                    }
                </tfoot>
                        </table>
                    </div>
                    <Stack spacing={2} style={{position: "relative"}}>
                <Pagination className="d-flex justify-content-center" count={count} page={page} onChange={handleChange} color="secondary" />
            </Stack>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default ReceiptDetail;