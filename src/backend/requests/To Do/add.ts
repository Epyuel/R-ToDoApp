import { doc, setDoc } from "firebase/firestore";
import { toDoCollection} from "../../firebase";
import { ToDoModel } from "../../models/toDo";


const addToDo = async (data:ToDoModel)=>{
    let result:boolean = false;

    const docRef = doc(toDoCollection);

    result = await setDoc(docRef,{id:docRef.id,...data})
    .then(()=>true)
    .catch((err)=>{
        console.log(err)
        return false;
    });

    return result;
}

export default addToDo;