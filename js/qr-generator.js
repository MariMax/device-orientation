const img = new Image();
const overlay = document.createElement('div');

overlay.setAttribute('id', 'overlay');
overlay.classList.add('overlay');

img.setAttribute('id', 'qr');
img.classList.add('active');

export async function addDrawQR(id) {
  const blob = await fetch(
    `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(
      id,
    )}&chs=300x300&chld=L|1`,
  ).then(res => res.blob());
  img.src = URL.createObjectURL(blob);
  document.body.appendChild(img);
  document.body.appendChild(overlay);
  return new File([blob], 'qr.png', blob);
}

export async function removeQR() {
  document.body.removeChild(img);
  document.body.removeChild(overlay);
}
