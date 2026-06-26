
document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 1;
  let timer = null;

  showSlides(slideIndex);
  resetTimer();

  document.getElementById("prevBtn").addEventListener("click", function() {
    plusSlides(-1);
  });
  
  document.getElementById("nextBtn").addEventListener("click", function() {
    plusSlides(1);
  });

  const dots = document.getElementsByClassName("dot");
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function() {
      let targetSlide = parseInt(this.getAttribute("data-slide"), 10);
      currentSlide(targetSlide);
    });
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
    resetTimer(); 
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
    resetTimer();
  }

  function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return; 

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].className += " active";
    }
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
      slideIndex++;
      showSlides(slideIndex);
    }, 5000); 
  }
});