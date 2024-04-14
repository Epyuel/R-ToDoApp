import { doc, setDoc } from "firebase/firestore";
import { UserModel } from "../../models/user";
import { userCollection } from "../../firebase";


const addUser = async (data:UserModel)=>{
    let result:boolean = false;

    const docRef = doc(userCollection);

    result = await setDoc(docRef,{id:docRef.id,...data})
    .then(()=>true)
    .catch((err)=>{
        console.log(err)
        return false;
    });

    return result;
}

export default addUser;