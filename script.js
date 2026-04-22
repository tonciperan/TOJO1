// ── LAZY GOOGLE MAPS LOADER ──────────────────────────────────────
// Shared by index.html and index-en.html. Replaces identical inline scripts.
(function(){
    var loaded=false;
    function loadMap(){
        if(loaded)return;loaded=true;
        var ph=document.getElementById('map-placeholder');
        if(!ph)return;
        var f=document.createElement('iframe');
        f.src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.183237917589!2d15.957384075860165!3d43.64168547110272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133523503eea7b17%3A0xbd230735e61d25b6!2sApartment%20TOJO!5e1!3m2!1shr!2shr!4v1773226132801!5m2!1shr!2shr';
        f.width='100%';f.height='420';
        f.style.cssText='border:0;border-radius:4px;display:block;';
        f.allowFullscreen=true;f.loading='lazy';
        f.referrerPolicy='no-referrer-when-downgrade';
        f.title='Lokacija Apartmani TOJO, Grebaštica';
        ph.replaceWith(f);
    }
    window.loadMap=loadMap;
    var ph=document.getElementById('map-placeholder');
    if(ph){
        if('IntersectionObserver' in window){
            new IntersectionObserver(function(e,o){if(e[0].isIntersecting){loadMap();o.disconnect();}},{rootMargin:'300px'}).observe(ph);
        }
        // onclick is set via HTML attribute; window.loadMap handles it
    }
})();
// ── END LAZY MAP LOADER ──────────────────────────────────────────

