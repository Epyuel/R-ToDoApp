import { getDocs, query, where } from "firebase/firestore";
import { userCollection } from "../firebase";


export const signIn = async (email: string, password: string) => {
    let user: any;

    const q = query(userCollection, where("email", "==", email), where("password", "==", password));

    await getDocs(q)
        .then((data: any) => {
            if (data.empty === true) {
                return null;
            }

            if (data.empty === false) {
                user = data.docs[0].data();
            }
        })
        .catch((e: any) => {
            console.log("Catching Error On signIn Function: ", e);
            return null;
        });

    return user;
}
