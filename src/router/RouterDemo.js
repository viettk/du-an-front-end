import { useState } from "react";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch
} from "react-router-dom";
import Post from "../component/Post";


function RouterDemo(){

    const initParams = {
        id: 'a',
        limit : '1',
        page : '0',
    }
    const [params, setParams] = useState(initParams);
    return(
        <div>
            <Router basename="/thuandeptrai">
                <ul style={{ listStyle: "none"}}>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/info'>Info</Link>
                    </li>
                    <li>
                        <Link to={`/post/${params.id}?limit=${params.limit}&page=${params.page}`}>Post</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/info" component={Info}/>
                    <Route path="/post/:id" >
                        <Post/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

function Home(){
    return(
        <div>
            <h2>Home</h2>
        </div>
    )
}

function Info(){
    return(
        <div>
            <h2>đây là info</h2>
        </div>
    )
}
export default RouterDemo;