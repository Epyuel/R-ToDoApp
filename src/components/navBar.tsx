import { Link, Outlet, useMatch, useResolvedPath } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {ExclamationCircleOutlined} from "@ant-design/icons";
import { Modal, Typography } from "antd";
import AppContext from "./context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ()=>{
    const context = useContext(AppContext);
    const navigate = useNavigate();

    const logout = ()=>{
        
        return (
            Modal.confirm({
                title: 'Confirm',
                icon: <ExclamationCircleOutlined />,
                content: 'Are you sure to Logout?',
                okText: 'Yes',
                cancelText: 'No',
                onOk: async () => {
                    navigate('/');
                    context.logout();
                    console.log(context.user);
                }
            })
        )
    }
    return (
        <>
        <div className="navbar-container">
            <div className="navbar-items">
                <div>
                <h2>To Do App</h2>
                <ul>
                    <CustomLink to="/navbar/home">
                        <HomeIcon/><Link to="/navbar/home">Home</Link>
                    </CustomLink>
                    <CustomLink to="/navbar/toDo">
                        <AssignmentIcon/><Link to="/navbar/toDo">To Do</Link>
                    </CustomLink>
                </ul>
                </div>
                <Typography 
                    style={{marginBottom:'70px'}}
                    onClick={()=>{
                        logout();
                    }}
                >
                    <PowerSettingsNewIcon className='iconButtons' style={{fontSize:'40px',color:'white'}}/>
                </Typography>
            </div>
            <div className="navbar-content">
                <Outlet/>
            </div>
        </div>
        </>
    )
}

const CustomLink = ({ to, children}: { to: string, children: any }) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path:resolvedPath.pathname,end:true});

    return(
        <li className={isActive?"active":""}>
            {children}
        </li>
    )
};

export default Navbar;