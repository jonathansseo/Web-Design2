"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: 
      Date:   

      Filename: js05.js
*/

// let element = document.querySelectorAll("#lightbox");
// console.log(element);

window.addEventListener("load", createLightbox);

function createLightbox() {

   // Lightbox Container
   let lightBox = document.getElementById("lightbox");

   // Parts of the lightbox
   let lbTitle = document.createElement("h1");
   let lbCounter = document.createElement("div");
   let lbPrev = document.createElement("div");
   let lbNext = document.createElement("div");
   let lbPlay = document.createElement("div");
   let lbImages = document.createElement("div");

   // Design the lightbox title
   lightBox.appendChild(lbTitle);
   lbTitle.id = "lbTitle";
   lbTitle.textContent = lightboxTitle;

   // Design the lightbox slide counter
   lightBox.appendChild(lbCounter);
   lbCounter.id = "lbCounter";
   let currentImg = 1;
   lbCounter.textContent = currentImg + " / " + imgCount;

   // Design the lightbox previous slide button
   lightBox.appendChild(lbPrev);
   lbPrev.id = "lbPrev";
   lbPrev.innerHTML = "&#9664;";
   lbPrev.onclick = showPrev;

   // Design the lightbox next slide button
   lightBox.appendChild(lbNext);
   lbNext.id = "lbNext";
   lbNext.innerHTML = "&#9654;";
   lbNext.onclick = showNext;

   // Design the lightbox Play-Pause button
   lightBox.appendChild(lbPlay);
   lbPlay.id = "lbPlay";
   lbPlay.innerHTML = "&#9199;";
   let timeID;
   lbPlay.onclick = function () {
      if (timeID) {
         window.clearInterval(timeID);
         timeID = undefined;
      } else {
         showNext();
         timeID = window.setInterval(showNext, 1500);
      }
   }

   // Design the lightbox images container
   lightBox.appendChild(lbImages);
   lbImages.id = "lbImages";
   // Add images from the imgFiles array to the container
   for (let i = 0; i < imgCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createOverlay;
      lbImages.appendChild(image);
   }

   // Function to move forward through the image list
   function showNext() {
      lbImages.appendChild(lbImages.firstElementChild);
      (currentImg < imgCount) ? currentImg++ : currentImg = 1;
      lbCounter.textContent = currentImg + " / " + imgCount;
   }

   // Function to move backward through the image list
   function showPrev() {
      lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
      (currentImg > 1) ? currentImg-- : currentImg = imgCount;
      lbCounter.textContent = currentImg + " / " + imgCount;
   }

   function createOverlay() {
      let overlay = document.getElementById("overlay");
      let overlayImage = document.getElementById("overlay-image");
      let errorMessage = document.getElementById("error-message");
      overlayImage.src = this.src;

      // Show the overlay
      overlay.style.display = "flex";
      errorMessage.style.display = "none";

      // Add functionality to close the overlay
      document.getElementById("close-overlay").onclick = function () {
         overlay.style.display = "none";
      };

      // Add functionality to add image to favorites
      document.getElementById("add-to-favorites").onclick = function () {
         let favoritesList = document.getElementById("favorites-list");
         if (favoritesList.children.length < 5) {
            let favoriteItem = document.createElement("div");
            favoriteItem.classList.add("favorite-item");

            let favoriteImage = document.createElement("img");
            favoriteImage.src = overlayImage.src;
            favoriteImage.alt = overlayImage.alt;

            let removeLink = document.createElement("div");
            removeLink.classList.add("remove-link");
            removeLink.textContent = "Remove";
            removeLink.onclick = function () {
               favoritesList.removeChild(favoriteItem);
            };

            favoriteItem.appendChild(favoriteImage);
            favoriteItem.appendChild(removeLink);
            favoritesList.appendChild(favoriteItem);

            overlay.style.display = "none";
         } else {
            errorMessage.style.display = "block";
         }
      };
      overlay.onclick = function (event) {
         if (event.target === overlay) {
            overlay.style.display = "none";
         }
      };
   }
}
