import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CartApi from "../../api/CartApi";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { height } from "@mui/system";

function ListCart() {

    const initValues = [];
    const initParams= {
        cartId: 1
    };

    const [ params, setParams] = useState(initParams);
    const [ result, setResult] = useState(initValues);

    useEffect(() => {
        const fetchList = async () =>{
          try{
            const response = await CartApi(initParams);
            setResult(response);     
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [params, result]);

    return(
        <React.Fragment>
        <h3 style={{marginTop: 10}}>Giỏ hàng của bạn</h3>
        <TableContainer component={Paper}>
        <table className="table table-striped">
                <tbody>
                    <tr>
                        <td scope="col">STT</td>
                        <td scope="col">Hình ảnh</td>
                        <td scope="col">Tên Sản phẩm</td>
                        <td scope="col">Giá</td>
                        <td scope="col">Tổng tiền</td>
                    </tr>
                </tbody>
                <tfoot style={{height: "10px"}}>
                    {
                        result.length ? result.map(
                            (result) =>
                                <tr key={result.id}>
                                    <td>{result.id}</td>
                                    <td>{result.name}</td>
                                    <td>{result.parent_name}</td>
                                </tr>

                        ) : (
                        
                            <div style={{textAlign:"center" ,position: 'absolute' ,left: "50%",  transform: `translate(${-50}%, ${0}px)` }}>Không có dữ liệu</div>
                        )                
                    }
                </tfoot>
            </table>
            </TableContainer>
    </React.Fragment>
    );
}
export default ListCart;