import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useHistory, useParams } from "react-router";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import ProductApi from "../../api/ProductApi";
import axios from "axios";
import FavoriteApi from "../../api/FavoritApi";


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

    const [reload, setReload] = useState(true);
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
      }, [params, reload]);

      const handleChange = (event, value) => {
        history.push("/danh-muc/" + value);
        setPage(value);
        setParams(
            {
                _limit : '5',
                _page : value-1,
            }
        );       
      };

      const xoa = (idpr) =>{
          let datasp = {
            productId: idpr,
            customerId: 1
          }
        FavoriteApi.deleteYeuthich(datasp).then(resp=>{
            onReload();
        })
       
      }

      const onReload = () =>{
          if(reload){
              setReload(false);
          } else{
              setReload(true);
          }
      }

    return(
        <React.Fragment>
        <h3 style={{marginTop: 10}}>Danh s??ch S???n ph???m y??u th??ch</h3>
        <TableContainer component={Paper}>
        <table className="table table-striped">
                <tbody>
                    <tr>
                        <td scope="col">STT</td>
                        <td scope="col">H??nh ???nh</td>
                        <td scope="col">T??n S???n ph???m</td>
                        <td scope="col">Gi??</td>
                        <td scope="col">S???a</td>
                    </tr>
                </tbody>
                <tfoot style={{height: "10px"}}>
                    {
                        result.map(
                            (result, index) =>
                                <tr key={result.id}>
                                    <td>{index + 1}</td>
                                    <td>{result.product.image}</td>
                                    <td>{result.product.name}</td>
                                    <td>{result.product.price}</td>
                                    <td>
                                        <button onClick={(e) => xoa(result.product.id)} >X??a</button>
                                    </td>
                                </tr>

                        )              
                    }
                </tfoot>
            </table>
            </TableContainer>
            <Stack spacing={2}>
                <Pagination className="d-flex justify-content-center" count={count}  page={page} onChange={handleChange}  color="secondary"/>
            </Stack>
    </React.Fragment>
    );
}
export default Favorite; 