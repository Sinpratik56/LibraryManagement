import axios from "axios";

const API = axios.create({
    baseURL: "https://librarymanagement-fy8k.onrender.com/api"
});

API.interceptors.request.use(
    (config) => {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                )
            );

        if (
            user?.token
        ) {

            config.headers.Authorization =
                `Bearer ${user.token}`;
        }

        return config;
    }
);

export default API;