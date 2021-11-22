import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import CategoryApi from '../../api/CategoryApi';
import BillApi from '../../api/BillApi';

function BillCustomerModal({show, setShow, ma, setMa}){
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
    return(
        <div>
        <Modal show={show} onHide={() => dong()} fullscreen={true} >
            <Modal.Header>
                <span>Danh sách Sản phẩm</span>
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
                                <tr key={result.id}>
                                    <td>{result.product.photo}</td>
                                    <td>{result.product.name}</td>
                                    <td>{result.price}  </td>
                                    <td>{result.number}</td>
                                    <td>{result.total} VNĐ</td>
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