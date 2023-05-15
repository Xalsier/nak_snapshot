const bgImages = ['0','1','2','3','4'].map(i=>`../ass/sera_r${i}.jpg`),
    bgi=document.getElementById('background-image'),delay=500; 
const loadImage=src=>new Promise(res=>{const img=new Image();
    img.src=src;
    img.onload=()=>(console.log(`Image loaded:${src}`),res());});
const loadImages=async()=>{
    for(const src of bgImages){await loadImage(src);
        bgi.style.backgroundImage=`url('${src}')`;
        await new Promise(r=>setTimeout(r,delay));}};
document.addEventListener('DOMContentLoaded', loadImages);