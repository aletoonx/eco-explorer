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

const animals: Animal[] = [
    {
        slug: "jaguar",
        name: "Jaguar",
        scientificName: "Panthera onca",
        description: "The jaguar is a large cat species and the only living member of the genus Panthera native to the Americas. It is the third-largest cat species, after the tiger and the lion.",
        status: "Near Threatened",
        imageUrl: "https://placehold.co/800x450.png",
        habitat: "Tropical and subtropical moist broadleaf forests",
        dataAiHint: 'jaguar animal'
    },
    {
        slug: "scarlet-macaw",
        name: "Scarlet Macaw",
        scientificName: "Ara macao",
        description: "The scarlet macaw is a large red, yellow, and blue Central and South American parrot, a member of a large group of Neotropical parrots called macaws.",
        status: "Least Concern",
        imageUrl: "https://placehold.co/800x450.png",
        habitat: "Humid evergreen forests",
        dataAiHint: 'macaw bird'
    },
    {
        slug: "sea-turtle",
        name: "Green Sea Turtle",
        scientificName: "Chelonia mydas",
        description: "The green sea turtle, also known as the green turtle, black (sea) turtle or Pacific green turtle, is a species of large sea turtle of the family Cheloniidae.",
        status: "Endangered",
        imageUrl: "https://placehold.co/800x450.png",
        habitat: "Tropical and subtropical oceans worldwide",
        dataAiHint: 'sea turtle'
    },
];

const foundations: Foundation[] = [
    {
        slug: "corcovado-foundation",
        name: "Corcovado Foundation",
        mission: "To promote conservation and sustainable development in the Osa Peninsula, protecting its natural resources for future generations.",
        location: "Osa Peninsula, Costa Rica",
        contact: "info@corcovadofoundation.org",
        imageUrl: "https://placehold.co/800x400.png",
        dataAiHint: "tropical rainforest",
        recentSightings: "Recent sightings include Baird's Tapirs, White-faced Capuchin monkeys, and several species of poison dart frogs.",
        foundationActivities: "The foundation is currently running a sea turtle conservation program and a local environmental education initiative.",
        lat: 8.5833, 
        lng: -83.5833
    },
    {
        slug: "tortuguero-conservancy",
        name: "Tortuguero Conservancy",
        mission: "Dedicated to the protection of sea turtles and their habitats in the Tortuguero area, a critical nesting site for several species.",
        location: "Tortuguero, Costa Rica",
        contact: "contact@tortugueroconservancy.org",
        imageUrl: "https://placehold.co/800x400.png",
        dataAiHint: "sea turtle nesting",
        recentSightings: "Nesting season for Green Sea Turtles is underway, with occasional sightings of Leatherback and Hawksbill turtles.",
        foundationActivities: "Nightly patrols to protect nesting turtles and their eggs from poachers. Community beach clean-ups are organized weekly.",
        lat: 10.5933, 
        lng: -83.5186
    },
    {
        slug: "monteverde-institute",
        name: "Monteverde Institute",
        mission: "An educational and research organization dedicated to the conservation of the Monteverde cloud forest through community-based programs.",
        location: "Monteverde, Costa Rica",
        contact: "admin@monteverde-institute.org",
        imageUrl: "https://placehold.co/800x400.png",
        dataAiHint: "cloud forest",
        recentSightings: "The Resplendent Quetzal is frequently spotted, along with Three-wattled Bellbirds and a diverse array of hummingbirds.",
        foundationActivities: "Ongoing reforestation projects with native species and long-term climate monitoring research within the cloud forest.",
        lat: 10.3,
        lng: -84.8167
    },
    {
        slug: 'manuel-antonio-park',
        name: 'Manuel Antonio National Park',
        mission: 'Protecting a diverse range of ecosystems, from lush rainforests to pristine beaches and coral reefs, for wildlife and visitors alike.',
        location: 'Puntarenas Province, Costa Rica',
        contact: 'info@manuelantonio.com',
        imageUrl: 'https://placehold.co/800x400.png',
        dataAiHint: 'tropical beach',
        recentSightings: 'Sightings of sloths, three species of monkeys, and toucans are very common along the park trails.',
        foundationActivities: 'The park is focused on trail maintenance to prevent erosion and managing visitor impact to protect sensitive wildlife areas.',
        lat: 9.393,
        lng: -84.144,
    },
    {
        slug: 'arenal-conservation',
        name: 'Arenal Conservation Area',
        mission: 'Managing and conserving the natural resources surrounding the Arenal Volcano, including its vast lake and geothermal areas.',
        location: 'Alajuela Province, Costa Rica',
        contact: 'contact@arenal.org',
        imageUrl: 'https://placehold.co/800x400.png',
        dataAiHint: 'volcano jungle',
        recentSightings: 'Coatis, howler monkeys, and a rich diversity of birdlife, including the Montezuma Oropendola, are frequently seen.',
        foundationActivities: 'The area focuses on monitoring volcanic activity and its impact on the ecosystem, as well as promoting sustainable tourism.',
        lat: 10.463,
        lng: -84.703,
    },
    {
        slug: "jaguar-rescue-center",
        name: "Jaguar Rescue Center",
        mission: "To rescue, rehabilitate, and reintroduce injured, orphaned, and confiscated wildlife back into their natural habitats.",
        location: "Puerto Viejo de Talamanca, Costa Rica",
        contact: "info@jaguarrescue.foundation",
        imageUrl: "https://placehold.co/800x400.png",
        dataAiHint: "sloth hanging",
        recentSightings: "Rehabilitation of two-toed sloths, spider monkeys, and various tropical birds.",
        foundationActivities: "Public educational tours to raise awareness about wildlife conservation and the threats they face.",
        lat: 9.6648,
        lng: -82.7845
    }
];

// --- Animal Data Functions ---

export function getAnimals(): Animal[] {
  return animals;
}

export function getAnimal(slug: string): Animal | undefined {
  return animals.find((animal) => animal.slug === slug);
}


// --- Foundation Data Functions ---

export function getFoundations(): Foundation[] {
  return foundations;
}

export function getFoundation(slug: string): Foundation | undefined {
  return foundations.find((foundation) => foundation.slug === slug);
}

export function getMapFeatures(): string {
    return foundations.map(f => `${f.name} in ${f.location}`).join(', ');
}
