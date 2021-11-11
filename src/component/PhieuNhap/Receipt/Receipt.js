import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useHistory, useParams } from "react-router";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import ReceiptApi from "../../../api/ReceiptApi";
import { create } from "@mui/material/styles/createTransitions";
import axios from "axios";


function Receipt(){
    const {xpage}= useParams();
    let history = useHistory();

    const initValues = [];
    const initParams= {
        _limit : '5',
        _page : (xpage-1),
        _field: 'id',
        _known: 'up'
    };

    const [ params, setParams] = useState(initParams);
    const [ result, setResult] = useState(initValues);
    const [ page, setPage] = useState(initParams._page + 1);
    const [ count, setCount] = useState(0);
    // const [search, setSearch] = useState({
    //     name: '',
    //     parent_name: ''
    // });

    useEffect(() => {
        const fetchList = async () =>{
          try{
            const response = await ReceiptApi.getReceipt(params);
            setResult(response.content);    
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [params, result]);

      const handleChange = (event, value) => {
        history.push("/danh-muc/" + value);
        setPage(value);
        setParams(
            {
                _limit : '5',
                _page : value-1,
            }
        );       
        console.log(page);
      };

      const create = ()=>{
          const reipt = {
            staffId: 1,
            describe: describe.mota
          }
        axios({
            url: 'http://localhost:8080/api/receipt',
            method: 'POST',
            type: 'application/json',
            data: reipt,
            headers: {
                'Content-Type': 'application/json',
            }
        })
      }

      const [describe, setDescribe] = useState({
          mota:''
      });
      const update =(e) =>{
        setDescribe({
            ...describe,
            mota: e.target.value
        })
      }

      const updateDescripbe = (e, id)=>{
        axios({
            url: 'http://localhost:8080/api/receipt/'+ id,
            method: 'get',
            type: 'application/json',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp =>{
            const data = {
                staffId: 1,
                describe: e.target.value
            }
            axios({
                url: 'http://localhost:8080/api/receipt/'+ id,
                method: 'put',
                type: 'application/json',
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        })
      }

    return(
        <React.Fragment>
        <h3 style={{marginTop: 10}}>Danh sách Phiếu nhập</h3>
        <TableContainer component={Paper}>
        <div>
            <label>Tạo phiếu nhập mới</label>
            <textarea name="describecreate" onChange={update}>Ghi chú</textarea>
            <button onClick={() => create()}>Tạo</button>
        </div>
        <table className="table table-striped">
                <tbody>
                    <tr>
                        <td scope="col">Mã Phiếu nhập</td>
                        <td scope="col">Ngày tạo</td>
                        <td scope="col">Mô tả</td>
                        <td scope="col">Thành tiền</td>
                        <td scope="col">Sửa</td>
                    </tr>
                </tbody>
                <tfoot style={{height: "10px"}}>
                    {
                        result.map(
                            (result) =>
                                <tr key={result.id}>
                                    <td>{result.id_code}</td>
                                    <td>{result.create_date}</td>
                                    <td><input name="describe" defaultValue={result.describe} onChange={(e)=> updateDescripbe(e, result.id)}  /></td>
                                    <td>{result.total}</td>
                                    <td>
                                        <button>Xóa</button>
                                    </td>
                                </tr>

                        )              
                    }
                </tfoot>
            </table>
            </TableContainer>
            <Stack spacing={2}>
                <Pagination className="pagination" count={count}  page={page} onChange={handleChange}  color="secondary"/>
            </Stack>
    </React.Fragment>
    );
}
export default Receipt; 