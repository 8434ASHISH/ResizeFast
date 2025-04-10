
function compressImage() {
  const imageInput = document.getElementById("imageInput");
  const targetSize = document.getElementById("targetSize").value;
  const loader = document.getElementById("loader");
  const downloadLink = document.getElementById("downloadLink");

  if (!imageInput.files.length || !targetSize) {
    alert("Please select an image and enter target size in KB.");
    return;
  }

  loader.style.display = "block";
  downloadLink.style.display = "none";

  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxW = 800;
      const scale = maxW / img.width;
      canvas.width = maxW;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      let quality = 0.9;
      let output = canvas.toDataURL("image/jpeg", quality);
      let size = Math.ceil((output.length * (3/4)) / 1024);

      while (size > targetSize && quality > 0.1) {
        quality -= 0.05;
        output = canvas.toDataURL("image/jpeg", quality);
        size = Math.ceil((output.length * (3/4)) / 1024);
      }

      const link = document.getElementById("downloadLink");
      link.href = output;
      link.style.display = "inline-block";
      loader.style.display = "none";
    };
  };

  reader.readAsDataURL(file);
}

document.getElementById("imageInput").addEventListener("change", function () {
  const preview = document.getElementById("imagePreview");
  preview.src = URL.createObjectURL(this.files[0]);
});
