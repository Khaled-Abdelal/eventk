const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage(img64) {
  const base64Cover = new Buffer(img64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const optimizedCoverBuffer = await sharp(base64Cover)
    .resize({ width: 345, height: 200 })
    .jpeg({ quality: 60 })
    .toBuffer();
  // const optimizedCover = `data:image/jpeg;base64,${optimizedCoverBuffer.toString('base64')}`;
  // const optimizedCover = optimizedCoverBuffer.toString('base64');
  const fileName = Date.now();
  await fs.writeFile(path.join(__dirname, `../public/images/${fileName}.jpeg`), optimizedCoverBuffer, () => {});
  return `${fileName}.jpeg`;
}

module.exports = optimizeImage;
