-- =================================================================
-- Tabla de Fundaciones
-- Contiene información sobre las organizaciones de conservación.
-- =================================================================

-- Primero, eliminamos la tabla si ya existe para evitar errores en ejecuciones repetidas
DROP TABLE IF EXISTS foundations;

-- Creamos la tabla 'foundations'
CREATE TABLE foundations (
    slug VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mission TEXT,
    location VARCHAR(255),
    contact VARCHAR(255),
    "imageURL" VARCHAR(255),
    "dataAiHint" VARCHAR(255),
    "foundationActivities" TEXT,
    lat NUMERIC(10, 6),
    lng NUMERIC(10, 6)
);

-- Insertamos los datos de ejemplo en 'foundations'
INSERT INTO foundations (slug, name, mission, location, contact, "imageURL", "dataAiHint", "foundationActivities", lat, lng) VALUES
('fundacion-patitas-felices', 'Fundación Patitas Felices', 'Rescatamos y rehabilitamos jaguares y otros felinos en peligro.', 'Guanacaste, Costa Rica', 'info@patitasfelices.org', 'https://areasyparques.com/wp-content/uploads/2021/04/jaguar-panthera-onca.jpg', 'jaguar jungle', 'Monitoreo con cámaras trampa, programas de liberación y educación comunitaria.', 10.3839, -85.6033),
('santuario-lapas-verdes', 'Santuario de Lapas Verdes', 'Dedicados a la conservación y reintroducción de la lapa verde (Ara ambiguus).', 'Sarapiquí, Heredia, Costa Rica', 'contacto@lapasverdes.cr', 'https://areasyparques.com/wp-content/uploads/2021/06/lapa-verde-unica-de-america.jpg', 'green macaw', 'Cría en cautiverio, reforestación de su hábitat y protección de nidos.', 10.45, -84.0167),
('centro-rescate-osos-perezosos', 'Centro de Rescate de Osos Perezosos', 'Rescate, rehabilitación y estudio de osos perezosos de dos y tres dedos.', 'Limón, Costa Rica', 'ayuda@ososperezosos.org', 'https://areasyparques.com/wp-content/uploads/2019/02/oso-perezoso-o-perico-ligero-1.jpg', 'sloth rainforest', 'Atención veterinaria especializada, investigación de comportamiento y liberación en zonas seguras.', 9.989, -83.03);


-- =================================================================
-- Tabla de Animales
-- Contiene información sobre las diferentes especies.
-- =================================================================

-- Eliminamos la tabla si ya existe
DROP TABLE IF EXISTS animals;

-- Creamos la tabla 'animals'
CREATE TABLE animals (
    slug VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "scientificName" VARCHAR(255),
    description TEXT,
    status VARCHAR(100),
    "imageURL" VARCHAR(255),
    habitat VARCHAR(255),
    "dataAiHint" VARCHAR(255)
);

-- Insertamos los datos de ejemplo en 'animals'
INSERT INTO animals (slug, name, "scientificName", description, status, "imageURL", "dataAiHint", habitat) VALUES
('jaguar', 'Jaguar', 'Panthera onca', 'El jaguar es el felino más grande de América y el tercero en el mundo. Es un superdepredador clave para mantener la salud de los ecosistemas.', 'En Peligro', 'https://areasyparques.com/wp-content/uploads/2021/04/jaguar-panthera-onca.jpg', 'jaguar jungle', 'Selvas tropicales, pantanos y bosques ribereños'),
('lapa-verde', 'Lapa Verde', 'Ara ambiguus', 'La lapa verde es una de las guacamayas más grandes del mundo. Su plumaje vibrante y su fuerte pico la hacen inconfundible.', 'En Peligro', 'https://areasyparques.com/wp-content/uploads/2021/06/lapa-verde-unica-de-america.jpg', 'green macaw', 'Bosques húmedos de tierras bajas, a menudo cerca de almendros de montaña'),
('oso-perezoso', 'Oso Perezoso de Tres Dedos', 'Bradypus', 'Conocidos por su movimiento lento y su sonrisa perpetua, los perezosos pasan la mayor parte de su vida en los árboles, alimentándose de hojas.', 'Preocupación Menor', 'https://areasyparques.com/wp-content/uploads/2019/02/oso-perezoso-o-perico-ligero-1.jpg', 'sloth rainforest', 'Bosques tropicales de América Central y del Sur'),
('delfin-nariz-de-botella', 'Delfín Nariz de Botella', 'Tursiops truncatus', 'Estos inteligentes mamíferos marinos son conocidos por sus acrobacias y su naturaleza social. Se encuentran en aguas cálidas y templadas de todo el mundo.', 'Preocupación Menor', 'https://areasyparques.com/wp-content/uploads/2021/05/delfin-nariz-de-botella.jpg', 'dolphin ocean', 'Océanos y mares costeros');
