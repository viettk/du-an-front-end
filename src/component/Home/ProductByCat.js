import { useEffect, useState } from "react";

function ProductByCart(){
    
    const [result, setResult] = useState([]);
    const history = useHistory();
  
    useEffect(() => {
      const fetchList = async () => {
        try {
          const resp = await HomeApi.getShf();
          setResult(resp.content);
        } catch (error) {
          console.log(error);
        }
      }
      fetchList();
    }, [resultShf]);

    return(
        <div>

        </div>
    );
}
export default ProductByCart;