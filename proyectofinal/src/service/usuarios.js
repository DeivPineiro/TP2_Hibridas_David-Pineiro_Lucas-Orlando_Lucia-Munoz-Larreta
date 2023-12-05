import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserById(id) {
    const refUsuario = doc(db, `usuarios/${id}`);
    const docSnapshot = await getDoc(refUsuario);
    return {
        id: docSnapshot.id,
        email: docSnapshot.data().email,
        rol: docSnapshot.data().rol,
    }
}

export async function getUserdata(id) {
    const refUsuario = doc(db, `usuarios/${id}`);
    const docSnapshot = await getDoc(refUsuario);
    return {
    }
}

export async function CrearPerfilUsuario(id, data) {
    return setDoc(doc(db, `usuarios/${id}`), { ...data });
}

export async function EditarPerfilUsuario(id, data) {
    return updateDoc(doc(db, `usuarios/${id}`), { ...data });
}
