import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";


const deleteToDo = async (id: String) => {
    let result: boolean = false;

    const docRef = doc(db, 'toDo', `${id}`);
    result = await deleteDoc(docRef)
        .then(() => true)
        .catch((err) => {
            console.log(err);
            return false;
        })

    return result;
}

export default deleteToDo;