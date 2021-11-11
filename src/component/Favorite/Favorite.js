import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useHistory, useParams } from "react-router";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import ProductApi from "../../api/ProductApi";


function Favorite(){
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
    const [search, setSearch] = useState({
        name: '',
        parent_name: ''
    });

    useEffect(() => {
        const fetchList = async () =>{
          try{
            const response = await ProductApi.getFavorite(1, params);
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

    return(
        <React.Fragment>
        <h3 style={{marginTop: 10}}>Danh sách Danh mục Sản phẩm</h3>
        <TableContainer component={Paper}>
        <table className="table table-striped">
                <tbody>
                    <tr>
                        <td scope="col">STT</td>
                        <td scope="col">Hình ảnh</td>
                        <td scope="col">Tên Sản phảm</td>
                        <td scope="col">Giá</td>
                        <td scope="col">Sửa</td>
                    </tr>
                </tbody>
                <tfoot style={{height: "10px"}}>
                    {
                        result.map(
                            (result) =>
                                <tr key={result.id}>
                                    <td></td>
                                    <td>{result.product.image}</td>
                                    <td>{result.product.name}</td>
                                    <td>{result.product.price}</td>
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
export default Favorite; 