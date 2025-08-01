const initializeAnimations = () => {
  function animateCounter(element, target, duration) {
    let start = 0;
    const fps = 90;
    const frameDuration = 1000 / fps;
    const totalFrames = duration / frameDuration;
    const increment = target / totalFrames;

    function updateCounter() {
      start += increment * 1.5;
      element.textContent = Math.floor(start).toLocaleString();

      if (start < target) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // 애니메이션 실행 여부를 추적하는 플래그
  const animatedElements = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // 이미 애니메이션이 실행된 요소는 스킵
        if (animatedElements.has(entry.target)) return;

        const rangeProgress = entry.target.querySelector(".range-progress");
        const savingsAmount = entry.target.querySelector(".savings-amount");

        if (entry.isIntersecting) {
          // 애니메이션 실행 표시
          animatedElements.add(entry.target);

          entry.target.classList.add("on");

          if (savingsAmount) savingsAmount.classList.add("on");

          if (rangeProgress) {
            setTimeout(() => {
              rangeProgress.classList.add("on");
            }, 500);
          }

          if (savingsAmount && savingsAmount.dataset.target) {
            const target = parseInt(savingsAmount.dataset.target);
            const duration = parseInt(savingsAmount.dataset.duration) / 1.5;
            animateCounter(savingsAmount, target, duration);
          }

          // 해당 요소의 관찰을 중단
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // 요소가 80% 이상 보일 때 애니메이션 실행
      threshold: 0.8,
    }
  );

  const priceComparisonSection = document.querySelector("#priceComparison");
  if (priceComparisonSection) {
    observer.observe(priceComparisonSection);
  }
};
