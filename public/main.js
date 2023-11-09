import { resetScore } from './score.js';
import { resetComments } from './comments.js';

export const createMainContent = () => {
    // Create h1
    const h1 = document.createElement("h1");
    h1.innerText = "Catstagram";

    // Create img
    const img = document.createElement("img");
    img.style.margin = "20px";
    img.style.maxWidth = "750px";

    const newKittenBtn = createNewKittenBtn();

    const container = document.querySelector(".container");
    container.appendChild(h1);
    container.append(newKittenBtn);
    container.appendChild(img);

    // checks if page loads 1st time or 2nd time
    const firstTime = localStorage.getItem("first_time");
    if(!firstTime) {
        // first time loaded!
        localStorage.setItem("first_time","1");
    }

    if (firstTime === "null") {
        fetchImage();
    } else {
        // Load score from localStorage
        const savedImg = localStorage.getItem("imgUrl");
        const kittenImg = document.querySelector("img");
        kittenImg.src = savedImg;
    }
}

const fetchImage = async () => {
    // Fetch image from API and set img url
    try {

        const kittenResponse = await fetch("https://api.thecatapi.com/v1/images/search?size=small");
        // Converts to JSON
        const kittenData = await kittenResponse.json();
        // console.log(kittenData);
        const kittenImgUrl = kittenData[0].url;
        const kittenImg = document.querySelector("img");
        kittenImg.src = kittenImgUrl;

        // set image url to localStorage
        localStorage.setItem("imgUrl", kittenImgUrl);

        // After the image is finished loading, reset the score and comments
        kittenImg.addEventListener('load', () => {
            let imgValue = localStorage.getItem("imgUrl");
            if (imgValue === "null") {
                resetScore();
                resetComments();
            }
        });
    } catch (e) {
        console.log("Failed to fetch image", e);
    }
};

const createNewKittenBtn = () => {
    // Create "New Kitten" button
    const newKittenBtn = document.createElement("button");
    const firstTime = localStorage.getItem("first_time");
    newKittenBtn.id = "new-kitten";
    newKittenBtn.innerText = "New Kitten";
    newKittenBtn.addEventListener('click', fetchImage);
    newKittenBtn.addEventListener('click', resetScore);
    newKittenBtn.addEventListener('click', resetComments);
    newKittenBtn.addEventListener('click', () => {
        localStorage.removeItem(firstTime);
    });
    return newKittenBtn;
};
