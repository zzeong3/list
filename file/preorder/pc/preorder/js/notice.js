function initializeNotice() {
  const noticeMenus = document.querySelectorAll(".common-notice-menu");
  if (!noticeMenus.length) return;

  noticeMenus.forEach((noticeMenu) => {
    const noticeItems = noticeMenu.querySelectorAll(".common-notice-menu-item");

    // NOTIce 탭 전환 함수
    function switchNoticeTab(targetNotice) {
      // 모든 NOTIce 항목 비활성화
      noticeItems.forEach((item) => {
        item.classList.remove("active");
        const content = item.querySelector(".common-notice-content");
        if (content) {
          content.classList.remove("active");
        }
      });

      // 선택된 NOTIce 항목 활성화
      const activeNotice = noticeMenu.querySelector(`[data-tab="${targetNotice}"]`);
      if (activeNotice) {
        activeNotice.classList.add("active");
      }
    }

    // NOTIce 메뉴 클릭 이벤트 리스너
    noticeMenu.addEventListener("click", (e) => {
      const clickedItem = e.target.closest(".common-notice-menu-item");

      if (clickedItem && !clickedItem.classList.contains("active")) {
        const targetNotice = clickedItem.getAttribute("data-tab");
        switchNoticeTab(targetNotice);
      } else if (clickedItem) {
        clickedItem.classList.remove("active");
      }
    });
  });
}
