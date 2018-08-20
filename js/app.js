document.addEventListener("DOMContentLoaded", function() {
  //Funciton Ajax Request getting data from server

  function ajaxRequest(apiLink, inputValue) {
    let ajaxLinks = [];
    const overlay = document.querySelector(".overlay");
    const ajaxLiArray = [];
    const api = apiLink;
    const pet = inputValue;
    console.log(pet);
    const options = {
      tags: pet,
      format: "json"
    };
    let counter = 0;
    const show = data => {
      console.log(data);
      let div = "<div class = 'ajaxOutput--wrapper'>";
      $.each(data.items, function(i, photo) {
        div += "<li class = 'ajaxOutput--wrapper--item'>";
        div += `<a  class ="image"><img  src = ${
          photo.media.m
        } data-id = ${counter++} ></a></li>`;
        ajaxLinks.push(photo.media.m);

        console.log(counter);
        // href = ${photo.link}
      });
      div += "</div>";
      $("#ajaxOutput").html(div);
      // console.log(document.querySelectorAll(".ajaxOutput--wrapper--item"));
      const ajaxLi = document.querySelectorAll(".ajaxOutput--wrapper--item");
      for (let i = 0; i < ajaxLi.length; i++) {
        ajaxLiArray.push(ajaxLi[i]);
      }
      for (let i = 0; i < ajaxLiArray.length; i++) {
        ajaxLiArray[i].addEventListener("click", function() {
          overlay.classList.add("show");
          const newDiv = document.createElement("div");
          newDiv.classList.add("overlay--item");
          const closeButton = document.createElement("button");
          closeButton.innerHTML = "close";
          const newImg = document.createElement("img");
          // const test = this.children[0].children[0].dataset.id;
          // console.log(test);
          newImg.src = this.children[0].children[0].src;
          const nextButton = document.createElement("button");
          nextButton.innerHTML = "next";
          const prevButton = document.createElement("button");
          prevButton.innerHTML = "prev";

          overlay.appendChild(newDiv);
          newDiv.appendChild(newImg);
          newDiv.appendChild(closeButton);
          newDiv.appendChild(nextButton);
          newDiv.appendChild(prevButton);
          // console.log(this.nextElementSibling.children[0].children[0].src);
          let self = this;
          console.log(this);
          nextButton.addEventListener("click", function() {
            if (
              self.children[0].children[0].dataset.id <
              ajaxLiArray.length - 1
            ) {
              newImg.src = self.nextElementSibling.children[0].children[0].src;
              self = self.nextElementSibling;
              console.log(self.children[0].children[0].dataset.id);
            } else {
              newImg.src = ajaxLiArray[0].children[0].children[0].src;
              self = ajaxLiArray[0];
            }
          });
          prevButton.addEventListener("click", function() {
            if (self.children[0].children[0].dataset.id > 0) {
              newImg.src =
                self.previousElementSibling.children[0].children[0].src;
              self = self.previousElementSibling;
              console.log(self.children[0].children[0].dataset.id);
            } else {
              newImg.src =
                ajaxLiArray[ajaxLiArray.length - 1].children[0].children[0].src;
              self = ajaxLiArray[ajaxLiArray.length - 1];
            }
          });
          // nextButton.addEventListener("click", function() {

          // });
          closeButton.addEventListener("click", function() {
            overlay.classList.remove("show");
            overlay.removeChild(newDiv);
            newDiv.removeChild(newImg);
            newDiv.removeChild(closeButton);
            newDiv.removeChild(nextButton);
            newDiv.removeChild(prevButton);
          });
        });
      }
    };
    $.getJSON(api, options, show);
  }

  //Events on buttons, adding class "selected" to clicked button and removing class "selected" from the others
  function mainButtons() {
    const button = document.querySelectorAll(".list-group-item--button");
    const removeLoop = array => {
      for (let j = 0; j < arr.length; j++) {
        array[j].classList.remove("selected");
      }
    };
    //Pushing all button into array
    let arr = [];
    for (let i = 0; i < button.length; i++) {
      arr.push(button[i]);
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i].addEventListener("click", function() {
        removeLoop(arr);
        this.classList.add("selected");
        ajaxRequest(
          "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
          $(this).data("info")
        );
      });
    }
  }
  mainButtons();

  // Selecting words from the input
  function inputButton() {
    const button = $("#btnH");
    const input = $("#inputElement");
    input.keydown(function(e) {
      if (e.keyCode == 13) {
        ajaxRequest(
          "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
          input.val()
        );
        input.val("");
      }
    });
    button.on("click", function() {
      ajaxRequest(
        "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        input.val()
      );
      input.val("");
    });
  }
  inputButton();
  // End of selecting buttons
  //Add class show to the overlay
});
