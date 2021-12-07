import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CategoryApi from "../../api/CategoryApi";
import GiamgiaApi from "../../api/GiamgiaApi";
import './giamgia.css';

function Giamgia(){
    const [giamValue, setGiamValue] = useState(0);
    const [giamdm, setGiamdm] = useState(10);
    const [result, setResult] = useState([]);
    const [reload, setReload] = useState(true);
    const [product, setProduct] = useState([]);
    const [active, setActive] = useState(false)
    const [input, setInput] = useState({
        productName: ''
    });
    const [param, setParam] = useState({
        name: ''
    });
    const [iddm, setIddm] = useState(1);

    const changeGiamValue = (e) =>{
        setGiamValue(e.target.value)
    }
    const giam =() =>{
        if(giamValue != "Chọn"){
            GiamgiaApi.giamAll(giamValue);
        }
    }

    

    const changeDm = (e) =>{
        setGiamdm(e.target.value);
    }

    const giamm = (e) =>{
            GiamgiaApi.giamTheoDanhMuc(giamdm, iddm);
    }

    const giampro = (e) =>{
        GiamgiaApi.giamTheoTungSP(a.idpro, giamdm, iddm);
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

    const changeparam = (e) =>{
        setParam({
            ...param,
            name: e.target.value
        });
    }

    const changeDmid = (e) =>{
        setIddm(e.target.value)
    }

    const getInputname = (e) =>{
        setInput({
            ...input,
            productName: e.target.value
        })
        setActive(true);
        if(input.productName != null){
            GiamgiaApi.laythongtin(e.target.value).then(resp => {
               setProduct(resp.data);   
               console.log(resp)
            });
        }
    }
    const [a, setA] = useState({
        idpro: ''
    });
    const layId = (e, id) =>{
        document.getElementById('namesp').value = e.target.innerHTML;
        setActive(false);
         setA({
             ...a,
             idpro: id
         });
     }
     const khoiphuc = () =>{
        GiamgiaApi.khoiphuc();
     }
    return(
        <div>

            {/* Giảm giá toàn bộ sản phẩm */}
            <label>Giảm giá toàn bộ sản phẩm</label>
            <select onChange={(e)=>changeGiamValue(e)} >
                <option value="0">Chọn</option>
                <option value="10">10%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
                <option value="25">25%</option>
                <option value="30">30%</option>
            </select>
            <button type="button" onClick={giam} >Giảm</button>
            <br />

            Giảm giá theo danh mục sản phẩm
            <label>Giảm giá theo danh mục</label>
            <input onChange={(e) => changeparam(e)} />
            <select onChange={(e)=>changeDmid(e)}>
                {
                    result.map((result, index) =>
                        <option key={index} value={result.id}>Danh mục: {result.name} - Danh mục cha: {result.parent_name}</option>
                        )
                }
            </select>
            <select onChange={(e)=>changeDm(e)} >
                <option value="10">10%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
                <option value="25">25%</option>
                <option value="30">30%</option>
            </select>
            <button type="button" onClick={giamm} >Giảm</button>


            {/* Giảm giá theo từng sản phẩm */}
            <div>
                <input id="namesp" onChange={(e) => getInputname(e)} />
                <div className={ active == true ? "receipt-hiddent-show active" : "receipt-hiddent-show"}>
                    <ul className="receipt-product-name" >
                        {
                            product.length != 0 ? product.map(pr =>
                                <li key={pr.id} defaultValue={pr.id}  onClick={(e) => layId(e, pr.id)}>{pr.name}-Danh mục: {pr.category.name}-Danh mục cha: {pr.category.parent_name}</li>
                            ) : <li>Không có Sản phẩm</li>

                        }
                    </ul>
                </div>
                <select onChange={(e)=>changeDm(e)} >
                <option value="10">10%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
                <option value="25">25%</option>
                <option value="30">30%</option>
            </select>
            <button type="button" onClick={giampro} >Giảm</button>
            </div>


            <button type="button" onClick={khoiphuc} >Khôi phục lại giá</button>
        </div>
    );
}
export default Giamgia;