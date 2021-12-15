// import React, { useEffect, useState } from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import FormProduct from './FormProduct';
// import { Box } from '@mui/system';
// import Filter from './Filter';
// import DetailProduct from './DetailProduct';
// import { Button } from 'react-bootstrap';
// import ProductApi from '../../api/ProductApi';
// import CategoryApi from '../../api/CategoryApi';
// import { Checkbox } from '@mui/material';


// export default function Product() {
//     const initValues = [];
//     const initParams = {
//         _limit: '10',
//         _page: 0,
//         _field: 'id',
//         _known: 'up'
//     };
//     // phân trang
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     //biến lưu các id sản phẩm ẩn hiện
//     const [ids, setIds] = useState([]);
//     // biến lấy thông tin sp ghép vào thông báo
//     const [thongBao, setThongBao] = useState({ id: '' });
//     // biến show dialog
//     const [log, setLog] = useState(false);
//     // biến show thông báo thực hiện thành công
//     const [open, setOpen] = useState(false);
//     const [params, setParams] = useState(initParams);
//     const [result, setResult] = useState(initValues);
//     const [count, setCount] = useState(0);
//     // biến load lại trang
//     const [load, setLoad] = useState(false);

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//         setParams({
//             ...params,
//             _page: newPage,
//         })
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setParams({
//             ...params,
//             _page: '0',
//             _limit: parseInt(event.target.value, 10),
//         })
//     };

//     const onLoad = () => {
//         if (load) {
//             setLoad(false)
//         } else {
//             setLoad(true)
//         }
//     }
//     //lấy danh sách danh mục
//     const [parent, setParent] = useState([]);
//     const [search, setSearch] = useState({
//         categoryName: '',
//         name: '',
//         create_date: '',
//         price: '',
//         status: ''
//     });

//     const paramsChange = (event) => {
//         const { name, value } = event.target;
//         // setPage(1)
//         // setParams({...params, _page: 0})
//         setSearch({
//             ...search,
//             [name]: value
//         });
//     };
//     useEffect(() => {
//         const fetchList = async () => {
//             try {
//                 const response = await ProductApi.getAll(params, search.name, search.price, search.categoryName, search.create_date, search.status);
//                 setResult(response.content);
//                 setCount(response.totalElements);
//                 const resp = await CategoryApi.getParent();
//                 setParent(resp);

//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchList();
//     }, [search, load]);
//     return (
//         <React.Fragment>
//             <Box sx={{ marginBottom: 2 }}>
//                 <Filter />
//             </Box>
//             <Box sx={{ marginBottom: 2 }}>
//                 <FormProduct 
//                     category={parent}
//                 />
//             </Box>
//             <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                 <TableContainer sx={{ minHeight: 440 }}>
//                     <Table stickyHeader aria-label="sticky table">
//                         <TableHead style={{ background: "#ccc" }}>
//                             <TableRow>
//                                 <TableCell>Stt</TableCell>
//                                 <TableCell>Mã sản phẩm</TableCell>
//                                 <TableCell>Tên sản phẩm</TableCell>
//                                 <TableCell>Ảnh</TableCell>
//                                 <TableCell>Giá</TableCell>
//                                 <TableCell>Danh mục</TableCell>
//                                 <TableCell>Giảm giá</TableCell>
//                                 <TableCell>Ngày tạo</TableCell>
//                                 <TableCell>Số lượng</TableCell>
//                                 <TableCell>Trạng thái</TableCell>
//                                 <TableCell>Hoạt động</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {
//                                 result.length > 0 ? result.map(
//                                     (result, index) =>
//                                         <TableRow className="sp" key={result.id} >
//                                             <TableCell>{index + 1}</TableCell>
//                                             <TableCell>{result.sku}</TableCell>
//                                             <TableCell><img src={'https://tranhoangmaianh.herokuapp.com/images/' + result.photo} style={{ width: 100 }} /></TableCell>
//                                             <TableCell>{result.name}</TableCell>
//                                             <TableCell>{result.category.name}</TableCell>
//                                             <TableCell>{String(Math.round(result.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' đ'}</TableCell>
//                                             <TableCell>{(result.value_extra) ? result.value_extra : '0'}%</TableCell>
//                                             <TableCell>{(result.createDate.split('T')[0]).split('-').reverse().join('-')}</TableCell>
//                                             <TableCell>{result.number}</TableCell>
//                                             <TableCell>
//                                                 <Button variant="contained" color="success">
//                                                     Xem
//                                                 </Button>

//                                                 <Button variant="contained" >ok</Button>
//                                             </TableCell>
//                                             <TableCell><Checkbox /></TableCell>
//                                         </TableRow>

//                                 ) : (

//                                     <div style={{ textAlign: "center", position: 'absolute', left: "50%", transform: `translate(${-50}%, ${0}px)` }}>Không có dữ liệu</div>
//                                 )
//                             }
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <TablePagination
//                     component="div"
//                     count={count}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             </Paper>
//         </React.Fragment>
//     );
// }
