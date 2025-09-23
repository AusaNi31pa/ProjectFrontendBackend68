import axios from "axios";

// ให้ตั้งค่า REACT_APP_API เป็น "http://localhost:5000/api"
const instance = axios.create({
    baseURL: process.env.REACT_APP_API || "http://localhost:5000/api",
    withCredentials: false, // ปกติไม่ต้อง ถ้าใช้ cookie ค่อยเปิด
});

// ใส่ authtoken ให้ทุก request ถ้ามี token เก็บไว้
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        // สำคัญ: backend ของคุณใช้ header ชื่อ "authtoken"
        config.headers["authtoken"] = token;
    }
    return config;
});

// ถ้า token หมดอายุหรือ 401 จะพากลับหน้า login
instance.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err?.response?.status === 401) {
            // เคลียร์ token แล้วเด้งไป login
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // หลีกเลี่ยงใช้ navigate ตรงนี้ ใช้ reload/redirect แทน
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(err);
    }
);

export default instance;
