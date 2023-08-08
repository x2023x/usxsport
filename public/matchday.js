let downloadBtn = document.querySelector(".download-all-leagues")

downloadBtn.addEventListener("click", () => {
html2canvas(document.querySelector(".fixtures"), { useCORS: true, scale: 3, windowWidth: 500 }).then(canvas => {
  canvas.toBlob(async blob => {
  
    let date = new Date();
   await saveAs(blob, `heisen-matches.png`);
  }, 'image/png');

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = canvas.toDataURL('image/png');
});
});