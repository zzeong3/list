const sections = document.querySelectorAll('section');
const header = document.querySelector('header');
const contIntro = document.querySelector('.cont-intro');
const contIntro1 = document.querySelector('.cont-intro1');
let posArr = []; 
const base = -400;

// header 고정
window.onscroll = function () {
    let windowTop = window.scrollY;

    if (windowTop > 0) {
        header.classList.add("on");
    }
    else {
        header.classList.remove("on");
    }
};

// 스크롤 계산 되면서 on 활성화
for (let el of sections) {
    posArr.push(el.offsetTop); 
}

window.addEventListener('scroll', ()=>{
    let scroll = window.scrollY || window.pageYOffset
    sections.forEach((el, index)=>{
        if (scroll >= posArr[index] + base) { 
            sections[index].classList.add('on');
        }   
    })
}) 

setTimeout(()=> {
    contIntro.classList.add('on');
}, 500);
setTimeout(()=> {
    contIntro1.classList.add('on');
}, 2000);


// slide 
const swiperIntro2 = new Swiper(".area-slide-intro2", {
    slidesPerView: "auto",
    centeredSlides: true,
});

const swiperIntro4 = new Swiper(".area-slide-intro4", {
    slidesPerView: "auto",
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    loop:true
});


