import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import CategoryApi from '../../api/CategoryApi';
import BillApi from '../../api/BillApi';
import { useHistory } from "react-router-dom";

function BillCustomerModal({show, setShow, ma, setMa}){
    const history = useHistory();
    const [result, setResult] = useState([]);
    const dong = () => {
        setShow(false);
        // setLoi({});
        setMa(0);
        // setMess({});
    }

    useEffect(() => {
        const fetchList = async () =>{
          try{
            const response = await BillApi.getBillDetailCustomer(ma);
            setResult(response); 
            console.log(response)
          }catch (error){
            console.log(error);
            
          }
        }
        fetchList();
      }, [ma]);

      const chuyentrang = (id) =>{
        history.push('/product/' + id );
      }
    return(
        <div>
        <Modal show={show} onHide={() => dong()} size="lg" >
            <Modal.Header>
                <span>Hóa đơn chi tiết</span>
                <button type="button" class="btn-close" aria-label="Close" onClick={() => dong()}></button>
            </Modal.Header>

            <Modal.Body>
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <td scope="col">Hình ảnh</td>
                        <td scope="col">Tên SP</td>
                        <td scope="col">Giá mua</td>
                        <td scope="col">Số lượng</td>
                        <td scope="col">Tổng tiền</td>
                    </tr>
                </tbody>
                <tfoot style={{height: "10px"}}>
                    {
                        result.map(
                            (result) =>
                                <tr key={result.id} onClick={() => chuyentrang(result.product.id)} style={{cursor: "pointer"}}>
                                    <td><img style={{width: "120px", height: "120px"}} src={'/images/' + result.product.photo} className="body-new-img-pro"  alt="" /></td>
                                    <td>{result.product.name}</td>
                                    <td>{String(Math.round(result.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' đ'}</td>
                                    <td>{result.number}</td>
                                    <td>{String(Math.round(result.total)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' đ'} VNĐ</td>
                                </tr>
                        )              
                    }
                </tfoot>
            </table>
            </Modal.Body>

            <Modal.Footer>
                <button type="button" class="btn btn-primary" onClick={() => dong()}>Đóng</button>
            </Modal.Footer>
        </Modal>
    </div>
    );
}
export default BillCustomerModal;