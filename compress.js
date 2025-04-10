function compressImage() {
  const input = document.getElementById('imageInput');
  const targetSize = parseInt(document.getElementById('targetSize').value);
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  if (!input.files.length || isNaN(targetSize)) {
    alert("Please select an image and enter target size.");
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      let quality = 0.9;
      let compressedDataUrl = "";

      const tryCompress = () => {
        compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        const compressedSizeKB = Math.ceil(compressedDataUrl.length / 1024);
        if (compressedSizeKB > targetSize && quality > 0.1) {
          quality -= 0.05;
          tryCompress();
        } else {
          const a = document.createElement("a");
          a.href = compressedDataUrl;
          a.download = "compressed.jpg";
          a.textContent = "Download Compressed Image";
          const downloadSection = document.getElementById("downloadSection");
          downloadSection.innerHTML = "";
          downloadSection.appendChild(a);
        }
      };
      tryCompress();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}