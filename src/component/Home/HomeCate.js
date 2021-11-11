import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import HomeApi from "../../api/HomeApi";
import Head from "../../Layout/Head";

function HomeCate() {

    const {sanpham, id,xpage}= useParams();
    let history = useHistory();
    
    const initValues = [];
    const initParams= {
        _limit : '5',
        _page : (xpage-1),
        _field : 'id',
        _known : 'up',
    };

    const [ params, setParams] = useState(initParams);
    const [ result, setResult] = useState(initValues);
    const [ page, setPage] = useState(initParams._page + 1);
    const [ count, setCount] = useState(0);
    const [search, setSearch] = useState({
        name: '',
        parent_name: ''
    });

    // lấy id danh mục
    const [ma, setMa] = useState(0);

    const handleChange = (event, value) => {
        history.push("/"+ sanpham+'/' + id+'/' + value);
        setPage(value);
        setParams(
            {
                _limit : '5',
                _page : value-1,
                _field : 'id',
                _known : 'up',
            }
        );       
        console.log(result);
      };

    useEffect(() => {
        const fetchList = async () =>{
          try{
            const response = await HomeApi.getProductByCategory(id, params);
            setResult(response.content);      
            setCount(response.totalPages);
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [params, result, search.name, page]);

    return (
        <section>
            <div className="product-category ">
                {
                    result.map(result =>
                        <div className="productinfo text-center">
                    <img src="images/demo.png" alt="" className="pr-img" />
                    <p className="fix-line-css">{result.name}</p>
                    <p style={{fontSize: '14px', fontWeight: '500', margin: "0 0 10px 0"}}>SKU: {result.sku}</p>
                    <span className="pr-category-body">
                        <h5 style={{fontSize: '16px', fontWeight: '550'}}>{result.price} VND</h5>
                        <a id="right">
                            <i className="fa fa-heart" style={{ color: 'red' }} />
                            <p>10 lượt thích</p>
                        </a>
                    </span>
                    <div className="when-hover">
                        <button className="btn btn-dark add-to-cart">
                            <i className="fa fa-shopping-cart" />Mua ngay
                        </button>
                        <button className="btn btn-dark add-to-cart">
                            <i className="fa fa-eye" />
                        </button>
                    </div>
                </div>
                        )
                }
            </div>
            <Pagination className="pagination" count={count}  page={page} onChange={handleChange}  color="secondary"/>
        </section>
    );
}
export default HomeCate;