document.addEventListener('click',function(e){const footerBtn=e.target.closest('#footer-rezerviraj');if(footerBtn){e.preventDefault();const modal=document.getElementById('bookingModal');if(modal){modal.style.display='block';document.body.style.overflow='hidden';if(typeof calculatePrice==='function')calculatePrice();}return;}const btn = e.target.closest('.nav-cta-btn');if(!btn)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const navEl = document.getElementById('nav-menu');const hamburger = document.getElementById('mobile-menu');if(navEl)navEl.classList.remove('active');if(hamburger)hamburger.classList.remove('active');document.body.classList.remove('menu-open');setTimeout(function(){const modal = document.getElementById('bookingModal');if(modal){modal.style.display = 'block';document.body.style.overflow = 'hidden';if(typeof calculatePrice === 'function')calculatePrice();}},100);},true);window.onbeforeunload = function(){window.scrollTo(0,0);};if('scrollRestoration' in history){history.scrollRestoration = 'manual';}window.scrollTo(0,0);document.addEventListener('DOMContentLoaded',function(){const btn = document.querySelector('.menu-toggle');const nav = document.querySelector('#nav-menu');if(btn && nav){btn.onclick = function(e){e.preventDefault();nav.style.right = '';btn.classList.toggle('active');nav.classList.toggle('active');document.body.classList.toggle('menu-open');};}});function reveal(){var reveals = document.querySelectorAll(".reveal");for(var i = 0;i < reveals.length;i++){var windowHeight = window.innerHeight;var elementTop = reveals[i].getBoundingClientRect().top;var elementVisible = 150;if(elementTop < windowHeight - elementVisible){reveals[i].classList.add("active");}}}window.addEventListener("scroll",reveal);reveal();document.addEventListener('DOMContentLoaded',function(){const btn = document.getElementById('mobile-menu');const nav = document.getElementById('nav-menu');const body = document.body;if(btn && nav){btn.onclick = function(){btn.classList.toggle('active');nav.classList.toggle('active');body.classList.toggle('menu-open');};const links = nav.querySelectorAll('a');links.forEach(link =>{link.addEventListener('click',function(e){const isDropdownToggle = this.closest('.nav-dropdown')&& !this.closest('.dropdown-menu');if(isDropdownToggle)return;if(this.classList.contains('nav-cta-btn')){e.preventDefault();btn.classList.remove('active');nav.classList.remove('active');body.classList.remove('menu-open');setTimeout(()=>{const modal = document.getElementById('bookingModal');if(modal){modal.style.display = 'block';document.body.style.overflow = 'hidden';if(typeof calculatePrice === 'function')calculatePrice();}},300);return;}btn.classList.remove('active');nav.classList.remove('active');body.classList.remove('menu-open');});});const dropdownToggle = document.querySelector('.nav-dropdown > a');if(dropdownToggle){dropdownToggle.addEventListener('click',function(e){if(window.innerWidth <= 768){e.preventDefault();e.stopPropagation();this.closest('.nav-dropdown').classList.toggle('open');}});}document.addEventListener('click',function(e){const dropdown = document.querySelector('.nav-dropdown');if(dropdown && !dropdown.contains(e.target)){dropdown.classList.remove('open');}});}function initMainSwipers(){if(document.querySelector('.mainSwiper')){new Swiper('.mainSwiper',{speed:1000,loop:true,navigation:{nextEl:'.main-apt-next',prevEl:'.main-apt-prev'},pagination:{el:'.main-apt-pagination',clickable:true,dynamicBullets:true}});}if(document.querySelector('.landmarksSwiper')){new Swiper('.landmarksSwiper',{speed:1000,slidesPerView:1,spaceBetween:0,loop:true,navigation:{nextEl:'.landmarks-next',prevEl:'.landmarks-prev'},pagination:{el:'.landmarks-pagination',clickable:true}});}if(document.querySelector('.modalMainSwiper')){new Swiper('.modalMainSwiper',{speed:800,loop:true,observer:true,observeParents:true,navigation:{nextEl:'.modal-left .swiper-button-next',prevEl:'.modal-left .swiper-button-prev'}});}}if(typeof Swiper!=='undefined'){initMainSwipers();}else{var _swiperTarget=document.querySelector('.mainSwiper')||document.querySelector('.landmarksSwiper');if(_swiperTarget&&'IntersectionObserver' in window){var _swiperObs=new IntersectionObserver(function(e,o){if(e[0].isIntersecting){o.disconnect();var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';s.onload=function(){initMainSwipers();document.querySelectorAll('.landmark-item[data-bg]').forEach(function(el){el.style.backgroundImage='linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)),url(+el.dataset.bg+)'});};document.head.appendChild(s);}},{rootMargin:'500px'});_swiperObs.observe(_swiperTarget);}}function reveal(){var reveals = document.querySelectorAll(".reveal");for(var i = 0;i < reveals.length;i++){var windowHeight = window.innerHeight;var elementTop = reveals[i].getBoundingClientRect().top;var elementVisible = 100;if(elementTop < windowHeight - elementVisible){reveals[i].classList.add("active");}}}window.addEventListener("scroll",reveal);reveal();});(function(){let touchStartX = 0;let touchStartY = 0;document.addEventListener('touchstart',function(e){touchStartX = e.touches[0].clientX;touchStartY = e.touches[0].clientY;},{passive: true});document.addEventListener('touchend',function(e){const nav = document.getElementById('nav-menu');const btn = document.getElementById('mobile-menu');if(!nav || !nav.classList.contains('active'))return;const deltaX = e.changedTouches[0].clientX - touchStartX;const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY);if(deltaX > 60 && deltaY < 40){nav.style.right = '';nav.classList.remove('active');if(btn)btn.classList.remove('active');document.body.classList.remove('menu-open');}},{passive: true});})();document.addEventListener('DOMContentLoaded',function(){const progressBar = document.createElement('div');progressBar.id = 'scroll-progress';document.body.appendChild(progressBar);window.addEventListener('scroll',function(){const scrollTop = window.scrollY;const docHeight = document.documentElement.scrollHeight - window.innerHeight;progressBar.style.transform='scaleX('+(docHeight>0?scrollTop/docHeight:0)+')';},{passive: true});const heroImg = document.querySelector('.hero-img-fade');const isTouch =('ontouchstart' in window)|| navigator.maxTouchPoints > 0;if(heroImg && !isTouch && window.innerWidth > 900){heroImg.style.willChange="transform";let rafId = null;window.addEventListener('scroll',function(){if(rafId)return;rafId = requestAnimationFrame(function(){const scrollY = window.scrollY;if(scrollY < window.innerHeight * 1.2){heroImg.style.transform = 'translateY(' +(scrollY * 0.2)+ 'px)';}rafId = null;});},{passive: true});}const waFloat = document.createElement('a');waFloat.id = 'wa-float';waFloat.href = 'https://wa.me/385955502487?text=Zanima%20me%20smještaj';waFloat.target = '_blank';waFloat.setAttribute('aria-label','WhatsApp');waFloat.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';document.body.appendChild(waFloat);setTimeout(function(){waFloat.classList.add('wa-visible');},800);const heroSection = document.querySelector('.hero-section');if(heroSection){const indicator = document.createElement('div');indicator.className = 'scroll-indicator';indicator.innerHTML = '<span>Scroll</span>';heroSection.appendChild(indicator);window.addEventListener('scroll',function(){indicator.style.opacity = window.scrollY > 100 ? '0' : '0.7';},{passive: true});}function animateCounter(el,target,duration){let start = 0;const step = target /(duration / 16);const timer = setInterval(()=>{start += step;if(start >= target){start = target;clearInterval(timer);}el.textContent = Math.floor(start)+(el.dataset.suffix || '');},16);}const observer = new IntersectionObserver((entries)=>{entries.forEach(entry =>{if(entry.isIntersecting){entry.target.querySelectorAll('[data-count]').forEach(el =>{animateCounter(el,parseInt(el.dataset.count),1500);});observer.unobserve(entry.target);}});},{threshold: 0.5});document.querySelectorAll('.products-section,.location-map-section').forEach(el =>{observer.observe(el);});if('IntersectionObserver' in window){document.querySelectorAll('.landmark-item[data-bg]').forEach(function(el){new IntersectionObserver(function(e,o){if(e[0].isIntersecting){el.style.backgroundImage='linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)),url("'+el.dataset.bg+'")';;o.unobserve(el);}},{rootMargin:'400px'}).observe(el);});} else{document.querySelectorAll('.landmark-item[data-bg]').forEach(function(el){el.style.backgroundImage='linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)),url("'+el.dataset.bg+'")';;});}});

function buildOverlay(){var ov = document.createElement('div');ov.id = 'tojo-overlay';ov.innerHTML = '<div id="tojo-modal"></div>';document.body.appendChild(ov);ov.addEventListener('click',function(e){if(e.target === ov) closeModal();});document.addEventListener('keydown',function(e){if(e.key === 'Escape') closeModal();});return ov;}var overlay = buildOverlay();var modal = document.getElementById('tojo-modal');function openModal(html){modal.innerHTML = html;overlay.classList.add('open');document.body.style.overflow = 'hidden';}function closeModal(){overlay.classList.remove('open');document.body.style.overflow = '';modal.querySelectorAll('.modalMainSwiper').forEach(function(el){if(el.swiper) el.swiper.destroy(true,true);});setTimeout(function(){modal.innerHTML = '';},300);}document.addEventListener('click',function(e){if(e.target.closest('.tojo-close')) closeModal();});var galleries ={};document.querySelectorAll('.gallery-trigger').forEach(function(el){var g = el.dataset.gallery;if(!galleries[g]) galleries[g] =[];galleries[g].push({src: el.getAttribute('href'),caption: el.dataset.caption || ''});});document.addEventListener('click',function(e){var trigger = e.target.closest('.gallery-trigger');if(!trigger) return;e.preventDefault();var group = trigger.dataset.gallery;var items = galleries[group] ||[];var clicked = trigger.getAttribute('href');var idx = items.findIndex(function(i){return i.src === clicked;});if(idx < 0) idx = 0;showPhotoGallery(items,idx);});function showPhotoGallery(items,startIdx){var current = startIdx;function render(){var item = items[current];var thumbs = items.map(function(it,i){return '<img src="' + it.src + '" class="pg-thumb' +(i === current ? ' active' : '') + '" data-idx="' + i + '" loading="lazy">';}).join('');openModal('<div class="pg-wrap">' + '<button class="tojo-close">&#x2715;</button>' + '<div class="pg-counter">' +(current+1) + ' / ' + items.length + '</div>' + '<div class="pg-main">' + '<button class="pg-nav pg-prev">&#8249;</button>' + '<img class="pg-img" src="' + item.src + '" alt="" loading="lazy">' + '<button class="pg-nav pg-next">&#8250;</button>' + '</div>' +(item.caption ? '<div class="pg-caption">' + item.caption + '</div>' : '') + '<div class="pg-thumbs">' + thumbs + '</div>' + '</div>');modal.querySelector('.pg-prev').onclick = function(){current =(current - 1 + items.length) % items.length;render();};modal.querySelector('.pg-next').onclick = function(){current =(current + 1) % items.length;render();};modal.querySelectorAll('.pg-thumb').forEach(function(th){th.onclick = function(){current = parseInt(th.dataset.idx);render();};});var pgMain = modal.querySelector('.pg-main');if(pgMain){var tsX = 0;pgMain.addEventListener('touchstart',function(e){tsX = e.touches[0].clientX;},{passive: true});pgMain.addEventListener('touchend',function(e){var d = tsX - e.changedTouches[0].clientX;if(Math.abs(d) > 40){current = d > 0 ?(current + 1) % items.length :(current - 1 + items.length) % items.length;render();}},{passive: true});}}render();}document.addEventListener('click',function(e){var btn = e.target.closest('.btn-landmark-open');if(!btn) return;e.preventDefault();var modalEl = document.querySelector(btn.dataset.modal);if(!modalEl) return;var slides = modalEl.querySelectorAll('.swiper-slide img');var imgs = Array.from(slides).map(function(img){return{src: img.getAttribute('src'),alt: img.getAttribute('alt') || ''};});var title = modalEl.querySelector('h3') ? modalEl.querySelector('h3').textContent : '';var textHTML = modalEl.querySelector('.modal-text') ? modalEl.querySelector('.modal-text').innerHTML : '';var current = 0;function renderLandmark(){var thumbs = imgs.map(function(it,i){return '<img src="' + it.src + '" class="pg-thumb' +(i === current ? ' active' : '') + '" data-idx="' + i + '" loading="lazy">';}).join('');openModal('<div class="lm-wrap">' + '<button class="tojo-close">&#x2715;</button>' + '<div class="lm-left">' + '<div class="lm-main">' + '<button class="pg-nav pg-prev">&#8249;</button>' + '<img class="lm-img" src="' + imgs[current].src + '" alt="' + imgs[current].alt + '" loading="lazy">' + '<button class="pg-nav pg-next">&#8250;</button>' + '</div>' + '<div class="pg-thumbs">' + thumbs + '</div>' + '</div>' + '<div class="lm-right">' + '<h3 class="lm-title">' + title + '</h3>' + '<div class="lm-text">' + textHTML + '</div>' + '</div>' + '</div>');modal.querySelector('.pg-prev').onclick = function(){current =(current - 1 + imgs.length) % imgs.length;renderLandmark();};modal.querySelector('.pg-next').onclick = function(){current =(current + 1) % imgs.length;renderLandmark();};modal.querySelectorAll('.pg-thumb').forEach(function(th){th.onclick = function(){current = parseInt(th.dataset.idx);renderLandmark();};});var lmMain = modal.querySelector('.lm-main');if(lmMain){var tsX = 0;lmMain.addEventListener('touchstart',function(e){tsX = e.touches[0].clientX;},{passive: true});lmMain.addEventListener('touchend',function(e){var d = tsX - e.changedTouches[0].clientX;if(Math.abs(d) > 40){current = d > 0 ?(current + 1) % imgs.length :(current - 1 + imgs.length) % imgs.length;renderLandmark();}},{passive: true});}}if(imgs.length > 0) renderLandmark();});document.addEventListener('DOMContentLoaded',function(){var mainEl = document.querySelector('.mySwiper2');if(mainEl){var thumbsSw = new Swiper('.myThumb2',{spaceBetween: 8,slidesPerView: 4,freeMode: true,watchSlidesProgress: true,});if(mainEl.swiper){mainEl.swiper.destroy(true,true);}var galleryImgs =[];mainEl.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate) img').forEach(function(img){var src = img.getAttribute('src');if(src && galleryImgs.indexOf(src) === -1) galleryImgs.push(src);});new Swiper('.mySwiper2',{loop: true,speed: 700,navigation:{nextEl: '.n2',prevEl: '.p2'},pagination:{el: '#pagination2',clickable: true,dynamicBullets: true},thumbs:{swiper: thumbsSw},keyboard:{enabled: true},on:{click: function(swiper,event){event.preventDefault();openGallery(galleryImgs,swiper.realIndex);}}});mainEl.style.cursor = 'zoom-in';}});var _gImgs =[],_gIdx = 0,_gOv = null;function openGallery(imgs,startIdx){_gImgs = imgs;_gIdx = startIdx;if(!_gOv){_gOv = document.createElement('div');_gOv.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;';_gOv.addEventListener('click',function(e){if(e.target===_gOv) closeGallery();});document.body.appendChild(_gOv);document.addEventListener('keydown',function(e){if(e.key==='Escape') closeGallery();if(e.key==='ArrowRight'){_gIdx=(_gIdx+1)%_gImgs.length;renderGallery();}if(e.key==='ArrowLeft'){_gIdx=(_gIdx-1+_gImgs.length)%_gImgs.length;renderGallery();}});}renderGallery();_gOv.style.display = 'flex';document.body.style.overflow = 'hidden';}function renderGallery(){_gOv.innerHTML = '';var xBtn = document.createElement('button');xBtn.textContent = '×';xBtn.style.cssText = 'position:fixed;top:15px;right:15px;z-index:10;width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,0.7);color:#fff;border:none;cursor:pointer;font-size:24px;display:flex;align-items:center;justify-content:center;';xBtn.onclick = closeGallery;_gOv.appendChild(xBtn);var cnt = document.createElement('div');cnt.textContent =(_gIdx+1) + ' / ' + _gImgs.length;cnt.style.cssText = 'color:rgba(255,255,255,0.5);font-size:12px;margin-bottom:10px;letter-spacing:1px;';_gOv.appendChild(cnt);var wrap = document.createElement('div');wrap.style.cssText = 'position:relative;width:100%;max-width:1000px;background:#000;border-radius:4px;overflow:hidden;';var prev = document.createElement('button');prev.innerHTML = '&#8249;';prev.style.cssText = 'position:absolute;left:10px;top:50%;transform:translateY(-50%);z-index:5;width:44px;height:44px;border-radius:50%;background:rgba(0,0,0,0.6);color:#fff;border:none;cursor:pointer;font-size:28px;display:flex;align-items:center;justify-content:center;';prev.onclick = function(){_gIdx=(_gIdx-1+_gImgs.length)%_gImgs.length;renderGallery();};wrap.appendChild(prev);var img = document.createElement('img');img.src = _gImgs[_gIdx];img.style.cssText = 'width:100%;max-height:75vh;object-fit:contain;display:block;';var ts=0;img.addEventListener('touchstart',function(e){ts=e.touches[0].clientX;},{passive:true});img.addEventListener('touchend',function(e){var d=ts-e.changedTouches[0].clientX;if(Math.abs(d)>40){_gIdx=d>0?(_gIdx+1)%_gImgs.length:(_gIdx-1+_gImgs.length)%_gImgs.length;renderGallery();}},{passive:true});wrap.appendChild(img);var next = document.createElement('button');next.innerHTML = '&#8250;';next.style.cssText = 'position:absolute;right:10px;top:50%;transform:translateY(-50%);z-index:5;width:44px;height:44px;border-radius:50%;background:rgba(0,0,0,0.6);color:#fff;border:none;cursor:pointer;font-size:28px;display:flex;align-items:center;justify-content:center;';next.onclick = function(){_gIdx=(_gIdx+1)%_gImgs.length;renderGallery();};wrap.appendChild(next);_gOv.appendChild(wrap);var tr = document.createElement('div');tr.style.cssText = 'display:flex;gap:6px;padding:12px 0 0;justify-content:center;flex-wrap:wrap;max-width:1000px;width:100%;';_gImgs.forEach(function(src,i){var th = document.createElement('img');th.src = src;th.style.cssText = 'width:58px;height:42px;object-fit:cover;border-radius:3px;cursor:pointer;flex-shrink:0;opacity:'+(i===_gIdx?'1':'0.45')+';outline:'+(i===_gIdx?'2px solid #c5a47e':'none')+';transition:opacity 0.2s;';th.onclick = function(){_gIdx=i;renderGallery();};tr.appendChild(th);});_gOv.appendChild(tr);}function closeGallery(){if(_gOv) _gOv.style.display='none';document.body.style.overflow='';}

// ── WEATHER WIDGET (7-day) ────────────────────────────────────────
(function(){
  var ICONS={0:'☀️',1:'🌤',2:'⛅',3:'☁️',45:'🌫',48:'🌫',51:'🌦',53:'🌦',55:'🌧',61:'🌧',63:'🌧',65:'🌧',71:'❄️',73:'❄️',75:'❄️',80:'🌦',81:'🌧',82:'⛈',85:'🌨',86:'🌨',95:'⛈',96:'⛈',99:'⛈'};
  var API='https://api.open-meteo.com/v1/forecast?latitude=43.64&longitude=15.93&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe%2FZagreb&forecast_days=7';
  function renderWeather(el,d,lang){
    var c=d.current,wc=c.weather_code;
    var isHR=lang==='hr';
    var descs=isHR
      ?{0:'Vedro',1:'Pretežno vedro',2:'Djelomično oblačno',3:'Oblačno',45:'Magla',48:'Magla',51:'Rosulja',53:'Rosulja',55:'Kiša',61:'Lagana kiša',63:'Kiša',65:'Jaka kiša',71:'Lagani snijeg',73:'Snijeg',75:'Jaki snijeg',80:'Pljuskovi',81:'Pljuskovi',82:'Olujni pljuskovi',95:'Grmljavina',96:'Grmljavina',99:'Oluja'}
      :{0:'Clear sky',1:'Mostly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',48:'Fog',51:'Drizzle',53:'Drizzle',55:'Rain',61:'Light rain',63:'Rain',65:'Heavy rain',71:'Light snow',73:'Snow',75:'Heavy snow',80:'Showers',81:'Showers',82:'Thunderstorm',95:'Thunderstorm',96:'Thunderstorm',99:'Storm'};
    var dayNames=isHR?['Ned','Pon','Uto','Sri','Čet','Pet','Sub']:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var todayLabel=isHR?'Danas':'Today';
    var windLabel=isHR?'Vjetar':'Wind';
    var locLabel=isHR?'Grebaštica, Dalmacija':'Grebaštica, Dalmatia';
    var nowHtml='<div class="weather-now">'
      +'<div class="wn-icon">'+(ICONS[wc]||'🌡')+'</div>'
      +'<div class="wn-temp">'+Math.round(c.temperature_2m)+'°C</div>'
      +'<div class="wn-info">'
        +'<span class="wn-desc">'+(descs[wc]||'')+'</span>'
        +'<span class="wn-wind">'+windLabel+' '+Math.round(c.wind_speed_10m)+' km/h</span>'
        +'<span class="wn-loc">'+locLabel+'</span>'
      +'</div>'
      +'</div>';
    var daysHtml='<div class="weather-days">';
    for(var i=0;i<7;i++){
      var date=new Date(d.daily.time[i]+'T12:00:00');
      var dow=date.getDay();
      var isToday=i===0;
      var name=isToday?todayLabel:dayNames[dow];
      var dwc=d.daily.weather_code[i];
      daysHtml+='<div class="weather-day'+(isToday?' wd-today':'')+'"><span class="wd-name">'+name+'</span><span class="wd-icon">'+(ICONS[dwc]||'🌡')+'</span><span class="wd-max">'+Math.round(d.daily.temperature_2m_max[i])+'°</span><span class="wd-min">'+Math.round(d.daily.temperature_2m_min[i])+'°</span></div>';
    }
    daysHtml+='</div>';
    el.innerHTML=nowHtml+daysHtml;
  }
  var elHR=document.getElementById('weather-widget');
  var elEN=document.getElementById('weather-widget-en');
  if(!elHR&&!elEN)return;
  fetch(API)
    .then(function(r){return r.json();})
    .then(function(d){
      if(elHR)renderWeather(elHR,d,'hr');
      if(elEN)renderWeather(elEN,d,'en');
    })
    .catch(function(){
      if(elHR)elHR.innerHTML='<span class="weather-loading">Prognoza nedostupna</span>';
      if(elEN)elEN.innerHTML='<span class="weather-loading">Forecast unavailable</span>';
    });
})();
// ── MAGNETIC BUTTONS ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.nav-cta-btn').forEach(function(btn){
    btn.addEventListener('mousemove',function(e){
      var r=btn.getBoundingClientRect();
      var x=(e.clientX-r.left-r.width/2)*0.35;
      var y=(e.clientY-r.top-r.height/2)*0.35;
      btn.style.transform='translate('+x+'px,'+y+'px)';
    });
    btn.addEventListener('mouseleave',function(){btn.style.transform='';});
  });
});

// ── CONTACT INQUIRY FORM ──────────────────────────────────────────
(function(){
  var form=document.getElementById('inq-form');
  if(!form)return;
  (function(){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';s.onload=function(){emailjs.init('FRj-L3Lly6c4iJahJ');};document.head.appendChild(s);})();
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var btn=document.getElementById('inq-submit');
    var status=document.getElementById('inq-status');
    var data=new FormData(form);
    var name=data.get('inq_name');
    var email=data.get('inq_email');
    var phone=data.get('inq_phone')||'-';
    var guests=data.get('inq_guests')||'-';
    var cin=data.get('inq_cin')||'-';
    var cout=data.get('inq_cout')||'-';
    var msg=data.get('inq_msg')||'';
    var message='Upit s kontakt stranice – TOJO\n---\nIme: '+name+'\nEmail: '+email+'\nTelefon: '+phone+'\nGosti: '+guests+'\nDolazak: '+cin+'\nOdlazak: '+cout+(msg?'\nPoruka: '+msg:'');
    if(btn){btn.disabled=true;btn.textContent='Šaljem...';}
    if(typeof emailjs==='undefined'){
      setTimeout(function(){sendInquiry(name,email,message,btn,status);},1500);
    } else {
      sendInquiry(name,email,message,btn,status);
    }
  });
  function sendInquiry(name,email,message,btn,status){
    emailjs.send('service_l5vtqkh','template_0vnunk7',{name:name,email:email,message:message})
      .then(function(){
        if(status){status.textContent='Upit poslan! Javit ćemo se uskoro.';}
        if(btn){btn.disabled=false;btn.textContent='POŠALJI UPIT';}
        document.getElementById('inq-form').reset();
      })
      .catch(function(){
        if(status){status.textContent='Greška. Nazovite: +385 95 550 2487';}
        if(btn){btn.disabled=false;btn.textContent='POŠALJI UPIT';}
      });
  }
})();

// ── CONTACT INQUIRY FORM (EN) ─────────────────────────────────────
(function(){
  var form=document.getElementById('inq-form-en');
  if(!form)return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var btn=document.getElementById('inq-submit-en');
    var status=document.getElementById('inq-status-en');
    var data=new FormData(form);
    var name=data.get('inq_name');
    var email=data.get('inq_email');
    var phone=data.get('inq_phone')||'-';
    var guests=data.get('inq_guests')||'-';
    var cin=data.get('inq_cin')||'-';
    var cout=data.get('inq_cout')||'-';
    var msg=data.get('inq_msg')||'';
    var message='Inquiry from contact page – TOJO\n---\nName: '+name+'\nEmail: '+email+'\nPhone: '+phone+'\nGuests: '+guests+'\nCheck-in: '+cin+'\nCheck-out: '+cout+(msg?'\nMessage: '+msg:'');
    if(btn){btn.disabled=true;btn.textContent='Sending...';}
    function send(){
      emailjs.send('service_l5vtqkh','template_0vnunk7',{name:name,email:email,message:message})
        .then(function(){
          if(status){status.textContent='Inquiry sent! We\'ll get back to you soon.';}
          if(btn){btn.disabled=false;btn.textContent='SEND INQUIRY';}
          form.reset();
        })
        .catch(function(){
          if(status){status.textContent='Error. Please call: +385 95 550 2487';}
          if(btn){btn.disabled=false;btn.textContent='SEND INQUIRY';}
        });
    }
    if(typeof emailjs==='undefined'){setTimeout(send,1500);}else{send();}
  });
})();