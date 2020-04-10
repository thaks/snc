

document.addEventListener("DOMContentLoaded", function() {
    var sizeChartButton = document.querySelector(".thr-size-chart-btn");
    var sizeChartOverlay = document.querySelector(".size__chart__modal__container");
    var sizeChartCloseButton = document.querySelector(".close__button");
     
     sizeChartButton.addEventListener('click', ()=>{
             sizeChartOverlay.classList.add('is_open');
           });
           sizeChartCloseButton.addEventListener('click', ()=>{
             sizeChartOverlay.classList.remove('is_open');
           });
           sizeChartOverlay.addEventListener('click', outsideClick);
     
     
     function outsideClick(e) {
         if(e.target == sizeChartOverlay) {
           sizeChartOverlay.classList.remove('is_open');
         }
     }
   
     console.log( "ready!" );
   
   });