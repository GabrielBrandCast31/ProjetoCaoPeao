const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
(async()=>{
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu']});
  // desktop header
  let p=await b.newPage(); await p.setViewport({width:1280,height:200,deviceScaleFactor:2});
  await p.goto('http://localhost:4173/',{waitUntil:'networkidle0'}); await new Promise(r=>setTimeout(r,700));
  await p.screenshot({path:'/tmp/hdr_ok.png', clip:{x:0,y:0,width:640,height:140}});
  await p.close();
  // footer
  p=await b.newPage(); await p.setViewport({width:1100,height:900});
  await p.goto('http://localhost:4173/',{waitUntil:'networkidle0'}); await new Promise(r=>setTimeout(r,800));
  const f=await p.$('footer'); await f.screenshot({path:'/tmp/ftr_ok.png'});
  await p.close();
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
