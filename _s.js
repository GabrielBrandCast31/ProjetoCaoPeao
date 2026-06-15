const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
(async()=>{
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu']});
  const p=await b.newPage();
  await p.setViewport({width:1450,height:900,deviceScaleFactor:2});
  await p.goto('http://localhost:4173/',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,1000));
  await p.screenshot({path:'/tmp/h3.png', clip:{x:0,y:0,width:700,height:210}});
  const f=await p.$('footer'); await f.screenshot({path:'/tmp/f3.png'});
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
