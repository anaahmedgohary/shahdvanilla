if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready)
} else {
  ready()
}

function ready() {

  // show popup image on click
  let rowimages = document.getElementsByClassName("cat-row-image")
  for (let i=0; i<rowimages.length; i++) {
    let image = rowimages[i]
    image.addEventListener("click", showImgPop)
  }

  /* close popup image button */
  let closeBtn = document.getElementById("close-icon")
  closeBtn.addEventListener("click", closePopupImg)

  /* let dishCheckBox = document.getElementById("dishesCheck")
  dishCheckBox.addEventListener("change", filterdishes) */

  let checkBoxs = document.getElementsByClassName("filter-checkbox")
  for(let i=0; i<checkBoxs.length; i++) {
    checkBoxs[i].checked = true
    checkBoxs[i].addEventListener("change", filterBlocks)
  }

  let clearFilters = document.getElementById("clearFilters")
  clearFilters.addEventListener("click", clearAllFilters)
  // select all filters
  let checkFilters = document.getElementById("checkFilters")
  checkFilters.addEventListener("click", checkAllFilters)

  //button click to check filter
  let buttonstoc = document.getElementsByClassName("filter-btn");
  for (let i = 0; i < buttonstoc.length; i++)
  {
    buttonclicked = buttonstoc[i];
    buttonclicked.addEventListener('click', checkTheFilter)
  }

}


function checkTheFilter(event)
{
  clickedButton = event.target;
  clickedButtonP = clickedButton.parentElement
  let targetbox = clickedButtonP.getElementsByClassName("filter-checkbox")[0];
  targetbox.click();
}

function filterBlocks() {
  let sandwiches = document.getElementById("checkBox1")
  let sandwichesBlock = document.getElementById("sandBlock")
  sandwiches.checked == false ? sandwichesBlock.style.display = "none" : sandwichesBlock.style.display = "flex";
  let dishesCBox = document.getElementById("checkBox2")
  let dishesBlock = document.getElementById("dishesBlock")
  dishesCBox.checked == false ? dishesBlock.style.display = "none" : dishesBlock.style.display = "flex";
}

function clearAllFilters() {
  let checkBoxs = document.getElementsByClassName("filter-checkbox")
  for(let i=0; i<checkBoxs.length; i++) {
    checkBoxs[i].checked = false
  }
  filterBlocks()
}

function checkAllFilters() {
  let checkBoxs = document.getElementsByClassName("filter-checkbox")
  for(let i=0; i<checkBoxs.length; i++) {
    checkBoxs[i].checked = true
  }
  filterBlocks()
}

/* function filterdishes(event) {
  let boxChecked = event.target
  
  let sandBlock = document.getElementById("sandBlock")
  if (boxChecked.checked == true){
    sandBlock.style.display = "none"
  } else {
    sandBlock.style.display = "flex"
  }
  // sandBlock.style.display = "none"

} */

function showImgPop(event) {
 console.log("ddddd")
 let imageClicked = event.target
 let imageClickedSRC = imageClicked.src
 console.log(imageClickedSRC)
 let popupContainer = document.getElementById("imagePopup")
 popupContainer.src = imageClickedSRC
 //let imgContainerSRC = imgContainer.src
 //imgContainer = imageClickedSRC
 let imageDiv = document.getElementById("popImageContainer")
 imageDiv.classList.replace("hide-popup", "show-popup")

 // image caption
 let captionDiv = document.getElementById("popCaption")
 let imageAlt = imageClicked.alt
 captionDiv.innerText = imageAlt

}

function closePopupImg() {
  let imageDiv = document.getElementById("popImageContainer")
  imageDiv.classList.replace("show-popup", "hide-popup") 
}

