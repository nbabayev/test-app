import axios from "axios";
// export const BASE_URL = "https://";

export async function get_products(slug) {
    return (await axios({
        method: "GET",
        url: `https://dummyjson.com/products`,
    }));
}