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
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductApi from "../../api/ProductApi";
import { useParams, useLocation, useHistory } from "react-router-dom";

function ProductAd(){
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
        categoryId: '',
        name:'',
        price:'',
        create_date:''
    });

    // lấy id sản phẩm
    const [ma, setMa] = useState(0);


    // Mở modal
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchList = async () =>{
          try{
            const response = await ProductApi.getAll(params, search.name, search.price, search.categoryId, search.create_date);
            setResult(response.content);      
            setCount(response.totalPages);
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [params, result]);

      const handleChange = (event, value) => {
        history.push("/admin/san-pham" + value);
        setPage(value);
        setParams(
            {
                _limit : '5',
                _page : value-1,
            }
        );       
      };
      
      const getMa = (id) =>{
        setShow(true);
        setMa(id);
      }

      const closeModal = () => {
          setShow(false);
          setMa(0);
      }

      const getSearchName = (e) => {
        const newvalue = e.target.value;
        setSearch({
            ...search,
            name: newvalue,
        });
    }

    const getSearchParent_name = (e) => {
        const newvalue = e.target.value;
        setSearch({
            ...search,
            parent_name: newvalue,
        });

    }
    return(
        <React.Fragment>
             {/* <Modaldm show={show} setShow={setShow} ma={ma} setMa={setMa}  /> */}
        <h3 style={{marginTop: 10}}>Danh sách Danh mục Sản phẩm</h3>
        <TableContainer component={Paper}>
        <button className="btn btn-primary" onClick={() => getMa()} >Thêm mới</button>
        <table className="table table-striped">
            <thead>
                <tr>
                    <td></td>
                    <td><input onChange={(e) => getSearchName(e)} type='text' /></td>
                    <td><input onChange={(e) => getSearchParent_name(e)} type='text' /></td>
                </tr>
            </thead>
                <tbody>
                    <tr>
                        <td scope="col">STT</td>
                        <td scope="col">Tên Sản phẩm</td>
                        <td scope="col">Danh mục</td>
                        <td scope="col">Giá</td>
                        <td scope="col">Ngày tạo</td>
                        <td scope="col">Số lượng</td>
                        <td scope="col">Ảnh</td>
                        <td scope="col">Trạng thái</td>
                        <td scope="col">Sửa</td>
                    </tr>
                </tbody>
                <tfoot style={{height: "10px"}}>
                    {
                        xpage > 0 && xpage <= count ? result.map(
                            (result) =>
                                <tr key={result.id}>
                                    <td>{result.id}</td>                                  
                                    <td>{result.name}</td>
                                    <td>{result.category.name}</td>
                                    <td>{result.price}</td>
                                    <td>{result.create_date}</td>
                                    <td>{result.number}</td>
                                    <td><img src="" /></td>
                                    <td>
                                        {
                                            result.status == true ? <span class="dang-ban">Đang bán</span> : <span class="dung-ban">Dừng bán</span>
                                        }
                                    </td>
                                    <td><button type="button" class="btn btn-primary" onClick={() => getMa(result.id)}>Sửa</button></td>    
                                </tr>

                        ) : (
                        
                            <div style={{textAlign:"center" ,position: 'absolute' ,left: "50%",  transform: `translate(${-50}%, ${0}px)` }}>Không có dữ liệu</div>
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
export default ProductAd;