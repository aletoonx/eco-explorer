import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, where, limit } from 'firebase/firestore';

export type Animal = {
  slug: string;
  name: string;
  scientificName: string;
  description: string;
  status: string;
  imageURL: string;
  habitat: string;
  dataAiHint: string;
};

export type Foundation = {
  slug: string;
  name: string;
  mission: string;
  location: string;
  contact: string;
  imageURL: string;
  dataAiHint: string;
  foundationActivities: string;
  lat: number;
  lng: number;
};

// --- Funciones de Datos de Animales ---

export async function getAnimals(): Promise<Animal[]> {
  try {
    const animalsCol = collection(db, 'animals');
    const animalSnapshot = await getDocs(animalsCol);
    const animalList = animalSnapshot.docs.map(doc => ({ slug: doc.id, ...doc.data() } as Animal));
    return animalList;
  } catch (error) {
    console.error("Error al obtener animales:", error);
    if (error instanceof Error && (error.message.includes("Missing or insufficient permissions") || error.message.includes("firestore/permission-denied"))) {
       console.error("Error de permisos en Firestore: Revisa tus reglas de seguridad en la consola de Firebase.");
    }
    return [];
  }
}

export async function getAnimal(slug: string): Promise<Animal | undefined> {
  try {
    const animalRef = doc(db, 'animals', slug);
    const animalSnap = await getDoc(animalRef);
    if (animalSnap.exists()) {
      return { slug: animalSnap.id, ...animalSnap.data() } as Animal;
    }
    return undefined;
  } catch(error) {
    console.error(`Error al obtener el animal con slug ${slug}:`, error);
    return undefined;
  }
}


// --- Funciones de Datos de Fundaciones ---

export async function getFoundations(): Promise<Foundation[]> {
  try {
    const foundationsCol = collection(db, 'foundations');
    const foundationSnapshot = await getDocs(foundationsCol);
    const foundationList = foundationSnapshot.docs.map(doc => ({ slug: doc.id, ...doc.data() } as Foundation));
    return foundationList;
  } catch (error) {
     console.error("Error al obtener fundaciones:", error);
     if (error instanceof Error && (error.message.includes("Missing or insufficient permissions") || error.message.includes("firestore/permission-denied"))) {
       console.error("Error de permisos en Firestore: Revisa tus reglas de seguridad en la consola de Firebase.");
    }
    return [];
  }
}

export async function getFoundation(slug: string): Promise<Foundation | undefined> {
  try {
    const foundationRef = doc(db, 'foundations', slug);
    const foundationSnap = await getDoc(foundationRef);

    if (foundationSnap.exists()) {
      return { slug: foundationSnap.id, ...foundationSnap.data() } as Foundation;
    }
    return undefined;
  } catch (error) {
    console.error(`Error al obtener la fundación con slug ${slug}:`, error);
    return undefined;
  }
}

export async function getMapFeatures(): Promise<string> {
    const foundations = await getFoundations();
    if (!foundations || foundations.length === 0) {
      return "No hay características de mapa disponibles.";
    }
    return foundations.map(f => `${f.name} en ${f.location}`).join(', ');
}
