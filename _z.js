const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
(async()=>{
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu']});
  const p=await b.newPage(); await p.setViewport({width:1280,height:240,deviceScaleFactor:3});
  await p.goto('http://localhost:4173/',{waitUntil:'networkidle0'}); await new Promise(r=>setTimeout(r,800));
  const d=await p.evaluate(()=>{const i=document.querySelector('header img');const r=i.getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height)};});
  console.log('logo header exibida:', d.w+'x'+d.h, '(ratio', (d.w/d.h).toFixed(2)+')');
  const box=await p.evaluate(()=>{const i=document.querySelector('header img');const r=i.getBoundingClientRect();return {x:Math.max(0,r.x-8),y:Math.max(0,r.y-6),w:r.width+16,h:r.height+12};});
  await p.screenshot({path:'/tmp/lz.png', clip:box});
  // header completo
  await p.screenshot({path:'/tmp/hfull.png', clip:{x:0,y:0,width:760,height:150}});
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
