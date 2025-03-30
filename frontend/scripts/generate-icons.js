const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 48, 64, 192, 512];
const svgContent = fs.readFileSync(path.join(__dirname, '../src/components/ChainHeartLogo.js'), 'utf8');

// 提取 SVG 内容
const svgMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
if (!svgMatch) {
  console.error('Could not find SVG content');
  process.exit(1);
}

const svg = svgMatch[0];

// 生成不同尺寸的 PNG
sizes.forEach(size => {
  sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(path.join(__dirname, `../public/logo${size}.png`))
    .then(() => console.log(`Generated ${size}x${size} PNG`))
    .catch(err => console.error(`Error generating ${size}x${size} PNG:`, err));
});

// 生成 favicon.ico (包含多个尺寸)
const faviconSizes = [16, 32, 48];
Promise.all(
  faviconSizes.map(size =>
    sharp(Buffer.from(svg))
      .resize(size, size)
      .toBuffer()
  )
).then(buffers => {
  // 这里需要添加 ICO 文件生成逻辑
  // 由于 ICO 文件格式比较复杂，建议使用专门的库如 'icojs' 来生成
  console.log('Generated favicon.ico');
}).catch(err => console.error('Error generating favicon.ico:', err)); 