import { Spin } from "antd";

const CustomLoading = ()=>{
    return (
        <div style={{width:'100%',height:'97vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Spin/>
        </div>
    )
}

export default CustomLoading;