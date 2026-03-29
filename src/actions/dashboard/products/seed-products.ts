import { prisma } from "@/lib/prisma";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/* const pick = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)]; */

const fakeImages = (count = 2): string =>
    JSON.stringify(
        Array.from(
            { length: count },
            (_, i) =>
                `https://picsum.photos/seed/${Math.floor(Math.random() * 1000) + i}/600/800`,
        ),
    );

const randomPrice = (min: number, max: number) =>
    parseFloat((Math.random() * (max - min) + min).toFixed(2));

const randomStock = () => Math.floor(Math.random() * 100) + 5;

// ─────────────────────────────────────────────
// GÉNEROS — siempre los mismos 4
// ─────────────────────────────────────────────

const seedGenders = async () => {
    await prisma.gender.createMany({
        data: [
            {
                name: "Hombre",
                slug: "hombre",
                description: "Ropa y accesorios para hombre",
            },
            {
                name: "Mujer",
                slug: "mujer",
                description: "Ropa y accesorios para mujer",
            },
            {
                name: "Niños",
                slug: "ninos",
                description: "Ropa y accesorios para niños",
            },
            {
                name: "Unisex",
                slug: "unisex",
                description: "Prendas para todos",
            },
        ],
    });
    console.log("✅ 4 géneros creados");
    return prisma.gender.findMany();
};

// ─────────────────────────────────────────────
// CATEGORÍAS — 53
// ─────────────────────────────────────────────

