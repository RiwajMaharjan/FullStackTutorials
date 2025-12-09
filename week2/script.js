const menuBtn = document.getElementById("menuBtn")
const navContent = document.querySelector(".nav-content")

menuBtn.addEventListener("click", function() {
	navContent.classList.toggle("show");

})