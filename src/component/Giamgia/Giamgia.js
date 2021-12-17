import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CategoryApi from "../../api/CategoryApi";
import GiamgiaApi from "../../api/GiamgiaApi";
import ProductApi from "../../api/ProductApi";
import './giamgia.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Alert, Pagination, Snackbar, Stack } from "@mui/material";

function Giamgia() {
    const [giamValue, setGiamValue] = useState(0);
    const [giamdm, setGiamdm] = useState(0);
    const [danhmuc, setDanhmuc] = useState([]);
    const [count, setCount] = useState(0);

    const [result, setResult] = useState([]);
    const [product, setProduct] = useState([]);
    const [active, setActive] = useState(false);
    const [acdm, setAcdm] = useState(false);
    const [input, setInput] = useState({
        productName: ''
    });
    const [param, setParam] = useState({
        name: ''
    });

    const [giam1, setGiam1] = useState({
        value: 0
    })

    const [giam2, setGiam2] = useState({
        value: 0
    })

    const [giam3, setGiam3] = useState({
        value: 0
    })

    const [iddm, setIddm] = useState();

    const giamm = (e) => {
        GiamgiaApi.giamTheoDanhMuc(giam3.value, d.iddm).then(resp => {
            onLoad();
            setOpen(true);
        });
    }

    const giamgiadm = (e) => {
        setGiam3({
            giam3,
            value: e.target.value
        })
    }

    const changeparam = (e) => {
        setParam({
            ...param,
            name: e.target.value
        });
    }

    const changeDmid = (e) => {
        setIddm(e.target.value)
    }

    const getInputname = (e) => {
        setSearch({
            ...search,
            name: e.target.value
        })
    }

    const getInputdm = (e) => {
        setAcdm(true);
        if (input.productName != null) {
            GiamgiaApi.laydanhmuc(e.target.value).then(resp => {
                setDanhmuc(resp);
            });
        }
    }

    const onBlur = () => {
        setActive(false);
        setAcdm(false);
    }

    const [a, setA] = useState({
        idpro: '',
        iddanhmuc: ''
    });

    const [d, setD] = useState({
        iddm: ''
    })
    const layId = (e, index, id) => {
        let x = document.getElementsByClassName('namesp')[index].innerHTML;
        document.getElementById('namesp').value = x;
        setA({
            ...a,
            idpro: id,
        });
    }

    const layIddm = (e, id) => {
        document.getElementById('dmsp').value = e.target.innerHTML;
        setAcdm(false);
        setD({
            ...d,
            iddm: id,
        });
    }

    const khoiphuc = () => {
        GiamgiaApi.khoiphuc().then(resp => {
            onLoad();
            setOpen(true);
        });
    }

    const giamtoansp = (e) => {
        setGiam1({
            ...giam1,
            value: e.target.value
        });
        setGiamValue(0);
    }

    const giam = () => {
        if (giamValue != 0) {
            GiamgiaApi.giamAll(giamValue).then(resp => {
                onLoad();
                setOpen(true);
            });

        } else if (giamValue == 0) {
            GiamgiaApi.giamAll(giam1.value).then(resp => {
                onLoad();
            });
        }
    }

    const giampro = (e) => {
        GiamgiaApi.giamTheoTungSP(a.idpro, giam2.value).then(resp => {
            onLoad();
            setOpen(true);
        });
    }

    const giam1sp = (e) => {
        setGiam2({
            ...giam2,
            value: e.target.value
        });
        setGiamdm(0);
    }

    const [search, setSearch] = useState({
        categoryName: '',
        name: '',
        create_date: '',
        price: '',
        status: '',
        categoryId: ''
    });

    const initParams = {
        _limit: '10',
        _page: 0,
        _field: 'id',
        _known: ''
    };

    const [params, setParams] = useState(initParams);
    const [page, setPage] = useState(initParams._page + 1);

    const [load, setLoad] = useState(true);
    const onLoad = () => {
        if (load) {
            setLoad(false)
        } else {
            setLoad(true)
        }
    }

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await ProductApi.getAll(params, search.name, search.price, search.categoryId, search.create_date, search.status);
                setResult(response.content);
                setCount(response.totalPages);
            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, [search, load]);

    const giamEarchPro = (id) => {
        GiamgiaApi.giamTheoTungSP(id, 0).then(resp => {
            onLoad();
        });
    }
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event, value) => {
        setPage(value);
        setParams(
            {
                ...params,
                _limit: '10',
                _page: value - 1,
            }
        );
        onLoad();
    };

    return (
        <div className="giam-gia-discount" onClick={onBlur}>
            {/* Giảm giá toàn bộ sản phẩm */}
            <div>
                <label>Giảm giá toàn bộ sản phẩm:</label>
                <span>
                    <input onChange={(e) => giamtoansp(e)} value={giam1.value} type="text" className="input-number" style={{ textAlign: 'center', height: "36px", width: "100px", marginRight: "10px" }} />
                    <button className="gg-btn" type="button" onClick={giam} style={{ padding: "5px 22px" }}>Giảm</button>
                </span>
            </div>

            {/* Giảm giá theo danh mục */}

            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "230px 1fr" }}>
                <label>Giảm giá Danh mục:</label>
                <div className="giamgia-theo-dm">
                    <input style={{ width: "347px", marginBottom: "10px" }} onChange={(e) => getInputdm(e)} id="dmsp" type="search" className="input-search form-control" placeholder="Tên danh mục" aria-label="Search" aria-describedby="search-addon" />
                    <div className={acdm == true ? "receipt-hiddent-show-dm active" : "receipt-hiddent-show-dm"}>
                        <ul className="receipt-product-name-dm active" >
                            {
                                danhmuc.length != 0 ? danhmuc.map(pr =>
                                    <li key={pr.id} defaultValue={pr.id} onClick={(e) => layIddm(e, pr.id)}>{pr.name}-Danh mục cha: {pr.parent_name}</li>
                                ) : <li>Không có Sản phẩm</li>

                            }
                        </ul>
                    </div>
                    <div className="giamgia-product-op">
                        <input onChange={(e) => giamgiadm(e)} value={giam3.value} type="text" className="input-number" style={{ textAlign: 'center', height: "36px", width: "100px" }} />
                        <button style={{ marginLeft: "10px" }} className="gg-btn" type="button" onClick={giamm} >Giảm</button>
                    </div>
                </div>
            </div>


            {/* Giảm giá theo từng sản phẩm */}
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "230px 1fr" }}>
                <label>Giảm giá Sản phẩm:</label>
                <div className="giamgia-theo-sp">
                    <input id="namesp" onChange={(e) => getInputname(e)} type="search" className="input-search form-control" placeholder="Tên sản phẩm" aria-label="Search" aria-describedby="search-addon" />
                    <div className="giamgia-product-op">
                        <input onChange={(e) => giam1sp(e)} value={giam2.value} type="text" className="input-number" style={{ textAlign: 'center', height: "36px", width: "100px" }} />
                        <button style={{ margin: "0 10px" }} className="gg-btn" type="button" onClick={giampro} >Giảm</button>
                    </div>
                </div>
            </div>

            <div>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead style={{ background: "#ccc" }}>
                        <TableRow>
                            <TableCell>Stt</TableCell>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell>Ảnh</TableCell>
                            <TableCell>Giá bán</TableCell>
                            <TableCell>% giảm</TableCell>
                            <TableCell>Giá gốc</TableCell>
                            <TableCell>#</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            result.length > 0 ? result.map(
                                (result, index) =>
                                    <TableRow className="sp" key={result.id}>
                                        <TableCell onClick={(e) => layId(e, index, result.id)}>{(index + 1) + Number(page - 1) * 5}</TableCell>
                                        <TableCell onClick={(e) => layId(e, index, result.id)}><span className='namesp'>{result.name}</span></TableCell>
                                        <TableCell onClick={(e) => layId(e, index, result.id)}><img src={'http://localhost:8080/images/' + result.photo} style={{ width: 100 }} /></TableCell>
                                        <TableCell onClick={(e) => layId(e, index, result.id)}>{String(Math.round(result.price / 1000) * 1000).replace(/(.)(?=(\d{3})+$)/g, '$1.')}</TableCell>
                                        <TableCell onClick={(e) => layId(e, index, result.id)}>{result.value_extra}%</TableCell>
                                        <TableCell onClick={(e) => layId(e, index, result.id)}>{String(Math.round(result.price_extra / 1000) * 1000).replace(/(.)(?=(\d{3})+$)/g, '$1.')}</TableCell>
                                        <TableCell>
                                            <button onClick={() => giamEarchPro(result.id)} className="btn-khoi-phuc-each-sp">Khôi phục</button>
                                        </TableCell>
                                    </TableRow>

                            ) : (

                                <div style={{ textAlign: "center", position: 'absolute', left: "50%", transform: `translate(${-50}%, ${0}px)` }}>Không có dữ liệu</div>
                            )
                        }
                    </TableBody>
                </Table>
                <Stack spacing={2}>
                    <Pagination className="d-flex justify-content-center" count={count} page={page} onChange={handleChange} color="secondary" />
                </Stack>
            </div>

            <div>
                <button className="gg-btn-kp" type="button" onClick={khoiphuc} >Khôi phục lại giá</button>
            </div>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                vertical: "center",
                horizontal: "center"
            }}>
                <Alert severity="success" sx={{ width: '100% ' }}  >
                    Cập nhật thành công
                </Alert>
            </Snackbar>
        </div>
    );
}
export default Giamgia;