const seedCategories = async () => {
    await prisma.category.createMany({
        data: [
            // Tops
            {
                name: "Camisetas",
                slug: "camisetas",
                description: "Camisetas y tops para toda ocasión",
                image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
            },
            {
                name: "Camisas",
                slug: "camisas",
                description: "Camisas formales e informales",
                image: "https://images.unsplash.com/photo-1603251578711-3290ca1a0187?w=400",
            },
            {
                name: "Blusas",
                slug: "blusas",
                description: "Blusas femeninas para todo estilo",
                image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=400",
            },
            {
                name: "Polos",
                slug: "polos",
                description: "Polos y camisetas tipo polo",
                image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400",
            },
            {
                name: "Camisetas sin Mangas",
                slug: "camisetas-sin-mangas",
                description: "Tops y camisetas sin mangas",
                image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400",
            },
            {
                name: "Crop Tops",
                slug: "crop-tops",
                description: "Crop tops y tops cortos",
                image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400",
            },
            {
                name: "Sudaderas",
                slug: "sudaderas",
                description: "Sudaderas con y sin capucha",
                image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400",
            },
            {
                name: "Hoodies",
                slug: "hoodies",
                description: "Hoodies y sudaderas con capucha",
                image: "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=400",
            },
            // Bottoms
            {
                name: "Pantalones",
                slug: "pantalones",
                description: "Pantalones para hombre y mujer",
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
            },
            {
                name: "Jeans",
                slug: "jeans",
                description: "Jeans de todo corte y estilo",
                image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400",
            },
            {
                name: "Leggins",
                slug: "leggins",
                description: "Leggins deportivos y casuales",
                image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400",
            },
            {
                name: "Shorts",
                slug: "shorts",
                description: "Shorts y bermudas para el calor",
                image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400",
            },
            {
                name: "Faldas",
                slug: "faldas",
                description: "Faldas de todo largo y estilo",
                image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400",
            },
            {
                name: "Joggers",
                slug: "joggers",
                description: "Joggers y pantalones deportivos",
                image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400",
            },
            {
                name: "Pantalones de Vestir",
                slug: "pantalones-de-vestir",
                description: "Pantalones formales de vestir",
                image: "https://images.unsplash.com/photo-1580906853234-0d3a1db0ccf6?w=400",
            },
            // Outerwear
            {
                name: "Chaquetas",
                slug: "chaquetas",
                description: "Chaquetas para toda ocasión",
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
            },
            {
                name: "Abrigos",
                slug: "abrigos",
                description: "Abrigos para el frío",
                image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400",
            },
            {
                name: "Impermeables",
                slug: "impermeables",
                description: "Impermeables y rompevientos",
                image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400",
            },
            {
                name: "Blazers",
                slug: "blazers",
                description: "Blazers y sacos formales",
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400",
            },
            {
                name: "Chalecos",
                slug: "chalecos",
                description: "Chalecos y prendas sin mangas",
                image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400",
            },
            {
                name: "Parkas",
                slug: "parkas",
                description: "Parkas y chaquetas de invierno",
                image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400",
            },
            // Calzado
            {
                name: "Zapatos",
                slug: "zapatos",
                description: "Zapatos para toda ocasión",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
            },
            {
                name: "Tenis",
                slug: "tenis",
                description: "Tenis y zapatillas deportivas",
                image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
            },
            {
                name: "Botas",
                slug: "botas",
                description: "Botas de todo estilo",
                image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400",
            },
            {
                name: "Sandalias",
                slug: "sandalias",
                description: "Sandalias y chanclas",
                image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400",
            },
            {
                name: "Tacones",
                slug: "tacones",
                description: "Tacones y zapatos de vestir",
                image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
            },
            {
                name: "Mocasines",
                slug: "mocasines",
                description: "Mocasines y zapatos casuales",
                image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400",
            },
            {
                name: "Pantuflas",
                slug: "pantuflas",
                description: "Pantuflas y calzado de hogar",
                image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
            },
            // Interior y pijamas
            {
                name: "Ropa Interior",
                slug: "ropa-interior",
                description: "Ropa interior para hombre y mujer",
                image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400",
            },
            {
                name: "Pijamas",
                slug: "pijamas",
                description: "Pijamas y ropa para dormir",
                image: "https://images.unsplash.com/photo-1631015084851-1161c97e8b24?w=400",
            },
            {
                name: "Bras y Tops Deportivos",
                slug: "bras-tops-deportivos",
                description: "Bras y tops de soporte deportivo",
                image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400",
            },
            {
                name: "Calcetines",
                slug: "calcetines",
                description: "Calcetines de todo tipo",
                image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400",
            },
            // Deportivo
            {
                name: "Ropa Deportiva",
                slug: "ropa-deportiva",
                description: "Ropa para entrenar y hacer deporte",
                image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400",
            },
            {
                name: "Trajes de Baño",
                slug: "trajes-de-bano",
                description: "Vestidos de baño y ropa para playa",
                image: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=400",
            },
            {
                name: "Ropa de Yoga",
                slug: "ropa-de-yoga",
                description: "Ropa cómoda para yoga y pilates",
                image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400",
            },
            {
                name: "Ropa de Ciclismo",
                slug: "ropa-de-ciclismo",
                description: "Ropa técnica para ciclismo",
                image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400",
            },
            // Accesorios
            {
                name: "Accesorios",
                slug: "accesorios",
                description: "Accesorios de moda variados",
                image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=400",
            },
            {
                name: "Bolsos",
                slug: "bolsos",
                description: "Bolsos y carteras para mujer",
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
            },
            {
                name: "Maletines",
                slug: "maletines",
                description: "Maletines y bolsos para hombre",
                image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
            },
            {
                name: "Mochilas",
                slug: "mochilas",
                description: "Mochilas y bolsos de espalda",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
            },
            {
                name: "Cinturones",
                slug: "cinturones",
                description: "Cinturones de cuero y tela",
                image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400",
            },
            {
                name: "Gorras",
                slug: "gorras",
                description: "Gorras, sombreros y viseras",
                image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400",
            },
            {
                name: "Bufandas",
                slug: "bufandas",
                description: "Bufandas, pañuelos y cuellos",
                image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400",
            },
            {
                name: "Guantes",
                slug: "guantes",
                description: "Guantes de abrigo y moda",
                image: "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=400",
            },
            {
                name: "Gafas de Sol",
                slug: "gafas-de-sol",
                description: "Gafas de sol y óptica de moda",
                image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400",
            },
            {
                name: "Joyería",
                slug: "joyeria",
                description: "Collares, aretes, pulseras y anillos",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
            },
            {
                name: "Relojes",
                slug: "relojes",
                description: "Relojes de moda y deporte",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
            },
            // Niños
            {
                name: "Ropa de Niños",
                slug: "ropa-de-ninos",
                description: "Ropa para niños y niñas",
                image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400",
            },
            {
                name: "Calzado Infantil",
                slug: "calzado-infantil",
                description: "Zapatos y tenis para niños",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
            },
            {
                name: "Accesorios Infantiles",
                slug: "accesorios-infantiles",
                description: "Accesorios y complementos para niños",
                image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400",
            },
            // Formal
            {
                name: "Trajes",
                slug: "trajes",
                description: "Trajes y conjuntos formales",
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400",
            },
            {
                name: "Vestidos",
                slug: "vestidos",
                description: "Vestidos casuales y de fiesta",
                image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
            },
            {
                name: "Conjuntos",
                slug: "conjuntos",
                description: "Conjuntos y sets coordinados",
                image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",
            },
        ],
    });
    console.log("✅ 53 categorías creadas");
    return prisma.category.findMany();
};

