  // Custom cursor
  const cur=document.getElementById('cur'),curR=document.getElementById('curR');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function loop(){
    rx+=(mx-rx)*.14;ry+=(my-ry)*.14;
    cur.style.left=mx+'px';cur.style.top=my+'px';
    curR.style.left=rx+'px';curR.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.coll-card,.testi').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%) scale(2.2)';curR.style.transform='translate(-50%,-50%) scale(1.6)';});
    el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%) scale(1)';curR.style.transform='translate(-50%,-50%) scale(1)';});
  });

  // Scroll reveal
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // Counter animation
  const cObs=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){
      const t=+e.target.dataset.t;let s=null;
      const step=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/2000,1),ease=1-Math.pow(1-p,3);e.target.textContent=Math.floor(ease*t).toLocaleString('fr');if(p<1)requestAnimationFrame(step);else e.target.textContent=t.toLocaleString('fr');};
      requestAnimationFrame(step);cObs.unobserve(e.target);
    }
  }),{threshold:.5});
  document.querySelectorAll('.stat-n[data-t]').forEach(el=>cObs.observe(el));

  // Form
  const formSuccess={
    fr:'✓ DEMANDE REÇUE — NOUS VOUS CONTACTERONS SOUS 24H',
    en:'✓ REQUEST RECEIVED — WE WILL CONTACT YOU WITHIN 24H',
    de:'✓ ANFRAGE ERHALTEN — WIR MELDEN UNS INNERHALB VON 24H',
    es:'✓ SOLICITUD RECIBIDA — NOS PONDREMOS EN CONTACTO EN 24H',
    it:'✓ RICHIESTA RICEVUTA — VI CONTATTEREMO ENTRO 24H',
  };
  function handleForm(e){
    e.preventDefault();
    const btn=e.target.querySelector('.form-btn');
    btn.textContent=formSuccess[currentLang]||formSuccess.fr;
    btn.style.cssText='background:transparent;border:1px solid rgba(201,168,76,.4);color:#C9A84C;font-family:Cinzel,serif;font-size:11px;letter-spacing:.2em;padding:18px;cursor:none;grid-column:1/-1;';
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'});});
  });

  // Parallax img-break
  const ib=document.querySelector('.img-break img');
  window.addEventListener('scroll',()=>{
    if(!ib)return;
    const r=ib.closest('.img-break').getBoundingClientRect();
    const prog=-(r.top/(window.innerHeight+r.height));
    ib.style.transform=`translateY(${prog*28}%)`;
  },{passive:true});

  // Touch device: disable custom cursor
  if('ontouchstart' in window || navigator.maxTouchPoints > 0){
    document.body.classList.add('touch-device');
  }

  // Hamburger menu
  const navToggle=document.getElementById('navToggle');
  const navLinks=document.getElementById('navLinks');
  if(navToggle && navLinks){
    navToggle.addEventListener('click',()=>{
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow=navLinks.classList.contains('open')?'hidden':'';
    });
    navLinks.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click',()=>{
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow='';
      });
    });
  }

  // ─── I18N ───────────────────────────────────────────────────────────────────

  const i18n={
    fr:{
      'nav.about':"À propos",
      'nav.services':"Nos Services",
      'nav.expertise':"Notre Expertise",
      'nav.values':"Nos Valeurs",
      'nav.contact':"Contact",
      'nav.btn':"NOUS CONTACTER",
      'hero.eyebrow':"Excellence · Authenticité · Prestige",
      'hero.sub':"Plus de 15 ans d'expérience dans l'expertise, le caratage et le commerce international d'or et de diamants.",
      'hero.cta1':"Demander une expertise",
      'hero.cta2':"Nous contacter",
      'hero.scroll':"DÉFILER",
      'stat.years':"ANS D'EXPERTISE",
      'stat.clients':"CLIENTS SATISFAITS",
      'stat.gold':"KG D'OR TRAITÉS",
      'stat.carats':"CARATS DIAMANTS",
      'about.label':"— Notre Maison —",
      'about.title':"L'excellence au service<br>des <em>métaux précieux</em><br>et des pierres rares",
      'about.text':"Depuis plus de quinze ans, notre activité s'inscrit au cœur du secteur des métaux précieux et des pierres d'exception. Spécialisés dans l'expertise de bijoux, le caratage ainsi que le commerce international d'or et de diamants, nous mettons notre savoir-faire et notre expérience au service d'une clientèle exigeante.<br><br>Chaque pièce confiée fait l'objet d'une analyse rigoureuse permettant d'en déterminer l'authenticité, la pureté et la valeur. Grâce à une expertise approfondie et à des méthodes de caratage précises, nous garantissons des évaluations fiables conformes aux standards internationaux du marché des pierres précieuses et des métaux nobles.<br><br>Notre activité s'étend également au commerce international et aux opérations d'import-export d'or et de diamants. À travers un réseau de partenaires et de fournisseurs à l'international, nous facilitons des transactions sécurisées et confidentielles, tout en offrant une vision stratégique des opportunités du marché.<br><br>Fondé sur la discrétion, la rigueur et l'excellence, notre engagement est d'accompagner chaque client avec professionnalisme dans l'expertise, l'acquisition, la valorisation et la commercialisation de biens précieux.",
      'about.role':"FONDATEUR & DIRECTEUR GÉNÉRAL · Damien Gold & Diamond",
      'coll.label':"— Nos Services —",
      'coll.title':"Métaux &amp; Pierres <em>d'Exception</em>",
      'card1.name':"EXPERTISE DE BIJOUX",
      'card1.desc':"Nous réalisons une expertise complète de vos bijoux afin d'en déterminer l'authenticité, l'état, la provenance et la valeur sur le marché. Chaque analyse est effectuée avec rigueur selon les standards professionnels.",
      'card1.badge':"DISPONIBLE",
      'card2.name':"CARATAGE",
      'card2.desc':"Nous procédons au caratage précis de vos diamants et pierres précieuses afin d'évaluer leur pureté, leur poids et leur qualité. Nos méthodes respectent les normes internationales du secteur.",
      'card2.badge':"DISPONIBLE",
      'card3.name':"ACHAT & VENTE",
      'card3.desc':"Nous accompagnons nos clients dans l'achat et la vente d'or, de diamants et de bijoux de valeur. Nous garantissons des transactions fiables, transparentes et adaptées aux conditions du marché.",
      'card3.badge':"SUR DEMANDE",
      'card4.name':"IMPORT - EXPORT",
      'card4.desc':"Grâce à notre réseau international, nous facilitons les opérations d'import-export d'or et de diamants en toute sécurité. Nous assurons un accompagnement stratégique et confidentiel pour chaque transaction.",
      'card4.badge':"SUR RDV",
      'quote.text':"« L'or n'est pas seulement une matière précieuse —<br>c'est la mémoire du temps et la valeur de la confiance. »",
      'contact.label':"— Prendre Contact —",
      'contact.title':"Commençons Votre<br><em>Consultation Privée</em>",
      'contact.sub':"Remplissez ce formulaire. L'un de nos experts vous contactera sous 24h pour organiser votre rendez-vous confidentiel.",
      'form.name':"PRÉNOM & NOM",
      'form.phone':"TÉLÉPHONE",
      'form.email':"EMAIL",
      'form.interest':"CENTRE D'INTÉRÊT",
      'form.message':"VOTRE MESSAGE",
      'form.ph.name':"Votre nom complet",
      'form.ph.email':"votre@email.com",
      'form.ph.message':"Décrivez votre projet ou votre besoin...",
      'form.select.default':"Sélectionner...",
      'form.select.opt1':"Or en Lingots",
      'form.select.opt2':"Diamants Certifiés GIA",
      'form.select.opt3':"Bijoux en Or",
      'form.select.opt4':"Or d'Investissement",
      'form.select.opt5':"Expertise / Rachat",
      'form.select.opt6':"Pierres Précieuses",
      'form.btn':"ENVOYER MA DEMANDE CONFIDENTIELLE →",
      'ci.addr':"ADRESSE",
      'ci.phone':"TÉLÉPHONE",
      'ci.hours':"HORAIRES",
      'ci.hours.val':"Lun–Sam&nbsp;|&nbsp;09h – 18h",
      'ci.email':"EMAIL",
      'footer.copy':"Damien Gold & Diamond · Or & Diamants de Prestige",
    },
    en:{
      'nav.about':"About",
      'nav.services':"Our Services",
      'nav.expertise':"Our Expertise",
      'nav.values':"Our Values",
      'nav.contact':"Contact",
      'nav.btn':"CONTACT US",
      'hero.eyebrow':"Excellence · Authenticity · Prestige",
      'hero.sub':"Over 15 years of experience in appraisal, carat grading, and international trade of gold and diamonds.",
      'hero.cta1':"Request an appraisal",
      'hero.cta2':"Contact us",
      'hero.scroll':"SCROLL",
      'stat.years':"YEARS OF EXPERTISE",
      'stat.clients':"SATISFIED CLIENTS",
      'stat.gold':"KG OF GOLD PROCESSED",
      'stat.carats':"DIAMOND CARATS",
      'about.label':"— Our House —",
      'about.title':"Excellence in service<br>of <em>precious metals</em><br>and rare stones",
      'about.text':"For over fifteen years, our business has been at the heart of the precious metals and exceptional gemstones sector. Specialising in jewellery appraisal, carat grading, and the international trade of gold and diamonds, we put our expertise and experience at the service of a discerning clientele.<br><br>Each piece entrusted to us undergoes rigorous analysis to determine its authenticity, purity, and market value. Through in-depth expertise and precise grading methods, we guarantee reliable assessments in line with international standards for the precious stone and noble metals market.<br><br>Our business also extends to international commerce and import-export operations of gold and diamonds. Through a network of international partners and suppliers, we facilitate secure and confidential transactions, while offering a strategic overview of market opportunities.<br><br>Built on discretion, rigour, and excellence, our commitment is to accompany each client professionally in the appraisal, acquisition, valuation, and commercialisation of precious assets.",
      'about.role':"FOUNDER & CEO · Damien Gold & Diamond",
      'coll.label':"— Our Services —",
      'coll.title':"Metals &amp; <em>Exceptional</em> Stones",
      'card1.name':"JEWELLERY APPRAISAL",
      'card1.desc':"We carry out a complete appraisal of your jewellery to determine its authenticity, condition, provenance, and market value. Each analysis is conducted with rigour according to professional standards.",
      'card1.badge':"AVAILABLE",
      'card2.name':"CARAT GRADING",
      'card2.desc':"We carry out precise carat grading of your diamonds and precious stones to assess their purity, weight, and quality. Our methods comply with international industry standards.",
      'card2.badge':"AVAILABLE",
      'card3.name':"BUY & SELL",
      'card3.desc':"We guide our clients through the purchase and sale of gold, diamonds, and valuable jewellery. We guarantee reliable, transparent transactions adapted to current market conditions.",
      'card3.badge':"ON REQUEST",
      'card4.name':"IMPORT - EXPORT",
      'card4.desc':"Through our international network, we facilitate import-export operations of gold and diamonds with complete security. We provide strategic and confidential guidance for each transaction.",
      'card4.badge':"BY APPOINTMENT",
      'quote.text':"« Gold is not merely a precious material —<br>it is the memory of time and the value of trust. »",
      'contact.label':"— Get in Touch —",
      'contact.title':"Let's Begin Your<br><em>Private Consultation</em>",
      'contact.sub':"Fill in this form. One of our experts will contact you within 24 hours to arrange your confidential appointment.",
      'form.name':"FIRST & LAST NAME",
      'form.phone':"PHONE",
      'form.email':"EMAIL",
      'form.interest':"AREA OF INTEREST",
      'form.message':"YOUR MESSAGE",
      'form.ph.name':"Your full name",
      'form.ph.email':"your@email.com",
      'form.ph.message':"Describe your project or need...",
      'form.select.default':"Select...",
      'form.select.opt1':"Gold Bars",
      'form.select.opt2':"GIA Certified Diamonds",
      'form.select.opt3':"Gold Jewellery",
      'form.select.opt4':"Investment Gold",
      'form.select.opt5':"Appraisal / Buy-Back",
      'form.select.opt6':"Precious Stones",
      'form.btn':"SEND MY CONFIDENTIAL REQUEST →",
      'ci.addr':"ADDRESS",
      'ci.phone':"PHONE",
      'ci.hours':"HOURS",
      'ci.hours.val':"Mon–Sat&nbsp;|&nbsp;9am – 6pm",
      'ci.email':"EMAIL",
      'footer.copy':"Damien Gold & Diamond · Gold & Prestigious Diamonds",
    },
    de:{
      'nav.about':"Über uns",
      'nav.services':"Unsere Dienste",
      'nav.expertise':"Unsere Expertise",
      'nav.values':"Unsere Werte",
      'nav.contact':"Kontakt",
      'nav.btn':"KONTAKT",
      'hero.eyebrow':"Exzellenz · Authentizität · Prestige",
      'hero.sub':"Mehr als 15 Jahre Erfahrung in der Bewertung, Karatierung und im internationalen Handel mit Gold und Diamanten.",
      'hero.cta1':"Expertise anfragen",
      'hero.cta2':"Kontakt aufnehmen",
      'hero.scroll':"SCROLLEN",
      'stat.years':"JAHRE ERFAHRUNG",
      'stat.clients':"ZUFRIEDENE KUNDEN",
      'stat.gold':"KG VERARBEITETES GOLD",
      'stat.carats':"DIAMANT-KARAT",
      'about.label':"— Unser Haus —",
      'about.title':"Exzellenz im Dienst<br>der <em>Edelmetalle</em><br>und seltenen Steine",
      'about.text':"Seit mehr als fünfzehn Jahren ist unser Unternehmen im Bereich der Edelmetalle und außergewöhnlichen Edelsteine tätig. Spezialisiert auf Schmuckbewertung, Karatierung sowie den internationalen Handel mit Gold und Diamanten, stellen wir unser Fachwissen und unsere Erfahrung in den Dienst einer anspruchsvollen Kundschaft.<br><br>Jedes uns anvertraute Stück wird einer strengen Analyse unterzogen, um Authentizität, Reinheit und Marktwert zu bestimmen. Durch fundierte Expertise und präzise Karatierungsmethoden garantieren wir zuverlässige Bewertungen gemäß internationaler Standards des Edelstein- und Edelmetallmarktes.<br><br>Unser Unternehmen ist auch im internationalen Handel sowie bei Import-Export-Operationen von Gold und Diamanten tätig. Durch ein Netzwerk internationaler Partner und Lieferanten ermöglichen wir sichere und vertrauliche Transaktionen und bieten eine strategische Übersicht der Marktchancen.<br><br>Gegründet auf Diskretion, Strenge und Exzellenz ist es unser Engagement, jeden Kunden professionell bei der Bewertung, dem Erwerb, der Verwertung und der Vermarktung von Wertgegenständen zu begleiten.",
      'about.role':"GRÜNDER & GESCHÄFTSFÜHRER · Damien Gold & Diamond",
      'coll.label':"— Unsere Dienste —",
      'coll.title':"Metalle &amp; <em>Außergewöhnliche</em> Steine",
      'card1.name':"SCHMUCKBEWERTUNG",
      'card1.desc':"Wir führen eine vollständige Bewertung Ihres Schmucks durch, um Authentizität, Zustand, Herkunft und Marktwert zu bestimmen. Jede Analyse wird mit Sorgfalt nach professionellen Standards durchgeführt.",
      'card1.badge':"VERFÜGBAR",
      'card2.name':"KARATIERUNG",
      'card2.desc':"Wir führen die präzise Karatierung Ihrer Diamanten und Edelsteine durch, um ihre Reinheit, ihr Gewicht und ihre Qualität zu bewerten. Unsere Methoden entsprechen den internationalen Branchenstandards.",
      'card2.badge':"VERFÜGBAR",
      'card3.name':"KAUF & VERKAUF",
      'card3.desc':"Wir begleiten unsere Kunden beim Kauf und Verkauf von Gold, Diamanten und wertvollen Schmuckstücken. Wir garantieren zuverlässige, transparente Transaktionen gemäß den aktuellen Marktbedingungen.",
      'card3.badge':"AUF ANFRAGE",
      'card4.name':"IMPORT - EXPORT",
      'card4.desc':"Durch unser internationales Netzwerk erleichtern wir Import-Export-Operationen von Gold und Diamanten in vollständiger Sicherheit. Wir bieten eine strategische und vertrauliche Begleitung für jede Transaktion.",
      'card4.badge':"NACH TERMIN",
      'quote.text':"« Gold ist nicht nur ein wertvoller Stoff —<br>es ist die Erinnerung der Zeit und der Wert des Vertrauens. »",
      'contact.label':"— Kontakt aufnehmen —",
      'contact.title':"Beginnen wir Ihre<br><em>Private Beratung</em>",
      'contact.sub':"Füllen Sie dieses Formular aus. Einer unserer Experten wird Sie innerhalb von 24 Stunden kontaktieren, um Ihren vertraulichen Termin zu vereinbaren.",
      'form.name':"VOR- & NACHNAME",
      'form.phone':"TELEFON",
      'form.email':"E-MAIL",
      'form.interest':"INTERESSENBEREICH",
      'form.message':"IHRE NACHRICHT",
      'form.ph.name':"Ihr vollständiger Name",
      'form.ph.email':"ihre@email.de",
      'form.ph.message':"Beschreiben Sie Ihr Projekt oder Anliegen...",
      'form.select.default':"Auswählen...",
      'form.select.opt1':"Goldbarren",
      'form.select.opt2':"GIA-zertifizierte Diamanten",
      'form.select.opt3':"Goldschmuck",
      'form.select.opt4':"Anlagegold",
      'form.select.opt5':"Expertise / Rückkauf",
      'form.select.opt6':"Edelsteine",
      'form.btn':"MEINE VERTRAULICHE ANFRAGE SENDEN →",
      'ci.addr':"ADRESSE",
      'ci.phone':"TELEFON",
      'ci.hours':"ÖFFNUNGSZEITEN",
      'ci.hours.val':"Mo–Sa&nbsp;|&nbsp;9–18 Uhr",
      'ci.email':"E-MAIL",
      'footer.copy':"Damien Gold & Diamond · Gold & Diamanten von Prestige",
    },
    it:{
      'nav.about':"Chi siamo",
      'nav.services':"I Nostri Servizi",
      'nav.expertise':"La Nostra Esperienza",
      'nav.values':"I Nostri Valori",
      'nav.contact':"Contatto",
      'nav.btn':"CONTATTACI",
      'hero.eyebrow':"Eccellenza · Autenticità · Prestigio",
      'hero.sub':"Oltre 15 anni di esperienza nella valutazione, carataggio e commercio internazionale di oro e diamanti.",
      'hero.cta1':"Richiedere una perizia",
      'hero.cta2':"Contattaci",
      'hero.scroll':"SCORRERE",
      'stat.years':"ANNI DI ESPERIENZA",
      'stat.clients':"CLIENTI SODDISFATTI",
      'stat.gold':"KG D'ORO LAVORATO",
      'stat.carats':"CARATI DI DIAMANTI",
      'about.label':"— La Nostra Casa —",
      'about.title':"L'eccellenza al servizio<br>dei <em>metalli preziosi</em><br>e delle pietre rare",
      'about.text':"Da oltre quindici anni, la nostra attività è al centro del settore dei metalli preziosi e delle pietre di eccezione. Specializzati nella perizia di gioielli, nel carataggio e nel commercio internazionale di oro e diamanti, mettiamo il nostro know-how e la nostra esperienza al servizio di una clientela esigente.<br><br>Ogni pezzo affidatoci viene sottoposto a un'analisi rigorosa per determinarne autenticità, purezza e valore di mercato. Grazie a una profonda esperienza e a metodi di carataggio precisi, garantiamo valutazioni affidabili conformi agli standard internazionali del mercato delle pietre preziose e dei metalli nobili.<br><br>La nostra attività si estende anche al commercio internazionale e alle operazioni di import-export di oro e diamanti. Attraverso una rete di partner e fornitori internazionali, facilitiamo transazioni sicure e riservate, offrendo al contempo una visione strategica delle opportunità di mercato.<br><br>Fondato sulla discrezione, il rigore e l'eccellenza, il nostro impegno è accompagnare ogni cliente con professionalità nella perizia, nell'acquisizione, nella valorizzazione e nella commercializzazione di beni preziosi.",
      'about.role':"FONDATORE & DIRETTORE GENERALE · Damien Gold & Diamond",
      'coll.label':"— I Nostri Servizi —",
      'coll.title':"Metalli &amp; Pietre <em>d'Eccezione</em>",
      'card1.name':"PERIZIA DI GIOIELLI",
      'card1.desc':"Realizziamo una perizia completa dei vostri gioielli per determinarne autenticità, stato, provenienza e valore di mercato. Ogni analisi viene effettuata con rigore secondo gli standard professionali.",
      'card1.badge':"DISPONIBILE",
      'card2.name':"CARATAGGIO",
      'card2.desc':"Procediamo al carataggio preciso dei vostri diamanti e pietre preziose per valutarne purezza, peso e qualità. I nostri metodi rispettano le norme internazionali del settore.",
      'card2.badge':"DISPONIBILE",
      'card3.name':"ACQUISTO & VENDITA",
      'card3.desc':"Accompagniamo i nostri clienti nell'acquisto e nella vendita di oro, diamanti e gioielli di valore. Garantiamo transazioni affidabili, trasparenti e adattate alle condizioni attuali del mercato.",
      'card3.badge':"SU RICHIESTA",
      'card4.name':"IMPORT - EXPORT",
      'card4.desc':"Grazie alla nostra rete internazionale, facilitiamo le operazioni di import-export di oro e diamanti in totale sicurezza. Offriamo un accompagnamento strategico e riservato per ogni transazione.",
      'card4.badge':"SU APPUNTAMENTO",
      'quote.text':"« L'oro non è solo una materia preziosa —<br>è la memoria del tempo e il valore della fiducia. »",
      'contact.label':"— Prendere Contatto —",
      'contact.title':"Iniziamo la Vostra<br><em>Consulenza Privata</em>",
      'contact.sub':"Compilate questo modulo. Uno dei nostri esperti vi contatterà entro 24 ore per organizzare il vostro appuntamento riservato.",
      'form.name':"NOME E COGNOME",
      'form.phone':"TELEFONO",
      'form.email':"EMAIL",
      'form.interest':"AREA DI INTERESSE",
      'form.message':"IL VOSTRO MESSAGGIO",
      'form.ph.name':"Il vostro nome completo",
      'form.ph.email':"vostro@email.it",
      'form.ph.message':"Descrivete il vostro progetto o esigenza...",
      'form.select.default':"Selezionare...",
      'form.select.opt1':"Oro in Lingotti",
      'form.select.opt2':"Diamanti Certificati GIA",
      'form.select.opt3':"Gioielli in Oro",
      'form.select.opt4':"Oro da Investimento",
      'form.select.opt5':"Perizia / Riacquisto",
      'form.select.opt6':"Pietre Preziose",
      'form.btn':"INVIARE LA MIA RICHIESTA RISERVATA →",
      'ci.addr':"INDIRIZZO",
      'ci.phone':"TELEFONO",
      'ci.hours':"ORARI",
      'ci.hours.val':"Lun–Sab&nbsp;|&nbsp;9h – 18h",
      'ci.email':"EMAIL",
      'footer.copy':"Damien Gold & Diamond · Oro & Diamanti di Prestigio",
    },
    es:{
      'nav.about':"Sobre nosotros",
      'nav.services':"Nuestros Servicios",
      'nav.expertise':"Nuestra Experiencia",
      'nav.values':"Nuestros Valores",
      'nav.contact':"Contacto",
      'nav.btn':"CONTÁCTENOS",
      'hero.eyebrow':"Excelencia · Autenticidad · Prestigio",
      'hero.sub':"Más de 15 años de experiencia en tasación, quilataje y comercio internacional de oro y diamantes.",
      'hero.cta1':"Solicitar una tasación",
      'hero.cta2':"Contáctenos",
      'hero.scroll':"DESPLAZAR",
      'stat.years':"AÑOS DE EXPERIENCIA",
      'stat.clients':"CLIENTES SATISFECHOS",
      'stat.gold':"KG DE ORO PROCESADO",
      'stat.carats':"QUILATES DE DIAMANTE",
      'about.label':"— Nuestra Casa —",
      'about.title':"La excelencia al servicio<br>de los <em>metales preciosos</em><br>y las piedras raras",
      'about.text':"Desde hace más de quince años, nuestra actividad está en el corazón del sector de los metales preciosos y las piedras de excepción. Especializados en tasación de joyas, quilataje y comercio internacional de oro y diamantes, ponemos nuestro conocimiento y experiencia al servicio de una clientela exigente.<br><br>Cada pieza que nos confían se somete a un análisis riguroso para determinar su autenticidad, pureza y valor de mercado. Gracias a una experiencia profunda y a métodos de quilataje precisos, garantizamos evaluaciones fiables conformes a los estándares internacionales del mercado de piedras preciosas y metales nobles.<br><br>Nuestra actividad también se extiende al comercio internacional y a las operaciones de importación-exportación de oro y diamantes. A través de una red de socios y proveedores internacionales, facilitamos transacciones seguras y confidenciales, ofreciendo al mismo tiempo una visión estratégica de las oportunidades del mercado.<br><br>Fundado en la discreción, el rigor y la excelencia, nuestro compromiso es acompañar a cada cliente con profesionalismo en la tasación, adquisición, valorización y comercialización de bienes preciosos.",
      'about.role':"FUNDADOR & DIRECTOR GENERAL · Damien Gold & Diamond",
      'coll.label':"— Nuestros Servicios —",
      'coll.title':"Metales &amp; Piedras <em>de Excepción</em>",
      'card1.name':"TASACIÓN DE JOYAS",
      'card1.desc':"Realizamos una tasación completa de sus joyas para determinar su autenticidad, estado, procedencia y valor de mercado. Cada análisis se lleva a cabo con rigor según los estándares profesionales.",
      'card1.badge':"DISPONIBLE",
      'card2.name':"QUILATAJE",
      'card2.desc':"Procedemos al quilataje preciso de sus diamantes y piedras preciosas para evaluar su pureza, peso y calidad. Nuestros métodos cumplen con las normas internacionales del sector.",
      'card2.badge':"DISPONIBLE",
      'card3.name':"COMPRA & VENTA",
      'card3.desc':"Acompañamos a nuestros clientes en la compra y venta de oro, diamantes y joyas de valor. Garantizamos transacciones fiables, transparentes y adaptadas a las condiciones actuales del mercado.",
      'card3.badge':"BAJO PEDIDO",
      'card4.name':"IMPORTACIÓN - EXPORTACIÓN",
      'card4.desc':"Gracias a nuestra red internacional, facilitamos las operaciones de importación-exportación de oro y diamantes con total seguridad. Ofrecemos un acompañamiento estratégico y confidencial para cada transacción.",
      'card4.badge':"CON CITA PREVIA",
      'quote.text':"« El oro no es solo una materia preciosa —<br>es la memoria del tiempo y el valor de la confianza. »",
      'contact.label':"— Ponerse en Contacto —",
      'contact.title':"Comencemos su<br><em>Consulta Privada</em>",
      'contact.sub':"Rellene este formulario. Uno de nuestros expertos le contactará en 24 horas para organizar su cita confidencial.",
      'form.name':"NOMBRE Y APELLIDO",
      'form.phone':"TELÉFONO",
      'form.email':"CORREO ELECTRÓNICO",
      'form.interest':"ÁREA DE INTERÉS",
      'form.message':"SU MENSAJE",
      'form.ph.name':"Su nombre completo",
      'form.ph.email':"su@correo.com",
      'form.ph.message':"Describa su proyecto o necesidad...",
      'form.select.default':"Seleccionar...",
      'form.select.opt1':"Oro en Lingotes",
      'form.select.opt2':"Diamantes Certificados GIA",
      'form.select.opt3':"Joyas de Oro",
      'form.select.opt4':"Oro de Inversión",
      'form.select.opt5':"Tasación / Recompra",
      'form.select.opt6':"Piedras Preciosas",
      'form.btn':"ENVIAR MI SOLICITUD CONFIDENCIAL →",
      'ci.addr':"DIRECCIÓN",
      'ci.phone':"TELÉFONO",
      'ci.hours':"HORARIO",
      'ci.hours.val':"Lun–Sáb&nbsp;|&nbsp;9h – 18h",
      'ci.email':"CORREO",
      'footer.copy':"Damien Gold & Diamond · Oro & Diamantes de Prestigio",
    },
  };

  let currentLang='fr';

  function applyLang(lang){
    const t=i18n[lang];
    if(!t)return;
    currentLang=lang;
    document.documentElement.lang=lang;

    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const v=t[el.dataset.i18n];
      if(v!==undefined)el.textContent=v;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el=>{
      const v=t[el.dataset.i18nHtml];
      if(v!==undefined)el.innerHTML=v;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const v=t[el.dataset.i18nPlaceholder];
      if(v!==undefined)el.placeholder=v;
    });

    const sel=document.getElementById('langSelect');
    if(sel)sel.value=lang;
  }

  const langSelect=document.getElementById('langSelect');
  if(langSelect){
    langSelect.addEventListener('change',()=>{
      localStorage.setItem('lang', langSelect.value);
      applyLang(langSelect.value);
    });
  }

  // Détection automatique de la langue
  function detectLang(){
    // 1. Préférence sauvegardée par l'utilisateur
    const saved=localStorage.getItem('lang');
    if(saved && i18n[saved]) return saved;

    // 2. Langue du navigateur (ex: "fr-FR", "it-IT", "de-DE")
    const browser=(navigator.language || navigator.userLanguage || 'fr').substring(0,2).toLowerCase();
    return i18n[browser] ? browser : 'fr';
  }

  document.getElementById('footer-year').textContent = new Date().getFullYear();

  applyLang(detectLang());
