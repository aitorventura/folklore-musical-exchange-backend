
//instalar npm i cloudinary
const cloudinary = require('cloudinary')


cloudinary.config({ 
    cloud_name: "dy4pv8x5g", 
    api_key: "144845175973356",
    api_secret: "YMhOEUMxhDxDv8tp6EhQ0CsWn_8"
  });
  

  //método que sube la imagen
cloudinary.v2.uploader.upload("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==", 
  function(error, result) {
      const val = result.url
      console.log(val)
   });