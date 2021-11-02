import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CategoryApi from "../../api/CategoryApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Category.css';
import { useParams, useLocation, useHistory } from "react-router-dom";
import Modaldm from "./Modaldm";

function ListCategory() {
    const {xpage}= useParams();
    let history = useHistory();
    
    const initValues = [];
    const initParams= {
        _limit : '5',
        _page : (xpage-1),
        _field : 'id',
        _known : 'up',
    };

    if(xpage <= 0 ){
        initParams._page = 1;   
    }


    const [ params, setParams] = useState(initParams);
    const [ result, setResult] = useState(initValues);
    const [ page, setPage] = useState(0);
    const [ count, setCount] = useState(0);


    // Mở modal
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchList = async () =>{
          try{
            const response = await CategoryApi.getAll(params);
            setResult(response.content);      
            setCount(response.totalPages);
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [params]);

      const handleChange = (event, value) => {
        history.push("/danh-muc/" + value);
        setPage(value);
        setParams(
            {
                _limit : '5',
                _page : value-1,
                _field : 'id',
                _known : 'up',
            }
        );       
      };
      
      const getMa = (id) =>{
        setShow(true);
      }

      const closeModal = () => {
          setShow(false);
      }
    return(
        <React.Fragment>
             <Modaldm show={show,setShow} />
        <h3>Demo phan trang</h3>
        <TableContainer component={Paper}>
        <button className="btn btn-primary" onClick={() => getMa()} >Thêm mới</button>
        <table className="table table-striped">
                <thead>
                    <tr>
                        <td scope="col">STT</td>
                        <td scope="col">Tên Danh mục</td>
                        <td scope="col">Danh mục cha</td>
                        <td scope="col">Sửa</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        xpage > 0 &&  (xpage - 1) <= Math.ceil(result.length / params._limit) ? result.map(
                            (result) =>
                                <tr key={result.id}>
                                    <td>{result.id}</td>
                                    <td>{result.name}</td>
                                    <td>{result.parent_name}</td>
                                    <td><button type="button" class="btn btn-primary">Sửa</button></td>    
                                </tr>

                        ): <div className="unknow">Không có dữ liệu</div>
                    }
                </tbody>
            </table>
            </TableContainer>
            <Stack spacing={2}>
                <Pagination className="pagination" count={count}  page={page} onChange={handleChange}  color="secondary"/>
            </Stack>
    </React.Fragment>
    );
}
export default ListCategory;