
    // breve script para busca + copiar
    const search = document.getElementById('search');
    const clearBtn = document.getElementById('clear');
    const cards = Array.from(document.querySelectorAll('#commands .card'));
    const toast = document.getElementById('toast');

    function showToast(text="Copiado!"){
      toast.textContent = text; toast.style.display = 'block';
      setTimeout(()=>toast.style.display='none',1500);
    }

    document.querySelectorAll('.copy').forEach(btn=>{
      btn.addEventListener('click', async ()=> {
        const cmd = btn.getAttribute('data-cmd');
        try{
          await navigator.clipboard.writeText(cmd);
          showToast('Comando copiado: ' + cmd);
        }catch(e){
          showToast('Erro ao copiar');
        }
      });
    });

    function filter(q){
      q = q.trim().toLowerCase();
      cards.forEach(card=>{
        const txt = (card.textContent + ' ' + card.dataset.keywords).toLowerCase();
        card.style.display = txt.includes(q) ? '' : 'none';
      });
    }

    search.addEventListener('input', e=> filter(e.target.value));
    clearBtn.addEventListener('click', ()=>{ search.value=''; filter(''); search.focus(); });

    // atalho: Ctrl+K para focar busca
    window.addEventListener('keydown', e=>{
      if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); search.focus(); }
    });