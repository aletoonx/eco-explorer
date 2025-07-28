
import { db } from './firebase';
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';

export type Animal = {
  slug: string;
  name: string;
  scientificName: string;
  description: string;
  status: string;
  imageUrl: string;
  habitat: string;
  dataAiHint: string;
};

export type Foundation = {
  slug: string;
  name: string;
  mission: string;
  location: string;
  contact: string;
  imageUrl: string;
  dataAiHint: string;
  recentSightings: string;
  foundationActivities: string;
  lat: number;
  lng: number;
};

// --- Animal Data Functions ---

export async function getAnimals(): Promise<Animal[]> {
  const animalsCol = collection(db, 'animals');
  const animalSnapshot = await getDocs(animalsCol);
  const animalList = animalSnapshot.docs.map(doc => doc.data() as Animal);
  return animalList;
}

export async function getAnimal(slug: string): Promise<Animal | undefined> {
    const q = query(collection(db, "animals"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return doc.data() as Animal;
    }
    return undefined;
}


// --- Foundation Data Functions ---

export async function getFoundations(): Promise<Foundation[]> {
  const foundationsCol = collection(db, 'foundations');
  const foundationSnapshot = await getDocs(foundationsCol);
  const foundationList = foundationSnapshot.docs.map(doc => doc.data() as Foundation);
  return foundationList;
}

export async function getFoundation(slug: string): Promise<Foundation | undefined> {
    const q = query(collection(db, "foundations"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return doc.data() as Foundation;
    }
    return undefined;
}

export async function getMapFeatures(): Promise<string> {
    const foundations = await getFoundations();
    return foundations.map(f => `${f.name} in ${f.location}`).join(', ');
}
