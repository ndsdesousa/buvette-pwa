const sharp = require('sharp');
const fs = require('fs');

// Générer les icônes PNG à partir du SVG
async function generateIcons() {
  const svgIcon = `
    <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="64" fill="#1e40af"/>
      <path d="M128 384V256C128 232.435 147.435 213 171 213H341C364.565 213 384 232.435 384 256V384H128Z" fill="white"/>
      <circle cx="256" cy="171" r="43" fill="white"/>
      <rect x="192" y="277" width="128" height="21" rx="11" fill="#1e40af"/>
      <rect x="192" y="320" width="85" height="21" rx="11" fill="#1e40af"/>
    </svg>
  `;

  // Sauvegarder l'icône 192x192
  await sharp(Buffer.from(svgIcon))
    .resize(192, 192)
    .png()
    .toFile('public/icon-192x192.png');

  // Sauvegarder l'icône 512x512
  await sharp(Buffer.from(svgIcon))
    .resize(512, 512)
    .png()
    .toFile('public/icon-512x512.png');

  console.log('Icônes générées avec succès !');
}

generateIcons().catch(console.error);
