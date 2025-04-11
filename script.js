
const uploadImage = document.getElementById("uploadImage");
const previewImage = document.getElementById("previewImage");
const downloadSection = document.getElementById("downloadSection");
const downloadLink = document.getElementById("downloadLink");

uploadImage.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

function compressImage() {
  alert("Compression by KB not fully functional in demo. Will be added in backend.");
  downloadSection.style.display = "block";
}

function resizeByPixel() {
  alert("Pixel resize demo triggered!");
  downloadSection.style.display = "block";
}

function convertToPDF() {
  alert("Image will be converted to PDF!");
}

document.getElementById("kbMode").onclick = () => {
  document.getElementById("kbResizeSection").style.display = "block";
  document.getElementById("pixelResizeSection").style.display = "none";
};

document.getElementById("pixelMode").onclick = () => {
  document.getElementById("kbResizeSection").style.display = "none";
  document.getElementById("pixelResizeSection").style.display = "block";
};
