// ------- helper fetch wrapper ----------
async function getContent(){ return fetch('/api/content').then(r=>r.json()); }
async function saveContent(data){
  await fetch('/api/content',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
}

// ------- Tab logic ----------
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.onclick = () => {
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.remove('hidden');
  };
});

// -------- Load existing data ------------
let store;
getContent().then(data=>{
  store = data;
  // landing
  for(const k in data.landing){
    document.querySelector(`#landing-form [name="${k}"]`).value = data.landing[k]||'';
  }
  // contact
  for(const k in data.contact){
    const el = document.querySelector(`#contact-form-admin [name="${k}"]`);
    if(el) el.value = data.contact[k]||'';
  }
  // articles list
  reloadArticleList();
});

function reloadArticleList(){
  const ul = document.getElementById('article-list');
  ul.innerHTML='';
  store.articles.forEach((p,i)=>{
    const li = document.createElement('li');
    li.innerHTML = `${p.title} <button data-ed="${i}">edit</button> <button data-del="${i}">delete</button>`;
    ul.append(li);
  });
}

// ---------- Form submit handlers -----------
document.getElementById('landing-form').onsubmit = async e=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  fd.forEach((v,k)=>store.landing[k]=v);
  await saveContent(store); alert('Landing saved');
};

document.getElementById('contact-form-admin').onsubmit = async e=>{
  e.preventDefault();
  const fd=new FormData(e.target);
  fd.forEach((v,k)=>store.contact[k]=v);
  await saveContent(store); alert('Contact saved');
};

document.getElementById('article-form').onsubmit = async e=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const obj = Object.fromEntries(fd.entries());
  if(obj.id){ // update
    store.articles[obj.id] = {...store.articles[obj.id], ...obj};
  }else{ // add
    store.articles.push({...obj, created_at: new Date().toISOString()});
  }
  await saveContent(store); alert('Article saved');
  e.target.reset(); reloadArticleList();
};

// edit / delete buttons
document.getElementById('article-list').onclick = e=>{
  if(e.target.dataset.ed){ // edit
    const p = store.articles[e.target.dataset.ed];
    const f = document.getElementById('article-form');
    f.id.value = e.target.dataset.ed;
    f.title.value = p.title;
    f.body.value = p.body;
  }
  if(e.target.dataset.del){
    if(confirm('Delete this article?')){
      store.articles.splice(e.target.dataset.del,1);
      saveContent(store).then(()=>reloadArticleList());
    }
  }
};
