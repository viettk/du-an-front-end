import { Pagination } from "@mui/material";
import { grid } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import HomeApi from "../../api/HomeApi";
import Head from "../../Layout/Head";
import './css/list-product.css';
import SyncLoader from "react-spinners/SyncLoader";

function HomeCateParentName() {
    const { sanpham, xpage, sort } = useParams();
    let history = useHistory();
    const [loading, setLoading] = useState(false);

    const initValues = [];
    const initParams = {
        _limit: '2',
        _page: (xpage - 1),
        _field: 'id',
        _known: 'up',
        parentName: sanpham
    };
    const [params, setParams] = useState(initParams);
    console.log(params)
    const [result, setResult] = useState(initValues);
    const [page, setPage] = useState(initParams._page + 1);
    const [sele, setSele] = useState({
        optionValue: sort
    })
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState({
        name: '',
        parent_name: ''
    });
    // lấy id danh mục
    const [ma, setMa] = useState(0);

    const handleChange = (event, value) => {
        setPage(value);
        setParams(
            {
                ...params,
                _limit: '2',
                _page: value - 1,
                _field: 'id',
                _known: 'up',
            }
        );
        history.push('/' + sanpham + '/page=' + xpage + '/sort=' + sort);
    };

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await HomeApi.getProductByCategoryParent(params);
                setResult(response.content);
                setCount(response.totalPages);
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, [params, sanpham, sort,search, page]);

    const changeValueSelect = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        var ina = e.target.value;
        setSele({
            ...sele,
            optionValue: index + 1
        });

        if (ina == '1') {
            setParams({
                ...params,
                _field: 'id',
                _known: 'up'
            });
        } else if (ina == '2') {
            setParams({
                ...params,
                _field: 'name',
                _known: 'down'
            });
        } else if (ina == 3) {
            setParams({
                ...params,
                _field: 'name',
                _known: 'up'
            });
        } else if (ina == 4) {
            setParams({
                ...params,
                _field: 'price',
                _known: 'down'
            });
        } else if (ina == 5) {
            setParams({
                ...params,
                _field: 'price',
                _known: 'up'
            });
        }
        history.push('/' + sanpham + '/page=' + xpage + '/sort=' + ina);
    }
    const chuyentrang = (id) =>{
        history.push('/product/' + id );
      }

      const src_img = process.env.REACT_APP_URL_IMAGE;
    return (
        <section>
            {loading ?
                <div className="screenn-load">
                    <SyncLoader loading={loading} color={'#8DD344'} />
                </div> :
                <div className="container">
                    <div className="titel-lst-pr">
                        <h5>Danh sách Sản phẩm {sanpham}</h5>
                        <select style={{ margin: "30px 0" }} value={sele.optionValue} onChange={(e) => changeValueSelect(e)}>
                            <option value="1">Mặc định</option>
                            <option value="3">Z - A</option>
                            <option value="2">A - Z</option>
                            <option value="4">Giá tăng dần</option>
                            <option value="5">Giá giảm dần</option>
                        </select>
                    </div>

                    <div className="product-category list-product">
                        {
                            result.length > 0 ?result.map(result =>
                                <div key={result.id} className="productinfo lst-pro-infor" onClick={() => chuyentrang(result.id)}>
                                    <img src={src_img + result.photo} alt="" className="pr-img" width="206px" height="206px" />
                                    <p className="fix-line-css">{result.name}</p>
                                    <p style={{ margin: "0 0 5px 0", justifySelf: "start" }}>Mã SP: {result.sku}</p>
                                    <span className="pro-body">
                                        <span style={result.price != result.price_extra ? { fontSize: "15px", marginRight: "15px", color: "red", fontWeight: "500" } : { fontSize: "15px", marginRight: "15px", fontWeight: "500" }}>
                                            {String(Math.round(result.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' VNĐ'}
                                        </span>
                                        <span style={result.price != result.price_extra ? { display: "inline-block" } : { display: "none" }}>
                                            <strike> {String(Math.round(result.price_extra)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' VNĐ'} </strike>
                                        </span>
                                    </span>
                                </div>
                            ):<p>Không tìm thấy Sản phẩm phù hợp</p>
                        }

                    </div>
                    <Pagination sx={{marginTop: "30px"}} className="d-flex justify-content-center" count={count} page={page} onChange={handleChange} color="secondary" />
                </div>}
        </section>
    );
}
export default HomeCateParentName;