// ─────────────────────────────────────────────
// PRODUCTOS
// ─────────────────────────────────────────────

const buildProducts = (
    categories: { id: string; slug: string }[],
    genders: { id: string; slug: string }[],
) => {
    const c = Object.fromEntries(
        categories.map((x) => [x.slug, x.id]),
    );
    const g = Object.fromEntries(genders.map((x) => [x.slug, x.id]));

    return [
        // ── CAMISETAS ──────────────────────────────────────────────────
        {
            name: "Camiseta Básica Blanca",
            slug: "camiseta-basica-blanca",
            description:
                "Camiseta de algodón 100%, corte regular, perfecta para el día a día.",
            price: randomPrice(15, 35),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: c["camisetas"] }] },
            genders: {
                connect: [{ id: g["hombre"] }, { id: g["unisex"] }],
            },
        },
        {
            name: "Camiseta Oversize Negra",
            slug: "camiseta-oversize-negra",
            description:
                "Estilo urbano con corte oversize, tela suave y transpirable.",
            price: randomPrice(20, 45),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["camisetas"] }] },
            genders: {
                connect: [{ id: g["mujer"] }, { id: g["unisex"] }],
            },
        },
        {
            name: "Camiseta Estampada Kids",
            slug: "camiseta-estampada-kids",
            description:
                "Camiseta con estampado divertido para los más pequeños.",
            price: randomPrice(10, 22),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["camisetas"] }] },
            genders: { connect: [{ id: g["ninos"] }] },
        },
        {
            name: "Camiseta Polo Clásica",
            slug: "camiseta-polo-clasica",
            description:
                "Polo de piqué con botones, elegante y cómodo.",
            price: randomPrice(30, 60),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: {
                connect: [{ id: c["camisetas"] }, { id: c["polos"] }],
            },
            genders: { connect: [{ id: g["hombre"] }] },
        },
        {
            name: "Camiseta Rayas Marineras",
            slug: "camiseta-rayas-marineras",
            description:
                "Camiseta con estampado de rayas horizontales estilo marino.",
            price: randomPrice(18, 38),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["camisetas"] }] },
            genders: {
                connect: [{ id: g["hombre"] }, { id: g["mujer"] }],
            },
        },

        // ── CAMISAS ────────────────────────────────────────────────────
        {
            name: "Camisa Oxford Azul",
            slug: "camisa-oxford-azul",
            description:
                "Camisa Oxford de algodón, perfecta para la oficina.",
            price: randomPrice(35, 70),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: c["camisas"] }] },
            genders: { connect: [{ id: g["hombre"] }] },
        },
        {
            name: "Camisa Lino Blanca",
            slug: "camisa-lino-blanca",
            description:
                "Camisa de lino transpirable, ideal para verano.",
            price: randomPrice(30, 60),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["camisas"] }] },
            genders: {
                connect: [{ id: g["hombre"] }, { id: g["mujer"] }],
            },
        },
        {
            name: "Camisa Cuadros Flannel",
            slug: "camisa-cuadros-flannel",
            description:
                "Camisa de franela con estampado de cuadros escoceses.",
            price: randomPrice(28, 55),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["camisas"] }] },
            genders: {
                connect: [{ id: g["hombre"] }, { id: g["unisex"] }],
            },
        },

        // ── BLUSAS ─────────────────────────────────────────────────────
        {
            name: "Blusa Seda Rosada",
            slug: "blusa-seda-rosada",
            description:
                "Blusa de seda artificial con cuello lazo, muy elegante.",
            price: randomPrice(35, 75),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: true,
            categories: { connect: [{ id: c["blusas"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Blusa Bordada Floral",
            slug: "blusa-bordada-floral",
            description:
                "Blusa con bordado floral artesanal, manga larga.",
            price: randomPrice(30, 65),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["blusas"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },

        // ── HOODIES ────────────────────────────────────────────────────
        {
            name: "Hoodie Fleece Gris",
            slug: "hoodie-fleece-gris",
            description:
                "Hoodie de felpa cepillada con capucha y bolsillo canguro.",
            price: randomPrice(40, 80),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: {
                connect: [
                    { id: c["hoodies"] },
                    { id: c["sudaderas"] },
                ],
            },
            genders: {
                connect: [{ id: g["hombre"] }, { id: g["unisex"] }],
            },
        },
        {
            name: "Hoodie Crop Mujer",
            slug: "hoodie-crop-mujer",
            description:
                "Hoodie corto con capucha y cordón ajustable.",
            price: randomPrice(35, 65),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["hoodies"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Hoodie Estampado Kids",
            slug: "hoodie-estampado-kids",
            description:
                "Hoodie suave con estampado de superhéroe para niños.",
            price: randomPrice(25, 50),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["hoodies"] }] },
            genders: { connect: [{ id: g["ninos"] }] },
        },

        // ── PANTALONES / JEANS ─────────────────────────────────────────
        {
            name: "Jean Slim Azul",
            slug: "jean-slim-azul",
            description:
                "Jean de corte slim fit, tela denim resistente con elastano.",
            price: randomPrice(45, 90),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: {
                connect: [
                    { id: c["pantalones"] },
                    { id: c["jeans"] },
                ],
            },
            genders: { connect: [{ id: g["hombre"] }] },
        },
        {
            name: "Jean Mom Ripped",
            slug: "jean-mom-ripped",
            description:
                "Jean mom fit con rotos en rodillas, tiro alto.",
            price: randomPrice(50, 95),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: true,
            categories: { connect: [{ id: c["jeans"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Leggins Deportivo Negro",
            slug: "leggins-deportivo-negro",
            description:
                "Leggins de alto rendimiento con cintura alta y bolsillos.",
            price: randomPrice(25, 55),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: {
                connect: [
                    { id: c["leggins"] },
                    { id: c["ropa-deportiva"] },
                ],
            },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Pantalón Cargo Kaki",
            slug: "pantalon-cargo-kaki",
            description:
                "Pantalón cargo con múltiples bolsillos, ideal para aventuras.",
            price: randomPrice(40, 75),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["pantalones"] }] },
            genders: {
                connect: [{ id: g["hombre"] }, { id: g["unisex"] }],
            },
        },
        {
            name: "Pantalón Jogger Kids",
            slug: "pantalon-jogger-kids",
            description:
                "Jogger suave con elástico en tobillo, cómodo para jugar.",
            price: randomPrice(18, 35),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: {
                connect: [
                    { id: c["joggers"] },
                    { id: c["ropa-de-ninos"] },
                ],
            },
            genders: { connect: [{ id: g["ninos"] }] },
        },
        {
            name: "Short Deportivo Azul",
            slug: "short-deportivo-azul",
            description:
                "Short ligero con cintura elástica y bolsillos laterales.",
            price: randomPrice(20, 40),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: {
                connect: [
                    { id: c["shorts"] },
                    { id: c["ropa-deportiva"] },
                ],
            },
            genders: {
                connect: [{ id: g["hombre"] }, { id: g["unisex"] }],
            },
        },
        {
            name: "Falda Midi Plisada",
            slug: "falda-midi-plisada",
            description:
                "Falda midi plisada de satén, estilo romántico y elegante.",
            price: randomPrice(35, 70),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: true,
            categories: { connect: [{ id: c["faldas"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },

        // ── CALZADO ────────────────────────────────────────────────────
        {
            name: "Zapatilla Runner Pro",
            slug: "zapatilla-runner-pro",
            description:
                "Zapatilla deportiva con suela de amortiguación y malla transpirable.",
            price: randomPrice(60, 120),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: {
                connect: [{ id: c["tenis"] }, { id: c["zapatos"] }],
            },
            genders: {
                connect: [{ id: g["hombre"] }, { id: g["mujer"] }],
            },
        },
        {
            name: "Bota Chelsea Cuero",
            slug: "bota-chelsea-cuero",
            description:
                "Bota Chelsea de cuero genuino con elástico lateral.",
            price: randomPrice(80, 160),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: c["botas"] }] },
            genders: { connect: [{ id: g["hombre"] }] },
        },
        {
            name: "Sandalia Verano Rosa",
            slug: "sandalia-verano-rosa",
            description:
                "Sandalia ligera con tira ajustable, perfecta para el calor.",
            price: randomPrice(20, 50),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["sandalias"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Tenis Coloridos Kids",
            slug: "tenis-coloridos-kids",
            description:
                "Tenis con cierre de velcro y suela antideslizante para niños.",
            price: randomPrice(25, 55),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: {
                connect: [
                    { id: c["calzado-infantil"] },
                    { id: c["tenis"] },
                ],
            },
            genders: { connect: [{ id: g["ninos"] }] },
        },
        {
            name: "Tacón Stiletto Negro",
            slug: "tacon-stiletto-negro",
            description:
                "Tacón fino de 10cm, punta estrecha, ideal para eventos.",
            price: randomPrice(55, 110),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: true,
            categories: { connect: [{ id: c["tacones"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Mocasín Cuero Café",
            slug: "mocasin-cuero-cafe",
            description:
                "Mocasín de cuero con suela de goma, cómodo y elegante.",
            price: randomPrice(60, 120),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["mocasines"] }] },
            genders: { connect: [{ id: g["hombre"] }] },
        },
        {
            name: "Pantufla Polar Unisex",
            slug: "pantufla-polar-unisex",
            description:
                "Pantufla de polar suave con suela antideslizante.",
            price: randomPrice(12, 28),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["pantuflas"] }] },
            genders: { connect: [{ id: g["unisex"] }] },
        },

        // ── ACCESORIOS ─────────────────────────────────────────────────
        {
            name: "Bolso Tote Canvas",
            slug: "bolso-tote-canvas",
            description:
                "Bolso tote de lona resistente, espacioso y versátil.",
            price: randomPrice(25, 60),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: {
                connect: [
                    { id: c["bolsos"] },
                    { id: c["accesorios"] },
                ],
            },
            genders: {
                connect: [{ id: g["mujer"] }, { id: g["unisex"] }],
            },
        },
        {
            name: "Gorra Snapback Negra",
            slug: "gorra-snapback-negra",
            description:
                "Gorra con cierre ajustable y bordado frontal minimalista.",
            price: randomPrice(15, 35),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["gorras"] }] },
            genders: {
                connect: [{ id: g["hombre"] }, { id: g["unisex"] }],
            },
        },
        {
            name: "Cinturón Cuero Trenzado",
            slug: "cinturon-cuero-trenzado",
            description:
                "Cinturón de cuero trenzado con hebilla dorada.",
            price: randomPrice(20, 45),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["cinturones"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Mochila Escolar Kids",
            slug: "mochila-escolar-kids",
            description:
                "Mochila colorida con compartimentos organizados.",
            price: randomPrice(30, 65),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: {
                connect: [
                    { id: c["mochilas"] },
                    { id: c["accesorios-infantiles"] },
                ],
            },
            genders: { connect: [{ id: g["ninos"] }] },
        },
        {
            name: "Maletín Ejecutivo",
            slug: "maletin-ejecutivo",
            description:
                "Maletín de cuero sintético para laptop y documentos.",
            price: randomPrice(55, 110),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["maletines"] }] },
            genders: { connect: [{ id: g["hombre"] }] },
        },
        {
            name: "Bufanda Lana Cuadros",
            slug: "bufanda-lana-cuadros",
            description:
                "Bufanda de lana con estampado de cuadros clásicos.",
            price: randomPrice(18, 40),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["bufandas"] }] },
            genders: { connect: [{ id: g["unisex"] }] },
        },
        {
            name: "Gafas Sol Aviador",
            slug: "gafas-sol-aviador",
            description:
                "Gafas de sol estilo aviador con lente espejada.",
            price: randomPrice(25, 65),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: true,
            categories: { connect: [{ id: c["gafas-de-sol"] }] },
            genders: { connect: [{ id: g["unisex"] }] },
        },
        {
            name: "Collar Perlas Naturales",
            slug: "collar-perlas-naturales",
            description:
                "Collar de perlas naturales con cierre dorado.",
            price: randomPrice(40, 120),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: true,
            categories: { connect: [{ id: c["joyeria"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Reloj Minimalista Negro",
            slug: "reloj-minimalista-negro",
            description:
                "Reloj de cuarzo con correa de cuero negro y esfera blanca.",
            price: randomPrice(60, 150),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: c["relojes"] }] },
            genders: {
                connect: [{ id: g["hombre"] }, { id: g["unisex"] }],
            },
        },

        // ── CHAQUETAS / ABRIGOS ────────────────────────────────────────
        {
            name: "Chaqueta Bomber Verde",
            slug: "chaqueta-bomber-verde",
            description:
                "Chaqueta bomber de nylon con ribetes en contraste.",
            price: randomPrice(70, 130),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: c["chaquetas"] }] },
            genders: {
                connect: [{ id: g["hombre"] }, { id: g["unisex"] }],
            },
        },
        {
            name: "Abrigo Lana Camel",
            slug: "abrigo-lana-camel",
            description:
                "Abrigo largo de mezcla de lana, corte recto con botones grandes.",
            price: randomPrice(120, 220),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: c["abrigos"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Rompevientos Impermeable",
            slug: "rompevientos-impermeable",
            description:
                "Rompevientos ligero con capucha plegable, resistente al agua.",
            price: randomPrice(55, 100),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["impermeables"] }] },
            genders: {
                connect: [
                    { id: g["hombre"] },
                    { id: g["mujer"] },
                    { id: g["unisex"] },
                ],
            },
        },
        {
            name: "Chaqueta Denim Kids",
            slug: "chaqueta-denim-kids",
            description:
                "Chaqueta de jean clásica para niños con parches decorativos.",
            price: randomPrice(35, 65),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: {
                connect: [
                    { id: c["chaquetas"] },
                    { id: c["ropa-de-ninos"] },
                ],
            },
            genders: { connect: [{ id: g["ninos"] }] },
        },
        {
            name: "Blazer Slim Gris",
            slug: "blazer-slim-gris",
            description:
                "Blazer slim fit de mezcla de lana, ideal para reuniones.",
            price: randomPrice(90, 180),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: c["blazers"] }] },
            genders: { connect: [{ id: g["hombre"] }] },
        },
        {
            name: "Chaleco Puffer Mujer",
            slug: "chaleco-puffer-mujer",
            description:
                "Chaleco acolchado sin mangas con relleno sintético.",
            price: randomPrice(45, 85),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["chalecos"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Parka Invierno Unisex",
            slug: "parka-invierno-unisex",
            description:
                "Parka larga con capucha de pelo sintético y bolsillos múltiples.",
            price: randomPrice(110, 200),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: c["parkas"] }] },
            genders: { connect: [{ id: g["unisex"] }] },
        },

        // ── ROPA INTERIOR / PIJAMAS ────────────────────────────────────
        {
            name: "Pack 3 Boxers Algodón",
            slug: "pack-3-boxers-algodon",
            description:
                "Pack de 3 boxers de algodón peinado, cintura elástica.",
            price: randomPrice(18, 40),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["ropa-interior"] }] },
            genders: { connect: [{ id: g["hombre"] }] },
        },
        {
            name: "Set Lencería Encaje",
            slug: "set-lenceria-encaje",
            description:
                "Conjunto de dos piezas en encaje floral, suave y elegante.",
            price: randomPrice(25, 60),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["ropa-interior"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Pijama Franela Cuadros",
            slug: "pijama-franela-cuadros",
            description:
                "Pijama de franela cálida con estampado de cuadros clásico.",
            price: randomPrice(30, 55),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["pijamas"] }] },
            genders: {
                connect: [
                    { id: g["hombre"] },
                    { id: g["mujer"] },
                    { id: g["unisex"] },
                ],
            },
        },
        {
            name: "Pijama Entero Kids Estrellas",
            slug: "pijama-entero-kids-estrellas",
            description:
                "Enterizo suave con estampado de estrellas, ideal para dormir.",
            price: randomPrice(20, 40),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: {
                connect: [
                    { id: c["pijamas"] },
                    { id: c["ropa-de-ninos"] },
                ],
            },
            genders: { connect: [{ id: g["ninos"] }] },
        },
        {
            name: "Top Deportivo Sin Costuras",
            slug: "top-deportivo-sin-costuras",
            description:
                "Top de soporte medio sin costuras, extra suave al tacto.",
            price: randomPrice(22, 48),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: {
                connect: [{ id: c["bras-tops-deportivos"] }],
            },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Pack Calcetines Deportivos",
            slug: "pack-calcetines-deportivos",
            description:
                "Pack de 5 pares de calcetines con refuerzo en talón y punta.",
            price: randomPrice(12, 25),
            stock: randomStock(),
            images: fakeImages(1),
            isFeatured: false,
            categories: { connect: [{ id: c["calcetines"] }] },
            genders: { connect: [{ id: g["unisex"] }] },
        },

        // ── DEPORTIVO ──────────────────────────────────────────────────
        {
            name: "Conjunto Deportivo Mujer",
            slug: "conjunto-deportivo-mujer",
            description:
                "Set de top y leggins a juego, tela compresiva y transpirable.",
            price: randomPrice(55, 100),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: {
                connect: [
                    { id: c["ropa-deportiva"] },
                    { id: c["conjuntos"] },
                ],
            },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Traje de Baño Hombre",
            slug: "traje-de-bano-hombre",
            description:
                "Pantaloneta de baño con secado rápido y cordón ajustable.",
            price: randomPrice(25, 55),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["trajes-de-bano"] }] },
            genders: { connect: [{ id: g["hombre"] }] },
        },
        {
            name: "Vestido de Baño Una Pieza",
            slug: "vestido-de-bano-una-pieza",
            description:
                "Traje de baño entero con escote V y tiras cruzadas.",
            price: randomPrice(35, 75),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: true,
            categories: { connect: [{ id: c["trajes-de-bano"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Malla Yoga Seamless",
            slug: "malla-yoga-seamless",
            description:
                "Malla sin costuras para yoga, cintura alta, máxima flexibilidad.",
            price: randomPrice(40, 80),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: {
                connect: [
                    { id: c["ropa-de-yoga"] },
                    { id: c["leggins"] },
                ],
            },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Jersey Ciclismo Pro",
            slug: "jersey-ciclismo-pro",
            description:
                "Jersey técnico de ciclismo con bolsillos traseros y cremallera.",
            price: randomPrice(55, 110),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["ropa-de-ciclismo"] }] },
            genders: {
                connect: [{ id: g["hombre"] }, { id: g["unisex"] }],
            },
        },

        // ── FORMAL ─────────────────────────────────────────────────────
        {
            name: "Traje Clásico Negro",
            slug: "traje-clasico-negro",
            description:
                "Traje de dos piezas en lana mezclada, corte italiano.",
            price: randomPrice(200, 450),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: c["trajes"] }] },
            genders: { connect: [{ id: g["hombre"] }] },
        },
        {
            name: "Vestido Cóctel Rojo",
            slug: "vestido-coctel-rojo",
            description:
                "Vestido midi con escote halter y falda evasé, perfecto para eventos.",
            price: randomPrice(80, 160),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: c["vestidos"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Vestido Casual Flores",
            slug: "vestido-casual-flores",
            description:
                "Vestido veraniego con estampado floral y manga globo.",
            price: randomPrice(35, 75),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["vestidos"] }] },
            genders: { connect: [{ id: g["mujer"] }] },
        },
        {
            name: "Conjunto Lino Verano",
            slug: "conjunto-lino-verano",
            description:
                "Conjunto de camisa y pantalón de lino a juego para el calor.",
            price: randomPrice(70, 140),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: c["conjuntos"] }] },
            genders: {
                connect: [{ id: g["hombre"] }, { id: g["unisex"] }],
            },
        },
        {
            name: "Pantalón Vestir Mujer",
            slug: "pantalon-vestir-mujer",
            description:
                "Pantalón de vestir tiro alto con pinzas, acabado satinado.",
            price: randomPrice(50, 100),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: {
                connect: [{ id: c["pantalones-de-vestir"] }],
            },
            genders: { connect: [{ id: g["mujer"] }] },
        },
    ];
};

// ─────────────────────────────────────────────
// SEED PRINCIPAL
// ─────────────────────────────────────────────

export const seedAllProductsRelated = async () => {
    try {
        console.log("🌱 Iniciando seed completo...\n");

        await prisma.product.deleteMany({});
        await prisma.category.deleteMany({});
        await prisma.gender.deleteMany({});

        const categories = await seedCategories();
        const genders = await seedGenders();
        const products = buildProducts(categories, genders);

        let created = 0;
        for (const data of products) {
            await prisma.product.create({ data });
            created++;
            console.log(`   ✔ ${data.name}`);
        }

        console.log(
            `\n✅ Seed completo: ${created} productos creados`,
        );
        return {
            success: true,
            message: `Seed completo: ${created} productos`,
        };
    } catch (error) {
        console.error("❌ Error en seed:", error);
        return { success: false, message: "Error en seed" };
    } finally {
        await prisma.$disconnect();
    }
};
