fetch('/api/content').then(r=>r.json()).then(d => {
  const wrap = document.getElementById('post-list');
  const tpl = document.getElementById('post-card').content;
  d.articles.forEach((p,i) => {
    const node = tpl.cloneNode(true);
    node.querySelector('.post-link').textContent = p.title;
    node.querySelector('.post-link').href = `post.html?idx=${i}`;
    node.querySelector('.date').textContent =
      new Date(p.created_at || Date.now()).toLocaleDateString();
    wrap.append(node);
  });
});
