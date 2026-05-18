export const apibaseurl = "http://localhost:8000";
export const imgurl = import.meta.env.BASE_URL;
export function callApi(reqMethod, apiUrl, jsonData, formData, responseHandler, jwtToken = "")
{
    // Get token from localStorage if not provided
    const token = jwtToken || localStorage.getItem("token");
    
    const headers = {};
    if (jsonData) headers["Content-Type"] = "application/json";
    if (token) headers["Token"] = token;

    const options = {
        method: reqMethod, 
        headers: headers, 
        body: jsonData ? JSON.stringify(jsonData) : formData ? formData : undefined
    };

    console.log("API Call:", { url: apiUrl, method: reqMethod, headers });

    fetch(apiUrl, options)
        .then((res) => {
            console.log("Response Status:", res.status, res.statusText);
            if (!res.ok && res.status === 401) {
                localStorage.clear();
                window.location.href = "/";
                throw new Error("Session expired. Please login again.");
            }
            return res.json();
        })
        .then((data) => {
            console.log("Response Data:", data);
            responseHandler(data);
        })
        .catch((err) => {
            console.error("API Error:", err.message);
            alert("Error: " + err.message);
        });
}