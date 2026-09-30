// Send a POST request to the FastAPI endpoint
fetch("http://127.0.0.1:8000/students", {
    method: "POST",

    // Tell FastAPI that the request body contains JSON
    headers: {
        "Content-Type": "application/json"
    },

    // Convert the JavaScript object into a JSON string
    body: JSON.stringify({
        name: "Rahul",
        email: "rahul@example.com",
        branch: "CSE",
        enrollment_date: "2026-09-29"
    })
})
    // Convert the response from JSON into a JavaScript object
    .then(response => response.json())

    // Display the response
    .then(data => console.log(data))

    // Handle network or other errors
    .catch(error => console.error("Error:", error));
