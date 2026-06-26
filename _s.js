const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
(async()=>{
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu']});
  let p=await b.newPage(); await p.setViewport({width:1280,height:240});
  await p.goto('http://localhost:4173/',{waitUntil:'networkidle0'}); await new Promise(r=>setTimeout(r,800));
  await p.screenshot({path:'/tmp/hd.png', clip:{x:0,y:0,width:760,height:170}});
  const hh=await p.evaluate(()=>Math.round(document.querySelector('.fixed.top-0').getBoundingClientRect().height));
  console.log('header fixo desktop:', hh+'px');
  await p.close();
  p=await b.newPage(); await p.setViewport({width:390,height:300,deviceScaleFactor:2,isMobile:true});
  await p.goto('http://localhost:4173/',{waitUntil:'networkidle0'}); await new Promise(r=>setTimeout(r,800));
  await p.screenshot({path:'/tmp/hm.png', clip:{x:0,y:0,width:390,height:200}});
  await p.close();
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
