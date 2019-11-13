const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage(img64) {
  try {
    const base64Cover = new Buffer(img64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    const [optimizedCoverBuffer, optimizedAvatarCoverBuffer] = await Promise.all([
      sharp(base64Cover)
        .resize({ width: 345, height: 200 })
        .jpeg({ quality: 60 })
        .toBuffer(),
      sharp(base64Cover)
        .resize({ width: 24, height: 24 })
        .jpeg({ quality: 50 })
        .toBuffer(),
    ]);

    // const optimizedCoverBuffer = await sharp(base64Cover)
    //  .resize({ width: 345, height: 200 })
    //  .jpeg({ quality: 60 })
    //  .toBuffer();
    // const optimizedAvatarCoverBuffer = await sharp(base64Cover)
    //  .resize({ width: 24, height: 24 })
    //  .jpeg({ quality: 50 })
    //  .toBuffer();

    const coverFileName = `${Date.now()}cover`;
    const avatarCoverFileName = `${Date.now()}avatarCover`;

    await Promise.all([
      fs.writeFile(path.join(__dirname, `../public/images/${coverFileName}.jpeg`), optimizedCoverBuffer),
      fs.writeFile(path.join(__dirname, `../public/images/${avatarCoverFileName}.jpeg`), optimizedAvatarCoverBuffer),
    ]);
    // await fs.writeFile(path.join(__dirname, `../public/images/${coverFileName}.jpeg`), optimizedCoverBuffer);
    // await fs.writeFile(
    //  path.join(__dirname, `../public/images/${avatarCoverFileName}.jpeg`),
    //  optimizedAvatarCoverBuffer
    // );
    return { avatarCover: `${avatarCoverFileName}.jpeg`, cover: `${coverFileName}.jpeg` };
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
}

module.exports = optimizeImage;
