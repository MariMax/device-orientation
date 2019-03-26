export async function readQR(file) {
  const formData = new FormData();
  formData.append('file', file);
  return fetch(`https://zxing.org/w/decode`, {
    method: 'POST',
    body: formData,
    mode: 'no-cors',
  })
  .then((res) => res.text());
}