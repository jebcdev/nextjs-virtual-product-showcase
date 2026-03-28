export const APP_NAME =
    process.env.NEXT_PUBLIC_APP_NAME! ?? "JEBC-DeV";
export const APP_DESCRIPTION =
    process.env.NEXT_PUBLIC_APP_DESCRIPTION! ??
    "Arquitectura limpia de autenticación y autorización";

    export const generateTitle = (title: string) => {
        return `${title} | ${APP_NAME}`;
    }
    export const generateDescription = (description: string) => {
        return `${description} - ${APP_DESCRIPTION}`;
    }