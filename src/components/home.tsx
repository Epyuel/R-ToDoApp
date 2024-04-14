import { useContext } from "react";
import AppContext from "./context/AppContext";
import { UserModel } from "../backend/models/user";

const Home = ()=>{
    const context = useContext(AppContext);
    const userData:UserModel = context.user;

    return (
        <>
        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
            <h2>Oops it's on dev !!!</h2>
        </div>
        </>
    )
}

export default Home;