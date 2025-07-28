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
};

export const foundations: Foundation[] = [
  {
    slug: 'wildlife-conservation-network',
    name: 'Wildlife Conservation Network',
    mission: 'To protect endangered species and their habitats by supporting innovative, community-based conservation efforts.',
    location: 'Global',
    contact: 'info@wcn.org',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'wildlife conservation',
    recentSightings: 'An increase in elephant sightings near protected corridors in Kenya.',
    foundationActivities: 'Hosted a workshop on human-wildlife conflict resolution and launched a new funding initiative for snow leopard conservation.',
  },
  {
    slug: 'world-wildlife-fund',
    name: 'World Wildlife Fund (WWF)',
    mission: 'To conserve nature and reduce the most pressing threats to the diversity of life on Earth.',
    location: 'Global',
    contact: 'contact@wwf.org',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'earth globe',
    recentSightings: 'Camera traps captured footage of a new tiger family in the Terai Arc Landscape, Nepal.',
    foundationActivities: 'Published a report on plastic pollution in oceans and supported a major reforestation project in the Amazon.',
  },
  {
    slug: 'panthera-corporation',
    name: 'Panthera Corporation',
    mission: 'To ensure a future for wild cats and the vast landscapes on which they depend.',
    location: 'Global',
    contact: 'info@panthera.org',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'wild cat',
    recentSightings: 'Successful GPS collaring of a jaguar in the Pantanal to track its movement and behavior.',
    foundationActivities: 'Working with local governments in Southeast Asia to establish anti-poaching patrols to protect tigers.',
  },
  {
    slug: 'savanna-wildlife-trust',
    name: 'Savanna Wildlife Trust',
    mission: 'Dedicated to the conservation of the African savanna ecosystem and its magnificent wildlife.',
    location: 'Serengeti, Tanzania',
    contact: 'contact@savannawild.org',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'savanna landscape',
    recentSightings: 'Large herds of wildebeest and zebra were observed during their annual migration across the Mara River.',
    foundationActivities: 'Completed a new ranger outpost to improve surveillance against poaching. Conducted a community outreach program on sustainable grazing practices.',
  },
];

export const mapFeatures = foundations.map(f => `${f.name} in ${f.location}`).join(', ');
