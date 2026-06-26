const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
(async()=>{
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu']});
  const p=await b.newPage(); await p.setViewport({width:390,height:844,deviceScaleFactor:2,isMobile:true});
  await p.goto('http://localhost:4173/',{waitUntil:'networkidle0'}); await new Promise(r=>setTimeout(r,1000));
  await p.click('button[aria-label="Abrir Menu"]');
  await new Promise(r=>setTimeout(r,600));
  const d=await p.evaluate(()=>{const i=document.querySelector('.cp-mm__brand');if(!i)return null;const r=i.getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height),ratio:+(r.width/r.height).toFixed(2),natW:i.naturalWidth,natH:i.naturalHeight,src:i.getAttribute('src')};});
  console.log('logo do menu:', JSON.stringify(d));
  await p.screenshot({path:'/tmp/mm.png'});
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
