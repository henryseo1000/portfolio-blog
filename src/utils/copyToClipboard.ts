export default function copyToClipBoard(text) {

    navigator.clipboard.writeText(text)
    .then(() => {
      alert("클립보드에 복사되었습니다.");
    })
    .catch(err => {
      console.error("복사 실패:", err);
    });
}