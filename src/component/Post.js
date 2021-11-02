import React from "react";
import { useParams, useLocation } from "react-router-dom";

const Post = () =>{
    const {id} = useParams();

    const query = new URLSearchParams(useLocation().search);

    return (
        <div>
            <h2>id = {id}</h2>
            <h2>limt{query.get('limit')}</h2>
            <h2>page{query.get('page')}</h2>
        </div>
    )
}
export default Post;