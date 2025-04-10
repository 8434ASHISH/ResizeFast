function compressImage() {
  const fileInput = document.getElementById('imageInput');
  const targetSizeKB = parseInt(document.getElementById('targetSize').value);
  if (!fileInput.files.length || !targetSizeKB) {
    alert('Please select an image and enter a target size in KB.');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      let quality = 0.9;
      function tryCompress() {
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const sizeKB = Math.ceil(dataURLtoBlob(dataUrl).size / 1024);
        if (sizeKB > targetSizeKB && quality > 0.05) {
          quality -= 0.05;
          tryCompress();
        } else {
          document.getElementById('previewImage').src = dataUrl;
          const downloadLink = document.getElementById('downloadLink');
          downloadLink.href = dataUrl;
          document.getElementById('previewSection').style.display = 'block';
        }
      }

      tryCompress();
    };
  };
}

function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
  return new Blob([u8arr], { type: mime });
}
