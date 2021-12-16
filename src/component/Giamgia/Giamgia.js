import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CategoryApi from "../../api/CategoryApi";
import GiamgiaApi from "../../api/GiamgiaApi";
import './giamgia.css';

function Giamgia() {
    const [giamValue, setGiamValue] = useState(0);
    const [giamdm, setGiamdm] = useState(0);
    const [danhmuc, setDanhmuc] = useState([]);

    const [result, setResult] = useState([]);
    const [reload, setReload] = useState(true);
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
        GiamgiaApi.giamTheoDanhMuc(giam3.value, iddm);
    }

    const giamgiadm = (e) => {
        setGiam3({
            giam3,
            value: e.target.value
        })
    }

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await CategoryApi.getListAll(param);
                setResult(response);
            } catch (error) {
                console.log(error);
                // history.push('/404');
            }
        }
        fetchList();
    }, [reload, param]);

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
        setInput({
            ...input,
            productName: e.target.value
        })
        setActive(true);
        if (input.productName != null) {
            GiamgiaApi.laythongtin(e.target.value).then(resp => {
                setProduct(resp);
            });
        }
    }

    const getInputdm = (e) => {
        // setInput({
        //     ...input,
        //     productName: e.target.value
        // })
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
    const layId = (e, id, iddanhmuc) => {
        console.log(id)
        document.getElementById('namesp').value = e.target.innerHTML;
        setActive(false);
        setA({
            ...a,
            idpro: id,
            iddanhmuc: iddanhmuc
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
        GiamgiaApi.khoiphuc();
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
            GiamgiaApi.giamAll(giamValue);

        } else if (giamValue == 0) {
            GiamgiaApi.giamAll(giam1.value);
        }
    }

    const giampro = (e) => {
        GiamgiaApi.giamTheoTungSP(a.idpro, giam2.value, a.iddanhmuc);
    }

    const giam1sp = (e) => {
        setGiam2({
            ...giam2,
            value: e.target.value
        });
        setGiamdm(0);
    }

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
                    <input style={{width: "347px", marginBottom: "10px"}}  onChange={(e) => getInputdm(e)} id="dmsp" type="search" className="input-search form-control" placeholder="Tên danh mục" aria-label="Search" aria-describedby="search-addon" />
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
                        <button style={{marginRight: "10px"}} className="gg-btn" type="button" onClick={giamm} >Giảm</button>
                    </div>
                </div>
            </div>


            {/* Giảm giá theo từng sản phẩm */}
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "230px 1fr" }}>
                <label>Giảm giá Sản phẩm:</label>
                <div className="giamgia-theo-sp">
                    <input id="namesp" onChange={(e) => getInputname(e)} type="search" className="input-search form-control" placeholder="Tên sản phẩm" aria-label="Search" aria-describedby="search-addon" />
                    <div className={active == true ? "receipt-hiddent-show active" : "receipt-hiddent-show"}>
                        <ul className="receipt-product-name active" >
                            {
                                product.length != 0 ? product.map(pr =>
                                    <li key={pr.id} defaultValue={pr.id} onClick={(e) => layId(e, pr.id, pr.category.id)}>{pr.name}-Danh mục: {pr.category.name}-Danh mục cha: {pr.category.parent_name}</li>
                                ) : <li>Không có Sản phẩm</li>

                            }
                        </ul>
                    </div>
                    <div className="giamgia-product-op">
                        <input onChange={(e) => giam1sp(e)} value={giam2.value} type="text" className="input-number" style={{ textAlign: 'center', height: "36px", width: "100px" }} />
                        <button style={{ margin: "0 10px" }} className="gg-btn" type="button" onClick={giampro} >Giảm</button>
                    </div>
                </div>
            </div>

            <div>
                <button className="gg-btn-kp" type="button" onClick={khoiphuc} >Khôi phục lại giá</button>
            </div>
        </div>
    );
}
export default Giamgia;