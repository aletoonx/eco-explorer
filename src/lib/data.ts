
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
  ofcWebsite: string;
};

// --- Funciones de Datos de Animales ---

export async function getAnimals(): Promise<Animal[]> {
  const res = await query('SELECT slug, name, "scientificName", description, status, "imageURL", habitat, "dataAiHint" FROM animals', []);
  return res.rows.map(row => ({
      slug: row.slug,
      name: row.name,
      scientificName: row.scientificName,
      description: row.description,
      status: row.status,
      imageURL: row.imageURL,
      habitat: row.habitat,
      dataAiHint: row.dataAiHint,
  }));
}

export async function getAnimal(slug: string): Promise<Animal | undefined> {
  const res = await query('SELECT slug, name, "scientificName", description, status, "imageURL", habitat, "dataAiHint" FROM animals WHERE slug = $1', [slug]);
  if (res.rows.length > 0) {
    const row = res.rows[0];
    return {
      slug: row.slug,
      name: row.name,
      scientificName: row.scientificName,
      description: row.description,
      status: row.status,
      imageURL: row.imageURL,
      habitat: row.habitat,
      dataAiHint: row.dataAiHint,
    };
  }
  return undefined;
}


// --- Funciones de Datos de Fundaciones ---

export async function getFoundations(): Promise<Foundation[]> {
  const res = await query('SELECT slug, name, mission, location, contact, "imageURL", "dataAiHint", "foundationActivities", lat, lng, "ofcWebsite" FROM foundations', []);
  return res.rows.map(row => ({
      slug: row.slug,
      name: row.name,
      mission: row.mission,
      location: row.location,
      contact: row.contact,
      imageURL: row.imageURL,
      dataAiHint: row.dataAiHint,
      foundationActivities: row.foundationActivities,
      lat: row.lat,
      lng: row.lng,
      ofcWebsite: row.ofcWebsite
  }));
}

export async function getFoundation(slug: string): Promise<Foundation | undefined> {
  const res = await query('SELECT slug, name, mission, location, contact, "imageURL", "dataAiHint", "foundationActivities", lat, lng, "ofcWebsite" FROM foundations WHERE slug = $1', [slug]);
  if (res.rows.length > 0) {
    const row = res.rows[0];
    return {
      slug: row.slug,
      name: row.name,
      mission: row.mission,
      location: row.location,
      contact: row.contact,
      imageURL: row.imageURL,
      dataAiHint: row.dataAiHint,
      foundationActivities: row.foundationActivities,
      lat: row.lat,
      lng: row.lng,
      ofcWebsite: row.ofcWebsite
    };
  }
  return undefined;
}

export async function getMapFeatures(): Promise<string> {
    const foundations = await getFoundations();
    if (!foundations || foundations.length === 0) {
      return "No hay características de mapa disponibles.";
    }
    return foundations.map(f => `${f.name} en ${f.location}`).join(', ');
}
