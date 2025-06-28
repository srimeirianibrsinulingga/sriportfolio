fetch('/api/content').then(r=>r.json()).then(d=>{
  const c = d.contact, box = document.getElementById('social-icons');
  if(c.whatsapp) add('fab fa-whatsapp', c.whatsapp);
  if(c.linkedin) add('fab fa-linkedin', c.linkedin);
  if(c.email)    add('fas fa-envelope', `mailto:${c.email}`);

  function add(cls, href){
    const a = document.createElement('a'); a.href = href; a.target = '_blank';
    a.innerHTML = `<i class="${cls}"></i>`; box.append(a);
  }
});
