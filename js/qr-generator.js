export function addDrawQR(id) {
  const img = new Image();
  const overlay = document.createElement('div');
  overlay.setAttribute('id', 'overlay');
  overlay.classList.add('overlay');
  img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(id)}&size=300x300`;
  img.setAttribute('id', 'qr');
  img.classList.add('active');
  document.body.appendChild(img);
  document.body.appendChild(overlay);

}