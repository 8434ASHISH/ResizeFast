
document.getElementById('upload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const preview = document.getElementById('preview');
    preview.src = event.target.result;
    preview.style.display = 'block';
  }
  if (file) {
    reader.readAsDataURL(file);
  }
});

document.getElementById('compressBtn').addEventListener('click', function() {
  const loader = document.getElementById('loader');
  const downloadLink = document.getElementById('downloadLink');
  loader.style.display = 'block';
  setTimeout(() => {
    loader.style.display = 'none';
    downloadLink.style.display = 'inline-block';
    downloadLink.href = document.getElementById('preview').src;
  }, 2000);
});
