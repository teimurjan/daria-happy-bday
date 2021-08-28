const isSafari = () =>
  /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

const getFullHeight = () => (isSafari() ? "-webkit-fill-available" : "100vh");

export default getFullHeight;
