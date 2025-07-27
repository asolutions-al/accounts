const IS_DEV = process.env.NODE_ENV === "development"

const DOMAIN = IS_DEV ? "localhost" : process.env.DOMAIN!

const ERP_URL = IS_DEV ? "http://localhost:3000" : process.env.ERP_URL!

export { DOMAIN, ERP_URL, IS_DEV }
