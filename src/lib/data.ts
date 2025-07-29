'use server';

import { query } from './postgres';

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
    const res = await query('SELECT slug, name, "scientificName", description, status, "imageURL", habitat, "dataAiHint" FROM animals', []);
    return res.rows.map(row => ({
        ...row,
        scientificName: row.scientificName,
        imageURL: row.imageURL,
        dataAiHint: row.dataAiHint,
    }));
  } catch (error) {
    console.error("Error al obtener animales desde PostgreSQL:", error);
    // Devuelve un array vacío para que la app no se rompa.
    return [];
  }
}

export async function getAnimal(slug: string): Promise<Animal | undefined> {
  try {
    const res = await query('SELECT slug, name, "scientificName", description, status, "imageURL", habitat, "dataAiHint" FROM animals WHERE slug = $1', [slug]);
    if (res.rows.length > 0) {
      const row = res.rows[0];
      return {
        ...row,
        scientificName: row.scientificName,
        imageURL: row.imageURL,
        dataAiHint: row.dataAiHint,
      };
    }
    return undefined;
  } catch (error) {
    console.error(`Error al obtener el animal con slug ${slug} desde PostgreSQL:`, error);
    return undefined;
  }
}


// --- Funciones de Datos de Fundaciones ---

export async function getFoundations(): Promise<Foundation[]> {
  try {
    const res = await query('SELECT slug, name, mission, location, contact, "imageURL", "dataAiHint", "foundationActivities", lat, lng FROM foundations', []);
    return res.rows.map(row => ({
        ...row,
        imageURL: row.imageURL,
        dataAiHint: row.dataAiHint,
        foundationActivities: row.foundationActivities
    }));
  } catch (error) {
     console.error("Error al obtener fundaciones desde PostgreSQL:", error);
     // Devuelve un array vacío para que la app no se rompa.
    return [];
  }
}

export async function getFoundation(slug: string): Promise<Foundation | undefined> {
  try {
    const res = await query('SELECT slug, name, mission, location, contact, "imageURL", "dataAiHint", "foundationActivities", lat, lng FROM foundations WHERE slug = $1', [slug]);
    if (res.rows.length > 0) {
      const row = res.rows[0];
      return {
        ...row,
        imageURL: row.imageURL,
        dataAiHint: row.dataAiHint,
        foundationActivities: row.foundationActivities
      };
    }
    return undefined;
  } catch (error) {
    console.error(`Error al obtener la fundación con slug ${slug} desde PostgreSQL:`, error);
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
