import { prisma } from "@/lib/prisma";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const pick = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

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
// CATEGORÍAS
// ─────────────────────────────────────────────

const seedCategories = async () => {
    const categories = await prisma.category.createMany({
        data: [
            {
                name: "Camisetas",
                slug: "camisetas",
                description: "Camisetas y tops para toda ocasión",
                image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
            },
            {
                name: "Pantalones",
                slug: "pantalones",
                description: "Pantalones, jeans y leggins",
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
            },
            {
                name: "Zapatos",
                slug: "zapatos",
                description: "Calzado para hombre, mujer y niños",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
            },
            {
                name: "Accesorios",
                slug: "accesorios",
                description: "Bolsos, cinturones, gorras y más",
                image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=400",
            },
            {
                name: "Chaquetas",
                slug: "chaquetas",
                description: "Chaquetas, abrigos y rompevientos",
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
            },
            {
                name: "Ropa Interior",
                slug: "ropa-interior",
                description: "Ropa interior y pijamas",
                image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400",
            },
        ],
    });

    console.log(`✅ ${categories.count} categorías creadas`);
    return prisma.category.findMany();
};

// ─────────────────────────────────────────────
// GÉNEROS
// ─────────────────────────────────────────────

const seedGenders = async () => {
    const genders = await prisma.gender.createMany({
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

    console.log(`✅ ${genders.count} géneros creados`);
    return prisma.gender.findMany();
};

// ─────────────────────────────────────────────
// PRODUCTOS
// ─────────────────────────────────────────────

const buildProducts = (
    categories: { id: string; slug: string }[],
    genders: { id: string; slug: string }[],
) => {
    const catMap = Object.fromEntries(
        categories.map((c) => [c.slug, c.id]),
    );
    const genMap = Object.fromEntries(
        genders.map((g) => [g.slug, g.id]),
    );

    return [
        // ── CAMISETAS ──────────────────────────────
        {
            name: "Camiseta Básica Blanca",
            slug: "camiseta-basica-blanca",
            description:
                "Camiseta de algodón 100%, corte regular, perfecta para el día a día.",
            price: randomPrice(15, 35),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: catMap["camisetas"] }] },
            genders: {
                connect: [
                    { id: genMap["hombre"] },
                    { id: genMap["unisex"] },
                ],
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
            categories: { connect: [{ id: catMap["camisetas"] }] },
            genders: {
                connect: [
                    { id: genMap["mujer"] },
                    { id: genMap["unisex"] },
                ],
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
            categories: { connect: [{ id: catMap["camisetas"] }] },
            genders: { connect: [{ id: genMap["ninos"] }] },
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
            categories: { connect: [{ id: catMap["camisetas"] }] },
            genders: { connect: [{ id: genMap["hombre"] }] },
        },

        // ── PANTALONES ────────────────────────────
        {
            name: "Jean Slim Azul",
            slug: "jean-slim-azul",
            description:
                "Jean de corte slim fit, tela denim resistente con elastano.",
            price: randomPrice(45, 90),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: catMap["pantalones"] }] },
            genders: { connect: [{ id: genMap["hombre"] }] },
        },
        {
            name: "Leggins Deportivo Negro",
            slug: "leggins-deportivo-negro",
            description:
                "Leggins de alto rendimiento con cintura alta y bolsillos laterales.",
            price: randomPrice(25, 55),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: catMap["pantalones"] }] },
            genders: { connect: [{ id: genMap["mujer"] }] },
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
            categories: { connect: [{ id: catMap["pantalones"] }] },
            genders: {
                connect: [
                    { id: genMap["hombre"] },
                    { id: genMap["unisex"] },
                ],
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
            categories: { connect: [{ id: catMap["pantalones"] }] },
            genders: { connect: [{ id: genMap["ninos"] }] },
        },

        // ── ZAPATOS ───────────────────────────────
        {
            name: "Zapatilla Runner Pro",
            slug: "zapatilla-runner-pro",
            description:
                "Zapatilla deportiva con suela de amortiguación y malla transpirable.",
            price: randomPrice(60, 120),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: catMap["zapatos"] }] },
            genders: {
                connect: [
                    { id: genMap["hombre"] },
                    { id: genMap["mujer"] },
                ],
            },
        },
        {
            name: "Bota Chelsea Cuero",
            slug: "bota-chelsea-cuero",
            description:
                "Bota Chelsea de cuero genuino con elástico lateral, estilo clásico.",
            price: randomPrice(80, 160),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: catMap["zapatos"] }] },
            genders: { connect: [{ id: genMap["hombre"] }] },
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
            categories: { connect: [{ id: catMap["zapatos"] }] },
            genders: { connect: [{ id: genMap["mujer"] }] },
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
            categories: { connect: [{ id: catMap["zapatos"] }] },
            genders: { connect: [{ id: genMap["ninos"] }] },
        },

        // ── ACCESORIOS ────────────────────────────
        {
            name: "Bolso Tote Canvas",
            slug: "bolso-tote-canvas",
            description:
                "Bolso tote de lona resistente, espacioso y versátil.",
            price: randomPrice(25, 60),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: catMap["accesorios"] }] },
            genders: {
                connect: [
                    { id: genMap["mujer"] },
                    { id: genMap["unisex"] },
                ],
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
            categories: { connect: [{ id: catMap["accesorios"] }] },
            genders: {
                connect: [
                    { id: genMap["hombre"] },
                    { id: genMap["unisex"] },
                ],
            },
        },
        {
            name: "Cinturón Cuero Trenzado",
            slug: "cinturon-cuero-trenzado",
            description:
                "Cinturón de cuero trenzado con hebilla dorada, talla única ajustable.",
            price: randomPrice(20, 45),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: { connect: [{ id: catMap["accesorios"] }] },
            genders: { connect: [{ id: genMap["mujer"] }] },
        },
        {
            name: "Mochila Escolar Kids",
            slug: "mochila-escolar-kids",
            description:
                "Mochila colorida con compartimentos organizados y diseño ergonómico.",
            price: randomPrice(30, 65),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: catMap["accesorios"] }] },
            genders: { connect: [{ id: genMap["ninos"] }] },
        },

        // ── CHAQUETAS ─────────────────────────────
        {
            name: "Chaqueta Bomber Verde",
            slug: "chaqueta-bomber-verde",
            description:
                "Chaqueta bomber de nylon con ribetes en contraste, estilo militar.",
            price: randomPrice(70, 130),
            stock: randomStock(),
            images: fakeImages(3),
            isFeatured: true,
            categories: { connect: [{ id: catMap["chaquetas"] }] },
            genders: {
                connect: [
                    { id: genMap["hombre"] },
                    { id: genMap["unisex"] },
                ],
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
            categories: { connect: [{ id: catMap["chaquetas"] }] },
            genders: { connect: [{ id: genMap["mujer"] }] },
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
            categories: { connect: [{ id: catMap["chaquetas"] }] },
            genders: {
                connect: [
                    { id: genMap["hombre"] },
                    { id: genMap["mujer"] },
                    { id: genMap["unisex"] },
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
            categories: { connect: [{ id: catMap["chaquetas"] }] },
            genders: { connect: [{ id: genMap["ninos"] }] },
        },

        // ── ROPA INTERIOR ─────────────────────────
        {
            name: "Pack 3 Boxers Algodón",
            slug: "pack-3-boxers-algodon",
            description:
                "Pack de 3 boxers de algodón peinado, cintura elástica de marca.",
            price: randomPrice(18, 40),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: {
                connect: [{ id: catMap["ropa-interior"] }],
            },
            genders: { connect: [{ id: genMap["hombre"] }] },
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
            categories: {
                connect: [{ id: catMap["ropa-interior"] }],
            },
            genders: { connect: [{ id: genMap["mujer"] }] },
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
            categories: {
                connect: [{ id: catMap["ropa-interior"] }],
            },
            genders: {
                connect: [
                    { id: genMap["hombre"] },
                    { id: genMap["mujer"] },
                    { id: genMap["unisex"] },
                ],
            },
        },
        {
            name: "Pijama Entero Kids Estrellas",
            slug: "pijama-entero-kids-estrellas",
            description:
                "Enterizo suave con estampado de estrellas, ideal para dormir cómodo.",
            price: randomPrice(20, 40),
            stock: randomStock(),
            images: fakeImages(2),
            isFeatured: false,
            categories: {
                connect: [{ id: catMap["ropa-interior"] }],
            },
            genders: { connect: [{ id: genMap["ninos"] }] },
        },
    ];
};

// ─────────────────────────────────────────────
// SEED PRINCIPAL
// ─────────────────────────────────────────────

export const seedAllProductsRelated = async () => {
    try {
        console.log("🌱 Iniciando seed...\n");

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
            `\n✅ ${created} productos creados correctamente`,
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
