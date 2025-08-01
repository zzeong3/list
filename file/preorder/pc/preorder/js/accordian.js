function initializeAccordion() {
  const accordions = document.querySelectorAll(".accordion"); // 모든 아코디언 선택
  if (!accordions.length) return;

  accordions.forEach((accordion) => {
    const content = accordion.querySelector(".accordion-content");
    const accordionTxt = accordion.querySelector(".accordion-txt");
    const arrowDown = accordion.querySelector(".arrow-down");
    if (!content || !accordionTxt) return;

    // 초기 상태 설정
    content.style.display = "none";

    // 클릭 이벤트 핸들러 함수
    const toggleAccordion = () => {
      const isOpen = accordion.classList.contains("active");

      // 모든 아코디언 접기
      accordions.forEach((otherAccordion) => {
        const otherContent = otherAccordion.querySelector(".accordion-content");
        if (otherContent) {
          otherContent.style.display = "none";
          otherAccordion.classList.remove("active");
        }
      });

      // 현재 아코디언만 열기
      if (!isOpen) {
        content.style.display = "block";
        accordion.classList.add("active");
      }
    };

    // accordion-txt와 arrow-down 클릭 이벤트 추가
    accordionTxt.addEventListener("click", toggleAccordion);
    if (arrowDown) {
      arrowDown.addEventListener("click", toggleAccordion);
    }
  });
}

initializeAccordion();