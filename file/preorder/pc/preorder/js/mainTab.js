function initializeMainTab() {
  const mainTab = document.querySelector(".model-tab");
  if (!mainTab) return;

  const items = mainTab.querySelectorAll(".common-tab-menu-item");
  const contents = document.querySelectorAll(
    ".model-select .common-tab-content"
  );

  // 메인 탭 클릭 시
  mainTab.addEventListener("click", (e) => {
    const target = e.target.closest(".common-tab-menu-item");
    if (!target) return;

    // 메인 탭 활성화
    items.forEach((item) => item.classList.remove("active"));
    contents.forEach((content) => content.classList.remove("active"));

    target.classList.add("active");
    const activeContent = document.querySelector(
      `[id="${target.dataset.tab}"]`
    );
    activeContent.classList.add("active");

    // 해당 메인 탭의 첫 번째 컬러 탭 활성화
    const colorTab = activeContent.querySelector(".color-tab");
    if (colorTab) {
      // 모든 컬러 탭 초기화
      const colorItems = colorTab.querySelectorAll(".common-tab-menu-item");
      const colorContents = activeContent.querySelectorAll(
        ".color-select .common-tab-content"
      );

      colorItems.forEach((item) => item.classList.remove("active"));
      colorContents.forEach((content) => content.classList.remove("active"));

      // 첫 번째 컬러 탭 활성화
      const firstColorItem = colorItems[0];
      if (firstColorItem) {
        firstColorItem.classList.add("active");
        const firstColorContent = document.querySelector(
          `[id="${firstColorItem.dataset.tab}"]`
        );
        if (firstColorContent) {
          firstColorContent.classList.add("active");
        }
      }
    }

    // 해당 메인 탭의 첫 번째 storage 탭 활성화
    const storageTab = activeContent.querySelector(".storage-tab");
    if (storageTab) {
      // 모든 storage 탭 초기화
      const storageItems = storageTab.querySelectorAll(".common-tab-menu-item");
      const storageContents = activeContent.querySelectorAll(
        ".storage-select .common-tab-content"
      );

      storageItems.forEach((item) => item.classList.remove("active"));
      storageContents.forEach((content) => content.classList.remove("active"));

      // 첫 번째 storage 탭 활성화
      const firstStorageItem = storageItems[0];
      if (firstStorageItem) {
        firstStorageItem.classList.add("active");
        const firstStorageContent = activeContent.querySelector(
          `[id="${firstStorageItem.dataset.tab}"]`
        );
        if (firstStorageContent) {
          firstStorageContent.classList.add("active");
        }
      }
    }
  });
}
