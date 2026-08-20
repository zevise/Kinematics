/* Renders the hub and the topic pages from data/topics.js. */

const esc = s => String(s).replace(/&(?![a-zA-Z#][a-zA-Z0-9]*;)/g,'&amp;').replace(/</g,'&lt;');
const bySlug = s => TOPICS.find(t => t.slug === s);

function chrome(active){
  return `<header class="top"><div class="wrap">
    <a class="brand" href="index.html">Kinematics <span>· Motion in 1D and 2D</span></a>
    <nav>
      <a href="index.html"${active==='home'?' aria-current="page"':''}>Topics</a>
      <a href="sim.html"${active==='sim'?' aria-current="page"':''}>Simulations</a>
      <a href="index.html#how">How to use</a>
    </nav>
  </div></header>`;
}

function footer(){
  return `<footer><div class="wrap">
    HC Verma style course notes for motion in one and two dimensions.
    Worked solutions are hidden behind the reveal buttons, so try each question first.
  </div></footer>`;
}

/* ---------------- hub ---------------- */

function renderIndex(){
  const cards = TOPICS.map(t => `
    <a class="tcard" href="topic.html?t=${t.slug}">
      <div class="num">TOPIC ${String(t.num).padStart(2,'0')}</div>
      <h3>${esc(t.title)}</h3>
      <p>${esc(t.tagline)}</p>
    </a>`).join('');

  const totals = TOPICS.reduce((a,t)=>({
    v:a.v+t.videos.length, e:a.e+t.examples.length,
    x:a.x+t.exercises.length, f:a.f+t.funny.length
  }),{v:0,e:0,x:0,f:0});

  document.body.innerHTML = chrome('home') + `<main class="wrap">
    <h1>Motion in one and two dimensions</h1>
    <p class="lede">Nine topics, each with videos, worked examples, graded practice, a hands-on
    puzzle and an interactive simulation you can drag around. Start anywhere, but the topics
    build on each other in order.</p>

    <div class="cards">${cards}</div>

    <h2 id="how">What is in each topic</h2>
    <div class="card">
      <ul class="keylist">
        <li><strong>${totals.v} video slots</strong>, five per topic, each with a title and a note on what it should cover.</li>
        <li><strong>${totals.e} solved examples</strong>, two per topic, worked line by line.</li>
        <li><strong>${totals.x} exercise questions</strong>, ten per topic: four easy, four medium, two hard. Every one has a full solution behind a reveal button.</li>
        <li><strong>9 practical puzzles</strong>, one per topic, doable with a phone and things you already own.</li>
        <li><strong>${totals.f} classroom ideas</strong>, three per topic, for when attention is slipping.</li>
        <li><strong>9 interactive simulations</strong>, one per topic, also browsable together on the <a href="sim.html">simulations page</a>.</li>
      </ul>
    </div>

    <h2>Adding your videos</h2>
    <div class="card">
      <p class="lede" style="font-size:15px">Every video slot is empty until you paste a YouTube ID.
      Open <code>data/topics.js</code>, find the slot, and fill in its <code>yt</code> field.
      For <code>youtube.com/watch?v=dQw4w9WgXcQ</code> the ID is <code>dQw4w9WgXcQ</code>.
      Solved examples take a video too, using the same field. Nothing else needs changing.</p>
    </div>
  </main>` + footer();
}

/* ---------------- topic page ---------------- */

function videoCard(v){
  const frame = v.yt
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.yt)}"
         title="${esc(v.t)}" loading="lazy" allowfullscreen
         allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"></iframe>`
    : `<div class="todo">No video yet.<br>Add its ID to the <code>yt</code> field in <code>data/topics.js</code>.</div>`;
  return `<div class="vid">
    <div class="frame">${frame}</div>
    <div class="meta"><h3>${esc(v.t)}</h3><p>${esc(v.covers)}</p>
    <div class="len">Suggested length ${esc(v.mins)} min</div></div>
  </div>`;
}

function solution(steps, ans, label){
  return `<details class="sol"><summary>${label}</summary><div class="body">
    <ol>${steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>
    <div class="ans">Answer: ${esc(ans)}</div>
  </div></details>`;
}

function exampleCard(ex,i){
  const vid = ex.yt
    ? `<div class="vid" style="margin-top:12px"><div class="frame">
        <iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(ex.yt)}"
          title="Solution video" loading="lazy" allowfullscreen></iframe></div></div>`
    : '';
  return `<div class="prob">
    <div class="q"><p><span class="qnum">Example ${i+1}.</span>${esc(ex.q)}</p>${vid}</div>
    ${solution(ex.sol, ex.ans, 'Show the worked solution')}
  </div>`;
}

function exerciseCard(q,i){
  return `<div class="prob">
    <div class="q"><p><span class="tag ${q.lv}">${q.lv}</span><span class="qnum">Q${i+1}.</span>${esc(q.q)}</p></div>
    ${solution(q.sol, q.ans, 'Show the solution')}
  </div>`;
}

function renderTopic(){
  const slug = new URLSearchParams(location.search).get('t');
  const t = bySlug(slug) || TOPICS[0];
  const i = TOPICS.indexOf(t);
  const prev = TOPICS[i-1], next = TOPICS[i+1];

  document.title = `${t.title} — Kinematics`;

  const order = ['easy','medium','hard'];
  const sorted = [...t.exercises].sort((a,b)=>order.indexOf(a.lv)-order.indexOf(b.lv));

  document.body.innerHTML = chrome() + `<main class="wrap">
    <div class="crumbs"><a href="index.html">Topics</a> / Topic ${String(t.num).padStart(2,'0')}</div>
    <h1>${esc(t.title)}</h1>
    <p class="lede">${esc(t.summary)}</p>

    <div class="jump">
      <a href="#ideas">Key ideas</a><a href="#sim">Simulation</a><a href="#videos">Videos</a>
      <a href="#examples">Solved examples</a><a href="#exercises">Practice</a>
      <a href="#puzzle">Puzzle</a><a href="#fun">Classroom ideas</a>
    </div>

    <h2 id="ideas">Key ideas</h2>
    <div class="card">
      <ul class="keylist">${t.keyIdeas.map(k=>`<li>${esc(k)}</li>`).join('')}</ul>
      ${t.formulas.map(f=>`<div class="fbox"><div class="f">${f.f}</div><div class="n">${esc(f.n)}</div></div>`).join('')}
    </div>

    <h2 id="sim">Interactive simulation</h2>
    <p class="lede" style="font-size:15px">Drag the sliders and watch the numbers move with the picture.</p>
    <div class="simbox"><iframe src="sim.html?t=${t.sim}" title="${esc(t.title)} simulation" loading="lazy"></iframe></div>

    <h2 id="videos">Videos</h2>
    <div class="cards">${t.videos.map(videoCard).join('')}</div>

    <h2 id="examples">Solved examples</h2>
    ${t.examples.map(exampleCard).join('')}

    <h2 id="exercises">Practice questions</h2>
    <p class="lede" style="font-size:15px">Four easy, four medium, two hard. Work each one out before opening the solution.</p>
    ${sorted.map(exerciseCard).join('')}

    <h2 id="puzzle">Practical puzzle</h2>
    <div class="puzzle">
      <div class="eyebrow">Try this yourself</div>
      <h3 style="margin-top:6px;font-size:19px">${esc(t.puzzle.t)}</h3>
      <p><strong>You need:</strong> ${esc(t.puzzle.setup)}</p>
      <p><strong>Do this:</strong> ${esc(t.puzzle.task)}</p>
      <details class="sol" style="margin-top:12px;border-radius:12px;border-top:1px solid var(--line)">
        <summary>Stuck? Show a hint</summary><div class="body">${esc(t.puzzle.hint)}</div>
      </details>
      <details class="sol" style="border-radius:12px">
        <summary>Show what should happen</summary><div class="body">${esc(t.puzzle.ans)}</div>
      </details>
    </div>

    <h2 id="fun">Classroom ideas</h2>
    <div class="funny">
      ${t.funny.map(f=>`<div class="card"><h3>${esc(f.t)}</h3><p>${esc(f.d)}</p></div>`).join('')}
    </div>

    <div class="pager">
      ${prev?`<a href="topic.html?t=${prev.slug}"><span class="k">Previous</span>${esc(prev.title)}</a>`:'<span></span>'}
      ${next?`<a class="next" href="topic.html?t=${next.slug}"><span class="k">Next</span>${esc(next.title)}</a>`:'<span></span>'}
    </div>
  </main>` + footer();
}
