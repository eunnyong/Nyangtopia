//자동스크롤막기
        const sections = document.querySelectorAll('section');
        let current = 0;
        let isScrolling = false;
        function scrollToSection(index) {
            isScrolling = true;
            sections[index].scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 1000); 
        }
        window.addEventListener('wheel', (e) => {
            if (isScrolling) return;
            if (e.deltaY > 0 && current < sections.length - 1) {
                current++;
                scrollToSection(current);
            } else if (e.deltaY < 0 && current > 0) {
                current--;
                scrollToSection(current);
            }
        });


//뎁스4개넘어가게하지말자...최소한의정리를하자...
//페이드인 플러그인 js/jquery.easeScroll.js










//모달창
document.addEventListener('DOMContentLoaded', () => {
    const confirmBtn = document.querySelector('#confirmBtn');
    const modal = document.querySelector('.subpage-c-modal');
    const resultCircle = document.querySelector('#resultCircle');
    const coinRange = document.querySelector('.coin-range');
    const loveRange = document.querySelector('.love-range');
    const coinText = document.querySelector('.modal-coin p:nth-of-type(2)');
    const loveText = document.querySelector('.modal-love p:nth-of-type(2)');

    coinRange.max = 100;
    const maxCoinAmount = 1000000;

    loveRange.disabled = true;

    //코인슬라이더
    coinRange.addEventListener('input', () => {
        const coinPercent = parseInt(coinRange.value, 10);
        const coinAmount = Math.round((coinPercent / 100) * maxCoinAmount);
        coinText.textContent = `${coinAmount.toLocaleString()}원`;

        const lovePercent = 100 - coinPercent;
        loveRange.value = lovePercent;
        loveText.textContent = `${lovePercent}%`;
    });

    const btns = document.querySelectorAll('.subpage-c-btn');
    const rerollBtn = btns[0]; // 다시 뽑는다
    const raiseBtn = btns[1]; // 키운다

    //키운다버튼
    raiseBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        resultCircle.classList.remove('gameover');
        resultCircle.innerHTML = 'Result?';
    });

    //다시뽑
    rerollBtn.addEventListener('click', () => {
        const message = "생명은 뽑기로 <br> 뽑을 수 있는 게 아닙니다.";

        resultCircle.innerHTML = `${message}<br><br><strong>GAME OVER</strong>`;
        resultCircle.classList.add('gameover');
        modal.style.display = 'none';
    });

    //결과
    confirmBtn.addEventListener('click', () => {
        modal.style.display = 'none';

        const coinVal = parseInt(coinRange.value, 10);
        const loveVal = parseInt(loveRange.value, 10);

        let message = "고양이와의 생활은 <br> 결국 당신을 지치게 했습니다.";

        if (coinVal < 30 && loveVal > 70) {
            message = "고양이는 행복했지만, <br> 당신은 파산했습니다.";
        } else if (coinVal > 70 && loveVal < 30) {
            message = "당신은 짠돌이입니다. <br> 고양이는 우울했습니다.";
        }

        resultCircle.innerHTML = `${message}<br><br><strong>GAME OVER</strong>`;
        resultCircle.classList.add('gameover');
    });
});


// 슬라이드

// let currentSlide = 0;
// const totalSlides = 3;
// const track = document.querySelector('.subpage-d-slider-track');
// document.querySelector('#prevSlide').addEventListener('click', () => {
//     if (currentSlide > 0) {
//         currentSlide--;
//         track.style.transform = `translateX(-${currentSlide * 100}vw)`;
//     }
// });
// document.querySelector('#nextSlide').addEventListener('click', () => {
//     if (currentSlide < totalSlides - 1) {
//         currentSlide++;
//         track.style.transform = `translateX(-${currentSlide * 100}vw)`;
//     }
// });



document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.subpage-d-slider-track');
    const slides = document.querySelectorAll('.subpage-d');
    const prev = document.getElementById('prevSlide');
    const next = document.getElementById('nextSlide');

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlidePosition() {
      track.style.transform = `translateX(-${100 * currentIndex}vw)`;
    }

    next.addEventListener('click', () => {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateSlidePosition();
      }
    });

    prev.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlidePosition();
      }
    });

    updateSlidePosition();
  });

