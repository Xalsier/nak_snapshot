let t;
document.addEventListener('DOMContentLoaded',async()=>{
    let s=document.getElementById('language-selector');
    s&&s.addEventListener('change',async e=>{
        let l=e.target.value;
        t=t||await(await fetch('../translation.json')).json();
        document.querySelectorAll('[data-translate]').forEach(e=>{
            e.innerText=t[l][e.getAttribute('data-translate')]})})})