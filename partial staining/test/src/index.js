import "./index.css";
import PartialColoredImage from "../../partial_staining";

document.addEventListener("DOMContentLoaded", event => {
    let originalImg = document.getElementById('originalImg');
    let resultImg = document.getElementById('resultImg');

    let filteredImage = new PartialColoredImage(originalImg, null, "#FF0000");
    filteredImage.filter();
    resultImg.src = filteredImage.src;
});