import { doc, updateDoc } from "firebase/firestore";
import { UserModel } from "../../models/user";
import { db } from "../../firebase";

export async function updateUser(data: UserModel) {
    let result: boolean = false;

    const docRef = doc(db, "user", `${data.id}`);

    result = await updateDoc(docRef, data as any)
        .then(() => true)
        .catch(err => {
            console.log(err);
            return false;
        });

    return result;
}