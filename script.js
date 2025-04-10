function compressImage() {
  const fileInput = document.getElementById("upload");
  const targetSize = parseInt(document.getElementById("targetSize").value);
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if (!fileInput.files.length || !targetSize)
    return alert("Upload image and enter target size.");

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      let quality = 0.95;

      function tryCompress() {
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        const sizeKB = Math.round((dataUrl.length * (3 / 4)) / 1024);
        if (sizeKB <= targetSize || quality < 0.1) {
          downloadImage(dataUrl);
        } else {
          quality -= 0.05;
          tryCompress();
        }
      }

      tryCompress();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(fileInput.files[0]);
}

function downloadImage(dataUrl) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "compressed.jpg";
  a.click();
}
