let downloadBtn = document.querySelector(".download-league")

downloadBtn.addEventListener("click", () => {
html2canvas(document.querySelector(".container"), { useCORS: true, scale: 3, windowWidth: 1400 }).then(canvas => {
  canvas.toBlob(async blob => {
  
    let date = new Date();
   await saveAs(blob, `standing-heisenport.png`);
  }, 'image/png');

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = canvas.toDataURL('image/png');
});
});