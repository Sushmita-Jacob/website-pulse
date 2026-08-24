let media;
const API_KEY = import.meta.env.VITE_NASA_API_KEY;
document.querySelector("#app").innerHTML = "<p>:Loading...</p>";
const date = document.querySelector("#datepicker").value;
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
.then(response => response.json())
.then(data => {
    console.log(data);
    if (data.media_type === "image") {
        // Show image
        media = `<img src="${data.url}"/>`;
    } else if (data.media_type === "video") {
        // Show video
        media = `<video src="${data.url}" controls></video>`;
    } else {
        // Show YouTube
        media = `<iframe src="${data.url}"/></iframe>`
    }
    document.querySelector("#app").innerHTML = `
    <h1>${data.title}</h1>
    ${media}
    <p>${data.explanation}</p> `;
})
    .catch(err => {
        document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
    })