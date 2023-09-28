import { Component } from '@angular/core';

@Component({
  selector: 'app-mision',
  templateUrl: './mision.component.html',
  styleUrls: ['./mision.component.css']
})
export class MisionComponent {

}

// const carouselRow = document.querySelector('.slide-row')
// const carouselSlides = document.getElementsByClassName('slide')
// const dots = document.getElementsByClassName('dot')
// const nextBtn = document.querySelector('.next')
// const prevBtn = document.querySelector('.prev')
//
// let index=1
// let width: number;
//
// function slideWidth(){
//   width=carouselSlides[0].clientWidth
// }
// slideWidth()
// window.addEventListener('resize',slideWidth)
// // @ts-ignore
// carouselRow.style.transform=`translateX(`+(-width*index)+`px)`
//
// // @ts-ignore
// nextBtn.addEventListener('click',nextSlide)
// function nextSlide(){
//   if(index>=carouselSlides.length-1){
//     return
//   }
//   // @ts-ignore
//   carouselRow.style.transition='transform 0.2s ease-out'
//   index++
//   // @ts-ignore
//   carouselRow.style.transform=`translateX(`+(-width*index)+`px)`
//   dotslabel()
// }
//
// // @ts-ignore
// prevBtn.addEventListener('click',prevSlide)
// function prevSlide(){
//   if(index<=0){
//     return
//   }
//   // @ts-ignore
//   carouselRow.style.transition='transform 0.2s ease-out'
//   index--
//   // @ts-ignore
//   carouselRow.style.transform=`translateX(`+(-width*index)+`px)`
//   dotslabel()
// }
//
// // @ts-ignore
// carouselRow.addEventListener('transitionend',()=>{
//   if(carouselSlides[index].id==='firstimageduplicate'){
//     // @ts-ignore
//     carouselRow.style.transition='none'
//     index=carouselSlides.length-index
//     // @ts-ignore
//     carouselRow.style.transform=`translateX(`+(-width*index)+`px)`
//     dotslabel()
//   }
//   if(carouselSlides[index].id==='lastimageduplicate'){
//     // @ts-ignore
//     carouselRow.style.transition='none'
//     index=carouselSlides.length-2
//     // @ts-ignore
//     carouselRow.style.transform=`translateX(`+(-width*index)+`px)`
//     dotslabel()
//   }
// })
//
// function autoslide(){
//   let deleteInterval = setInterval(timer, 3000)
//   function timer(){
//     nextSlide()
//   }
// }
// autoslide()
//
// const maincontainer = document.querySelector('.container')
// // @ts-ignore
// maincontainer.addEventListener('mouseover',()=>{
//   let deleteInterval;
//   clearInterval(deleteInterval)
// })
//
// // @ts-ignore
// maincontainer.addEventListener('mouseout',()=>{
//   autoslide()
// })
//
// function dotslabel(){
//   for(let i=0;i<dots.length;i++){
//     dots[i].className= dots[i].className.replace(' active','')
//   }
//   dots[index-1].className+=' active'
// }
//
//
//
//
// // @ts-ignore
// document.getElementById('nextcomida').onclick = function(){
//   let lists = document.querySelectorAll('.itemcomida');
//   // @ts-ignore
//   document.getElementById('slidecomida').appendChild(lists[0]);
// }
// // @ts-ignore
// document.getElementById('prevcomida').onclick = function(){
//   let lists = document.querySelectorAll('.itemcomida');
//   // @ts-ignore
//   document.getElementById('slidecomida').prepend(lists[lists.length - 1]);
// }




