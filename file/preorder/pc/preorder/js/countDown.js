function initializeCountdown() {
  // 각 자릿수 요소 가져오기
  const d11 = document.getElementById("d11");
  const d00 = document.getElementById("d00");
  const h11 = document.getElementById("h11");
  const h00 = document.getElementById("h00");
  const m11 = document.getElementById("m11");
  const m00 = document.getElementById("m00");
  const s11 = document.getElementById("s11");
  const s00 = document.getElementById("s00");
  const countdownElement = document.getElementById("countdown");

  if (
    !d11 ||
    !d00 ||
    !h11 ||
    !h00 ||
    !m11 ||
    !m00 ||
    !s11 ||
    !s00 ||
    !countdownElement
  )
    return;

  const toast = document.querySelector(".toast-message");

  // 고정된 종료 시간 설정
  const endDate = new Date("2025-01-24T00:00:00");

  function updateCountdown() {
    const now = new Date();
    const difference = endDate - now;

    if (difference <= 0) {
      clearInterval(countdownInterval);
      toast.style.display = "none";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // 기존 카운트다운 텍스트 업데이트
    countdownElement.textContent = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;

    // 각 숫자를 두 자리로 패딩
    const daysStr = String(days).padStart(2, "0");
    const hoursStr = String(hours).padStart(2, "0");
    const minutesStr = String(minutes).padStart(2, "0");
    const secondsStr = String(seconds).padStart(2, "0");

    // 각 자릿수 업데이트
    d11.textContent = daysStr[0];
    d00.textContent = daysStr[1];
    h11.textContent = hoursStr[0];
    h00.textContent = hoursStr[1];
    m11.textContent = minutesStr[0];
    m00.textContent = minutesStr[1];
    s11.textContent = secondsStr[0];
    s00.textContent = secondsStr[1];
  }

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  const closeButton = toast.querySelector(".toast-message-close");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      toast.style.display = "none";
    });
  }
}
