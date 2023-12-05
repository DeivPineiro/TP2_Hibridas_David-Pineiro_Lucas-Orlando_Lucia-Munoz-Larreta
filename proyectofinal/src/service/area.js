import { db } from './firebase.js'
import { getDocs, where, limit, addDoc, collection, onSnapshot, serverTimestamp, query, orderBy, getDoc, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

const userRef = collection(db, 'usuarios');

export async function CreateArea(uid, data) {
    console.log("Id: ", uid, "//   Data: ", data);
    const thisUserRef = doc(userRef, uid);
    const areaRef = collection(thisUserRef, 'areas');
    return addDoc(areaRef, { ...data, creado: serverTimestamp() });
}

export async function UpdateArea(idUser, idArea, data) {
    const userDocRef = doc(userRef, idUser);
    const areaDocRef = doc(userDocRef, 'areas', idArea);
    const areaSnapshot = await getDoc(areaDocRef);
    if (areaSnapshot.exists()) {
        return await updateDoc(areaDocRef, {
            poligons: data.poligons,
            areaKilometros: data.areaKilometros,
            creado: serverTimestamp(),
        });
        return null;
    }
}

export async function addNewDataArea(idUser, idArea, data) {
    const userDocRef = doc(userRef, idUser);
    const areaDocRef = doc(userDocRef, 'areas', idArea);
    const areaSnapshot = await getDoc(areaDocRef);
    if (areaSnapshot.exists()) {
        return await updateDoc(areaDocRef, {
            nombreCosecha: data.nombreCosecha,
            pesoPorCosecha: data.pesoPorCosecha,
            valorPorTonelada: data.valorPorTonelada,
        });
        return null;
    }
}

export async function lastAreaById(id) {
    if (id) {
        const thisUserRef = collection(userRef, id, 'areas')
        const q = query(
            thisUserRef,
            orderBy("creado", "desc"),
            limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const lastAreaDoc = querySnapshot.docs[0];
            const lastAreaData = { id: lastAreaDoc.id, ...lastAreaDoc.data() };           
            return lastAreaData;
        }
    }
    return null;
}

export function findUserAreas(userId, callback) {
    const usuarioRef = collection(db, 'usuarios', userId, 'areas');
    const q = query(usuarioRef, orderBy('creado', 'desc'));
    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                nombreCosecha: doc.data().nombreCosecha,
                pesoPorCosecha: doc.data().pesoPorCosecha,
                valorPorTonelada: doc.data().valorPorTonelada,
                poligons: doc.data().poligons,
                areaKilometros: doc.data().areaKilometros,
                creado: doc.data().creado,

            };
        });
        callback(data);
    });
}

export function findAreaById(userId, areaId, callback) {
    const usuarioRef = doc(db, 'usuarios', userId);
    const areaRef = doc(usuarioRef, 'areas', areaId);
    getDoc(areaRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
            const areaData = docSnapshot.data();
            callback({
                id: docSnapshot.id,
                nombreCosecha: areaData.nombreCosecha,
                pesoPorCosecha: areaData.pesoPorCosecha,
                valorPorTonelada: areaData.valorPorTonelada,
                poligons: areaData.poligons,
                areaKilometros: areaData.areaKilometros,
                creado: areaData.creado,
            });
        } else {
            callback(null);
        }
    });
}

export async function deleteArea(userId, areaId) {
    const usuarioRef = doc(db, 'usuarios', userId);
    const areaRef = doc(usuarioRef, 'areas', areaId);
    try {
        return await deleteDoc(areaRef);
    } catch (error) {
        console.error('Error al eliminar el área:', error);
        return null;
    }
}
