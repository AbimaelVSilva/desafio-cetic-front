import { API } from "../constants"

export default async function loginService(email, password) {
    return await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    }).then(async (result) => {
        if (result.status === 401) {
            throw new Error("invalidEmailOrPassword");
        } else if (result.status !== 200) {
           const errorResult = result.json();

           throw new Error(errorResult?.error);
        }
        return result.json();
    });
}