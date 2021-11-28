import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import HomeApi from "../../api/HomeApi";
import Head from "../../Layout/Head";

function HomeCateParentName() {
    const {sanpham, xpage, sort}= useParams();
    let history = useHistory();
    
    const initValues = [];
    const initParams= {
        _limit : '2',
        _page : (xpage-1),
        _field : 'id',
        _known : 'up',
        parentName: sanpham
    };
    const [ params, setParams] = useState(initParams);
    console.log(params)
    const [ result, setResult] = useState(initValues);
    const [ page, setPage] = useState(initParams._page + 1);
    const [sele, setSele] = useState({
        optionValue: sort
    })
    const [ count, setCount] = useState(0);
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
                _limit : '2',
                _page : value-1,
                _field : 'id',
                _known : 'up',
            }
        );       
        history.push('/'+ sanpham +'/page='+ xpage + '/sort='+ sort);
      };

    useEffect(() => {
        const fetchList = async () =>{
          try{
            const response = await HomeApi.getProductByCategoryParent(params);
            setResult(response.content);      
            setCount(response.totalPages);
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [params, search, page]);

    const changeValueSelect = (e) =>{
        var index = e.nativeEvent.target.selectedIndex;
        var ina = e.target.value;
        setSele({
            ...sele,
            optionValue: index + 1
        });

        if(ina == '1'){
            setParams({
                ...params,
                _field: 'id',
                _known: 'up'
            });
        } else if(ina == '2') {
            setParams({
                ...params,
                _field: 'name',
                _known: 'down'
            });
        } else if(ina == 3){
            setParams({
                ...params,
                _field: 'name',
                _known: 'up'
            });
        } else if (ina == 4){
            setParams({
                ...params,
                _field: 'price',
                _known: 'down'
            });
        } else if (ina == 5){
            setParams({
                ...params,
                _field: 'price',
                _known: 'up'
            });
        }
        history.push('/'+ sanpham +'/page='+ xpage + '/sort='+ ina);
    }
    return (
        <section>
            <div>
                <select value={sele.optionValue} onChange={(e) => changeValueSelect(e)}>
                    <option value="1">Mặc định</option>
                    <option value="2">A - Z</option>
                    <option value="3">Z - A</option>
                    <option value="4">Giá tăng dần</option>
                    <option value="5">Giá giảm dần</option>
                </select>
            </div>
            <div className="product-category ">
                {
                    result.map(result =>
                        <div key={result.id} className="productinfo">
                            <img src="images/demo.png" alt="" className="pr-img" />
                            <p className="fix-line-css">{result.name}</p>
                            <p style={{ fontSize: '14px', fontWeight: '500', margin: "0 0 10px 0", justifySelf: "start" }}>SKU: {result.sku}</p>
                            <h5 style={{ fontSize: '16px', fontWeight: '550' }}>{result.price} VND</h5>
                        </div>
                    )
                }
            </div>
            <Pagination className="d-flex justify-content-center" count={count}  page={page} onChange={handleChange}  color="secondary"/>
        </section>
    );
}
export default HomeCateParentName;