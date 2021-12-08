import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import HomeApi from "../../api/HomeApi";
import Head from "../../Layout/Head";
import './css/list-product.css';
import SyncLoader from "react-spinners/SyncLoader";

function HomeCate() {
    const { sanpham, id, xpage, sort } = useParams();
    let history = useHistory();
    const [loading, setLoading] = useState(false);

    const initValues = [];
    const initParams = {
        _limit: '15',
        _page: (xpage - 1),
        _field: 'id',
        _known: 'up',
    };
    const [params, setParams] = useState(initParams);
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
        history.push("/" + sanpham + '/' + id + '/page=' + value + '/sort=' + sort);
        setPage(value);
        setParams(
            {
                _limit: '2',
                _page: value - 1,
                _field: 'id',
                _known: 'up',
            }
        );
    };

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await HomeApi.getProductByCategory(id, params);
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
    }, [params, sanpham, xpage, sort, search, page]);

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
        history.push('/' + sanpham + '/' + id + '/page=' + xpage + '/sort=' + ina);
    }
    const chuyentrang = (id) =>{
        history.push('/product/' + id );
      }
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
                            <option value="2">A - Z</option>
                            <option value="3">Z - A</option>
                            <option value="4">Giá tăng dần</option>
                            <option value="5">Giá giảm dần</option>
                        </select>
                    </div>
                    <div className="product-category list-product">
                        {
                            result.length > 0 ? result.map(result =>
                                <div key={result.id} className="productinfo lst-pro-infor" onClick={() => chuyentrang(result.id)}>
                                    <img src={'/images/' + result.photo} alt="" className="pr-img" width="206px" height="206px" />
                                    <p className="fix-line-css">{result.name}</p>
                                    <p style={{ margin: "0 0 5px 0", justifySelf: "start" }}>SKU: {result.sku}</p>
                                    <p style={{ fontSize: "16px", fontWeight: '550', color: result.price < result.price_extra ? "red" : "#080000" }}>{result.price} đ</p>
                                    <span>{result.price_extra}đ</span>
                                </div>
                            ):<span>Không có sản phẩm nào</span>
                        }
                    </div>
                </div>}
            <Pagination className="d-flex justify-content-center" count={count} page={page} onChange={handleChange} color="secondary" />
        </section>
    );
}
export default HomeCate;