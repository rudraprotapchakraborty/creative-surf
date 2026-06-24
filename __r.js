const sharp=require('sharp');
const builds={
 // B1: stepped two-tower cluster with windows
 B1:{ body:'M4 36 L4 23 L9 23 L9 7 Q9 6 10 6 L20 6 Q21 6 21 7 L21 16 L31 16 L31 36 Z',
   inner:['M12 12 h3','M12 16 h3','M12 20 h3','M12 24 h3','M16 12 h2','M16 16 h2','M16 20 h2','M16 24 h2','M24 21 h3','M24 25 h3','M24 29 h3','M6 27 h1.5','M6 31 h1.5'] },
 // B2: single skyscraper with setbacks + antenna
 B2:{ body:'M17 36 L17 8 L16 8 L16 5 L18 5 L18 2 L19 2 L19 5 L21 5 L21 8 L20 8 L20 11 L26 11 L26 18 L31 18 L31 36 L6 36 L6 23 L17 23 Z',
   inner:['M9 27 h2','M9 31 h2','M13 27 h2','M13 31 h2','M22 15 h2','M22 22 h2','M22 27 h2','M27 22 h2','M27 27 h2','M27 31 h2'] },
 // B3: three-building skyline
 B3:{ body:'M2 36 L2 20 L11 20 L11 12 L13 10 L15 12 L15 20 L24 20 L24 6 L33 6 L33 36 Z',
   inner:['M5 24 h3','M5 29 h3','M18 24 h3','M18 29 h3','M27 11 h3','M27 16 h3','M27 21 h3','M27 26 h3','M27 31 h3'] },
};
const cell=240,keys=Object.keys(builds);
function svg(b){return `<svg xmlns="http://www.w3.org/2000/svg" width="${cell}" height="${cell}" viewBox="-2 -2 40 40">
 <defs><clipPath id="w"><path d="M -4 22 Q 9 20 18 22 T 40 22 L 40 44 L -4 44 Z"/></clipPath>
 <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#F5D78E"/><stop offset="55%" stop-color="#D4A843"/><stop offset="100%" stop-color="#B8892A"/></linearGradient></defs>
 <rect x="-2" y="-2" width="40" height="40" fill="#03121d"/>
 <g clip-path="url(#w)"><path d="${b.body}" fill="url(#g)"/></g>
 <path d="${b.body}" fill="none" stroke="#e8eef5" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"/>
 ${b.inner.map(d=>`<path d="${d}" fill="none" stroke="#e8eef5" stroke-width="1" stroke-linecap="round"/>`).join('')}
</svg>`;}
(async()=>{const comps=[];let i=0;for(const k of keys){
 const buf=await sharp(Buffer.from(svg(builds[k]))).png().toBuffer();
 const lbl=await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cell}" height="22"><rect width="${cell}" height="22" fill="#001a2b"/><text x="8" y="16" font-size="13" fill="#fff" font-family="sans-serif">${k}</text></svg>`)).png().toBuffer();
 comps.push({input:lbl,top:0,left:i*cell});comps.push({input:buf,top:22,left:i*cell});i++;}
 await sharp({create:{width:cell*3,height:cell+22,channels:4,background:'#fff'}}).composite(comps).png().toFile('__wv/cmp.png');console.log('ok');})();
