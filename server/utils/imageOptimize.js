const sharp = require('sharp');

async function optimizeImage(img64) {
  const base64Cover = new Buffer(img64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const optimizedCoverBuffer = await sharp(base64Cover)
    .resize({ width: 345, height: 200 })
    .png({ compressionLevel: 6 })
    .toBuffer();
  const optimizedCover = `data:image/png;base64,${optimizedCoverBuffer.toString('base64')}`;
  return optimizedCover;
}

module.exports = optimizeImage;
