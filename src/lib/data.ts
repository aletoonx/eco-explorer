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

export const animals: Animal[] = [
  {
    slug: 'bengal-tiger',
    name: 'Bengal Tiger',
    scientificName: 'Panthera tigris tigris',
    description: 'The Bengal tiger is a tiger from a specific population of the Panthera tigris tigris subspecies that is native to the Indian subcontinent. It is threatened by poaching, loss, and fragmentation of habitat, and was estimated at comprising fewer than 2,500 individuals by 2011.',
    status: 'Endangered',
    imageUrl: 'https://placehold.co/600x400.png',
    habitat: 'Grasslands, subtropical and tropical rainforests, scrub forests, wet and dry deciduous forests, and mangroves.',
    dataAiHint: 'bengal tiger',
  },
  {
    slug: 'giant-panda',
    name: 'Giant Panda',
    scientificName: 'Ailuropoda melanoleuca',
    description: 'The giant panda, also known as the panda bear, is a bear native to south central China. It is characterised by its bold black-and-white coat and rotund body.',
    status: 'Vulnerable',
    imageUrl: 'https://placehold.co/600x400.png',
    habitat: 'Temperate broadleaf and mixed forests of southwest China.',
    dataAiHint: 'giant panda',
  },
  {
    slug: 'blue-whale',
    name: 'Blue Whale',
    scientificName: 'Balaenoptera musculus',
    description: 'The blue whale is a marine mammal belonging to the baleen whale parvorder Mysticeti. Reaching a maximum confirmed length of 29.9 meters and weight of 199 tonnes, it is the largest animal known to have ever existed.',
    status: 'Endangered',
    imageUrl: 'https://placehold.co/600x400.png',
    habitat: 'Found in all oceans, from the Arctic to the Antarctic.',
    dataAiHint: 'blue whale',
  },
  {
    slug: 'snow-leopard',
    name: 'Snow Leopard',
    scientificName: 'Panthera uncia',
    description: 'The snow leopard is a large cat native to the mountain ranges of Central and South Asia. It is listed as Vulnerable on the IUCN Red List because the global population is estimated to number less than 10,000 mature individuals and is expected to decline about 10% by 2040.',
    status: 'Vulnerable',
    imageUrl: 'https://placehold.co/600x400.png',
    habitat: 'Alpine and subalpine zones at elevations from 3,000 to 4,500 m.',
    dataAiHint: 'snow leopard',
  },
];

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

export const foundations: Foundation[] = [
  {
    slug: 'corcovado-foundation',
    name: 'Corcovado Foundation',
    mission: 'To protect the natural heritage of Costa Rica by supporting conservation and community development.',
    location: 'Corcovado National Park, Osa Peninsula',
    contact: 'info@corcovadofoundation.org',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'rainforest conservation',
    recentSightings: 'Sightings of Baird\'s Tapir have increased by 15% in the last year.',
    foundationActivities: 'Reforestation of 50 hectares and a new sea turtle monitoring program.',
    lat: 8.57,
    lng: -83.58
  },
  {
    slug: 'monteverde-conservation-league',
    name: 'Monteverde Conservation League',
    mission: 'To conserve, preserve, and rehabilitate tropical ecosystems, their biodiversity, and their communities.',
    location: 'Monteverde, Puntarenas',
    contact: 'contact@acmcr.org',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'cloud forest',
    recentSightings: 'The Resplendent Quetzal has been spotted frequently during its nesting season.',
    foundationActivities: 'Acquired 100 acres of land to expand the Children\'s Eternal Rainforest and launched an environmental education program for local schools.',
    lat: 10.3,
    lng: -84.82
  },
  {
    slug: 'tortuguero-conservancy',
    name: 'Tortuguero Conservancy',
    mission: 'To protect sea turtles and their habitats in the Tortuguero area.',
    location: 'Tortuguero National Park, Limón',
    contact: 'info@tortugueroconservancy.org',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'sea turtle',
    recentSightings: 'Record number of green sea turtle nests documented this season.',
    foundationActivities: 'Nightly patrols to protect nesting turtles from poachers and a new research project on the impact of climate change on hatchling success.',
    lat: 10.54,
    lng: -83.5
  },
  {
    slug: 'jaguar-rescue-center',
    name: 'Jaguar Rescue Center',
    mission: 'To rescue and rehabilitate injured, orphaned, and displaced wild animals and release them back into their natural habitats.',
    location: 'Puerto Viejo de Talamanca, Limón',
    contact: 'info@jaguarrescue.foundation',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'jaguar wildlife',
    recentSightings: 'A rehabilitated two-toed sloth was successfully released back into the wild.',
    foundationActivities: 'Opened a new veterinary clinic for wildlife and expanded the enclosure for recovering monkeys.',
    lat: 9.66,
    lng: -82.76
  },
];

export const mapFeatures = foundations.map(f => `${f.name} in ${f.location}`).join(', ');
