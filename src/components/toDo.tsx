import { Button, Input, Modal, Typography, message } from "antd";
import { useContext, useEffect, useState } from "react";

import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PendingIcon from '@mui/icons-material/Pending';
import VerifiedIcon from '@mui/icons-material/Verified';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {EditOutlined,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import AddToDo from "./modals/addToDo";
import { toDoCollection } from "../backend/firebase";
import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import dayjs from "dayjs";
import { ToDoModel } from "../backend/models/toDo";
import { UserModel } from "../backend/models/user";
import AppContext from "./context/AppContext";
import CustomLoading from "./customLoading";
import { updateToDo } from "../backend/requests/To Do/update";
import EditToDo from "./modals/editToDo";
import deleteToDo from "../backend/requests/To Do/delete";
import ViewToDo from "./modals/viewToDo";

const ToDo= ()=>{
    const context = useContext(AppContext);
    const userData: UserModel = context.user;
    
    const [search,setSearch] = useState<string>("");
    const [openAddToDo,setOpenAddToDo] = useState<boolean>(false);
    const [openEditToDo,setOpenEditToDo] = useState<boolean>(false);
    const [openViewToDo,setOpenViewToDo] = useState<boolean>(false);

    const [selectedToDo,setSelectedToDo] = useState<ToDoModel>({} as ToDoModel);

    const [dataSource,setDataSource] = useState<ToDoModel[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    useEffect(() => onSnapshot(toDoCollection, (snapshot: QuerySnapshot<DocumentData>) => {
        const data: any[] = [];
        snapshot.docs.map((doc) => {
            data.push({
                id: doc.id,
                ...doc.data()
            });
        });

        /* Sorting the data by date. */
        data.sort((a, b) => {
            let date1 = dayjs(`${a.timestamp}`, "MMMM DD, YYYY hh:mm A");
            let date2 = dayjs(`${b.timestamp}`, "MMMM DD, YYYY hh:mm A");

            return date1.isBefore(date2) ? 1 : -1;
        });

        const myToDos:ToDoModel[] = data.filter((t:ToDoModel)=>userData?.userID===t.user);
        setDataSource(myToDos);
        setLoading(false);
    }), [userData]);

    // Search
    const [filteredToDos,setFilteredToDos] = useState<ToDoModel[]>([]);
    useEffect(()=>{
        if (search!=="" && search){
            const f = dataSource.filter(d=>d.title?.toLowerCase().includes(search?.toLowerCase()));
            setFilteredToDos(f);
        }else{
            setFilteredToDos(dataSource); 
        }
    },[dataSource, search])

    function truncateString(str:string, maxLength:number) {
        if (str.length > maxLength) {
            return str.slice(0, maxLength) + '...';
        } else {
            return str;
        }
    }

    const deleteCard = (id:string)=>{
        return (
            Modal.confirm({
                title: 'Confirm',
                icon: <ExclamationCircleOutlined />,
                content: 'Are you sure',
                okText: 'Yes',
                cancelText: 'No',
                onOk: async () => {
                    deleteToDo(id)
                    .then((res:boolean)=>{
                        if(res) message.success("Success");
                        else message.error("Something went wrong try again");
                    })
                }
            }) 
        );
        
    }

    const CustomCard = ({toDo}:{toDo:ToDoModel})=>{
        return (
            <Typography 
                className="card card-pop-out"
                onClick={()=>{
                    setSelectedToDo(toDo);
                    setOpenViewToDo(true);
                }}
            >
                {/* <div className="card">  */}
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center', width:'100%'}}>
                        {toDo.stage==='To Do'?
                            <AddAlertIcon style={{fontSize:'43px',color:'#4dd1c4'}}/>
                            :toDo.stage==='In Progress'?
                            <PendingIcon style={{fontSize:'43px',color:'#af90eb'}}/>
                            :<VerifiedIcon style={{fontSize:'35px',color:'green'}}/>
                        }
                        <div style={{display:'flex'}}>
                            <Typography
                                style={{cursor:'pointer'}}
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    setSelectedToDo(toDo);
                                    setOpenEditToDo(true);
                                    
                                }}
                            >
                                <EditOutlined className="iconButtons" style={{fontSize:'19px'}}/>
                            </Typography>
                            <Typography 
                                style={{marginLeft:'20px',marginRight:'10px',cursor:'pointer'}}
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    deleteCard(toDo.id??"");
                                }}
                                >
                                <DeleteOutlined className="iconButtons" style={{fontSize:'19px'}} />
                            </Typography>
                        </div>
                    </div>

                    <h3>{toDo.title}</h3>
                    <p>{toDo.timestamp}</p>
                    <p style={{height:'90px'}}>{truncateString(toDo.description??"",100)}</p>
                    <div className="button-container">
                        <Button 
                            disabled={toDo.stage ==='In Progress'} 
                            className="card-button"
                            onClick={(e)=>{
                                e.stopPropagation();
                                updateToDo({...toDo,stage:'In Progress'})
                                .then((res:boolean)=>{
                                    if(res) message.success("Sucess");
                                    else message.error("Something went wrong");
                                })
                            }}
                        >
                            In Progress
                        </Button>
                        <Button 
                            disabled={toDo.stage!=='In Progress'} 
                            className="card-button"
                            onClick={(e)=>{
                                e.stopPropagation()
                                updateToDo({...toDo,stage:'Done'})
                                .then((res:boolean)=>{
                                    if(res) message.success("Sucess");
                                    else message.error("Something went wrong");
                                })
                            }}
                            >
                                Done
                        </Button>
                    </div>
                {/* </div>  */}
            </Typography>
        );
    }

    if (loading){
        return(<CustomLoading/>)
    }

    return(
        <>
        <div className="toDO-container">
            <div className="search-container">
                <div className="cont">
                    <div className="icon-container">
                        <ManageSearchIcon style={{fontSize:'35px'}} />
                    </div>
                    <Input
                        className="search"
                        onChange={(e)=>{
                            const newValue = e.target.value;
                            setSearch(newValue);
                        }}
                    />
                </div>
                <div className="icon-container">
                    <Typography
                        className="mod"
                        onClick={()=>{
                            setOpenAddToDo(true);
                        }}
                    >
                        <PostAddIcon className="iconButtons" style={{fontSize:'30px'}}/>
                    </Typography>
                </div>
            </div>
            <div className="cards-container">
                {
                    filteredToDos.map(toDo=><CustomCard toDo={toDo}/>)
                }
            </div>
        </div>

        <AddToDo
            open={openAddToDo}
            setOpen = {setOpenAddToDo}
        />

        <EditToDo
            open={openEditToDo}
            setOpen={setOpenEditToDo}
            data={selectedToDo}
        />

        <ViewToDo
            open={openViewToDo}
            setOpen={setOpenViewToDo}
            data={selectedToDo}
        />
        </>
    )
}

export default ToDo;