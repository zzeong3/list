function initializeColorTab() {
  const comTabs = document.querySelectorAll(".common-tabs");
  if (!comTabs.length) return;

  comTabs.forEach((tab) => {
    const items = tab.querySelectorAll(".common-tab-menu-item");
    const contents = tab.closest(".tab-group").querySelectorAll(".common-tab-content");

    tab.addEventListener("click", (e) => {
      const target = e.target.closest(".common-tab-menu-item");
      if (!target) return;

      const targetContent = target.getAttribute("data-tab");

      // 모든 탭과 컨텐츠에서 active 제거
      items.forEach((item) => item.classList.remove("active"));
      contents.forEach((content) => content.classList.remove("active"));

      // 선택된 탭 활성화
      target.classList.add("active");
      const targetPanel = document.getElementById(targetContent);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }

      // [추가] 1TB 선택 시 silverShadow 숨기기
      if (targetContent === "Z Fold7 1TB") {
        const silverTab = document.querySelector('[data-tab="Z Fold7-silverShadow"]');
        if (silverTab) {
          silverTab.style.display = "none";

          // 현재 silverTab이 active면 다른 색상으로 강제 전환
          const activeColor = document.querySelector(".color-tab .common-tab-menu-item.active");
          if (activeColor && activeColor.getAttribute("data-tab") === "Z Fold7-silverShadow") {
            const fallbackColor = document.querySelector('[data-tab="Z Fold7-blueShadow"]');
            if (fallbackColor) fallbackColor.click();
          }
        }
      } else if (targetContent === "Z Fold7 512GB") {
        // 512GB 선택 시 silverShadow 다시 보이게
        const silverTab = document.querySelector('[data-tab="Z Fold7-silverShadow"]');
        if (silverTab) {
          silverTab.style.display = "";
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initializeColorTab);
