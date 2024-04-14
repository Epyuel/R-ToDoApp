import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ToDoModel } from "../../models/toDo";

export async function updateToDo(data: ToDoModel) {
    let result: boolean = false;

    const docRef = doc(db, "toDo", `${data.id}`);

    result = await updateDoc(docRef, data as any)
        .then(() => true)
        .catch(err => {
            console.log(err);
            return false;
        });

    return result;
}