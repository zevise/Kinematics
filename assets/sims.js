/* Kinematics simulations.
   Each scene owns its controls, its physics, and its drawing. The shell below
   handles the canvas, the animation clock, and the tab bar. */

/* ---------- theme-aware colours (read from the stylesheet) ---------- */
const CSS = getComputedStyle(document.documentElement);
const C = k => CSS.getPropertyValue(k).trim();
let COL = {};
function readColours(){
  COL = {
    fg:C('--fg'), dim:C('--dim'), faint:C('--faint'), line:C('--line'),
    panel:C('--panel2'), accent:C('--accent'), accent2:C('--accent2'),
    good:C('--good'), hard:C('--hard'), bg:C('--bg')
  };
}
readColours();
matchMedia('(prefers-color-scheme:dark)').addEventListener('change',()=>{readColours();draw();});

const G = 9.8;
const rad = d => d*Math.PI/180;
const clamp = (x,a,b) => Math.max(a,Math.min(b,x));
const fx = (x,n=2) => (x<0?'':'+') + x.toFixed(n);

/* ---------- drawing helpers ---------- */

function arrow(ctx,x1,y1,x2,y2,color,width=2.5,head=8){
  const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy);
  if(L<1.5) return;
  const ux=dx/L, uy=dy/L;
  ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=width; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2-ux*head*0.9,y2-uy*head*0.9); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2,y2);
  ctx.lineTo(x2-ux*head-uy*head*0.55, y2-uy*head+ux*head*0.55);
  ctx.lineTo(x2-ux*head+uy*head*0.55, y2-uy*head-ux*head*0.55);
  ctx.closePath(); ctx.fill();
}

function label(ctx,text,x,y,color,size=12,align='center',weight=''){
  ctx.fillStyle=color; ctx.textAlign=align; ctx.textBaseline='middle';
  ctx.font=`${weight} ${size}px ui-sans-serif,system-ui,Arial`;
  ctx.fillText(text,x,y);
  ctx.textAlign='left'; ctx.textBaseline='alphabetic';
}

/* A metre-stick track with ticks. Returns a metres -> pixels mapper. */
function track(ctx,W,H,y,xmin,xmax,tick){
  const padL=44, padR=28, w=W-padL-padR;
  const px = m => padL + (m-xmin)/(xmax-xmin)*w;
  ctx.strokeStyle=COL.line; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(W-padR,y); ctx.stroke();
  for(let m=Math.ceil(xmin/tick)*tick; m<=xmax+1e-9; m+=tick){
    const x=px(m);
    ctx.strokeStyle=COL.line; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(x,y-5); ctx.lineTo(x,y+5); ctx.stroke();
    label(ctx, (Math.abs(m)<1e-9?0:+m.toFixed(1))+'', x, y+17, COL.faint, 11);
  }
  return px;
}

function ball(ctx,x,y,color,r=11,text){
  ctx.fillStyle=color; ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill();
  if(text) label(ctx,text,x,y,COL.bg,11,'center','bold');
}

/* Cartesian plot panel. Returns {X, Y} mappers plus the pixel box. */
function plot(ctx,box,xr,yr,xlabel,ylabel){
  const {x,y,w,h}=box, padL=40, padB=26, padT=16, padR=12;
  ctx.fillStyle=COL.panel; ctx.strokeStyle=COL.line; ctx.lineWidth=1;
  roundRect(ctx,x,y,w,h,12); ctx.fill(); ctx.stroke();

  const ix=x+padL, iy=y+padT, iw=w-padL-padR, ih=h-padT-padB;
  const X = v => ix + (v-xr[0])/(xr[1]-xr[0])*iw;
  const Y = v => iy + ih - (v-yr[0])/(yr[1]-yr[0])*ih;

  // zero lines / axes
  ctx.strokeStyle=COL.line;
  ctx.beginPath(); ctx.moveTo(ix,iy); ctx.lineTo(ix,iy+ih); ctx.lineTo(ix+iw,iy+ih); ctx.stroke();
  if(yr[0]<0 && yr[1]>0){
    ctx.setLineDash([3,4]); ctx.strokeStyle=COL.line;
    ctx.beginPath(); ctx.moveTo(ix,Y(0)); ctx.lineTo(ix+iw,Y(0)); ctx.stroke(); ctx.setLineDash([]);
  }
  label(ctx,yr[1].toFixed(1),ix-6,iy+4,COL.faint,10,'right');
  label(ctx,yr[0].toFixed(1),ix-6,iy+ih-4,COL.faint,10,'right');
  label(ctx,xr[1].toFixed(1),ix+iw,iy+ih+12,COL.faint,10,'right');
  label(ctx,xlabel,ix+iw/2,iy+ih+15,COL.faint,11);
  ctx.save(); ctx.translate(x+12,iy+ih/2); ctx.rotate(-Math.PI/2);
  label(ctx,ylabel,0,0,COL.faint,11); ctx.restore();
  return {X,Y,ix,iy,iw,ih};
}

function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
}

function curve(ctx,P,f,t0,t1,color,width=2.5,n=160){
  ctx.strokeStyle=color; ctx.lineWidth=width; ctx.lineJoin='round'; ctx.beginPath();
  for(let i=0;i<=n;i++){
    const t=t0+(t1-t0)*i/n, X=P.X(t), Y=clamp(P.Y(f(t)),P.iy-2,P.iy+P.ih+2);
    i?ctx.lineTo(X,Y):ctx.moveTo(X,Y);
  }
  ctx.stroke();
}

/* ---------- the nine scenes ---------- */

const SCENES = {

/* 1 ------------------------------------------------------------------ */
rest:{
  title:'Rest and motion',
  blurb:'A body is at rest only with respect to some observer. Put a passenger inside a moving train and the same passenger is motionless for the train and moving for the platform.',
  formula:'v<sub>P/ground</sub> = v<sub>P/train</sub> + v<sub>train/ground</sub>',
  controls:[
    {id:'vt',label:'Train velocity (w.r.t. ground)',min:-8,max:8,step:.1,val:4,unit:' m/s'},
    {id:'vp',label:'Passenger velocity (w.r.t. train)',min:-3,max:3,step:.1,val:0,unit:' m/s'},
    {id:'obs',type:'seg',label:'Watch from',options:[['g','Platform'],['t','Train']],val:'g'}
  ],
  period:()=>8,
  draw(ctx,W,H,t,v){
    const vt=+v.vt, vp=+v.vp, ground=v.obs==='g';
    const vTrainSeen = ground ? vt : 0;
    const vPassSeen  = ground ? vt+vp : vp;

    const y=H*0.62, px=track(ctx,W,H,y,-20,20,5);
    const wrap = (x)=>{ const span=40; return ((x+20)%span+span)%span-20; };

    // train body
    const tx = px(wrap(vTrainSeen*t));
    const tw = 168, th = 62;
    ctx.fillStyle=COL.panel; ctx.strokeStyle=COL.accent; ctx.lineWidth=2;
    roundRect(ctx,tx-tw/2,y-th-6,tw,th,12); ctx.fill(); ctx.stroke();
    ctx.fillStyle=COL.line;
    ctx.beginPath(); ctx.arc(tx-tw/2+34,y-4,9,0,7); ctx.arc(tx+tw/2-34,y-4,9,0,7); ctx.fill();
    label(ctx,'TRAIN',tx,y-th+8,COL.accent,11,'center','bold');

    // passenger, sliding inside the carriage
    const inside = clamp(((vp*t+30)%60)-30, -tw/2+26, tw/2-26);
    ball(ctx, tx+inside, y-30, COL.accent2, 12, 'P');

    // observer marker on the platform
    ball(ctx, px(-17), y-16, ground?COL.good:COL.line, 9);
    label(ctx,'observer', px(-17), y-34, ground?COL.good:COL.faint, 11);
    if(!ground) label(ctx,'observer', tx, y-th-20, COL.good, 11);

    arrow(ctx,tx,y+34,tx+clamp(vTrainSeen*9,-70,70),y+34,COL.accent,3);
    label(ctx,'v train = '+fx(vTrainSeen,1)+' m/s', tx, y+50, COL.dim, 11);
  },
  stats(t,v){
    const vt=+v.vt, vp=+v.vp, ground=v.obs==='g';
    const seen = ground ? vt+vp : vp;
    return [
      ['Passenger w.r.t. ground', fx(vt+vp,1)+' m/s'],
      ['Passenger w.r.t. train', fx(vp,1)+' m/s'],
      [ground?'Seen from platform':'Seen from train',
        Math.abs(seen)<0.05 ? 'at rest' : 'moving at '+fx(seen,1)+' m/s']
    ];
  },
  note:'Set the passenger to 0 m/s. The passenger is at rest for the train and moving for the platform, at the same instant. Neither observer is wrong.'
},

/* 2 ------------------------------------------------------------------ */
distance:{
  title:'Distance and displacement',
  blurb:'The particle walks forward, then walks back. Distance adds both legs. Displacement only cares where it started and where it stopped.',
  formula:'s = L<sub>1</sub> + L<sub>2</sub> &nbsp;&nbsp;|&nbsp;&nbsp; Δx = L<sub>1</sub> − L<sub>2</sub> &nbsp;&nbsp;|&nbsp;&nbsp; s ≥ |Δx|',
  controls:[
    {id:'l1',label:'Forward leg L₁',min:0,max:12,step:.1,val:8,unit:' m'},
    {id:'l2',label:'Backward leg L₂',min:0,max:12,step:.1,val:5,unit:' m'}
  ],
  period:()=>6,
  pos(t,l1,l2){ // 3 s out, 3 s back
    return t<3 ? l1*(t/3) : l1 - l2*((t-3)/3);
  },
  draw(ctx,W,H,t,v){
    const l1=+v.l1, l2=+v.l2, end=l1-l2;
    const lo=Math.min(0,end,l1)-1.5, hi=Math.max(0,end,l1)+1.5;
    const y=H*0.55, px=track(ctx,W,H,y,lo,hi,Math.max(1,Math.round((hi-lo)/8)));

    // the two legs, drawn as stacked arcs above the line
    arrow(ctx,px(0),y-30,px(l1),y-30,COL.accent,2.5);
    label(ctx,'L₁ = '+l1.toFixed(1)+' m',(px(0)+px(l1))/2,y-44,COL.accent,12);
    arrow(ctx,px(l1),y-62,px(l1-l2),y-62,COL.accent2,2.5);
    label(ctx,'L₂ = '+l2.toFixed(1)+' m',(px(l1)+px(l1-l2))/2,y-76,COL.accent2,12);

    // net displacement below
    arrow(ctx,px(0),y+38,px(end),y+38,COL.good,3.5,10);
    label(ctx,'displacement = '+fx(end,1)+' m',(px(0)+px(end))/2,y+55,COL.good,12,'center','bold');

    ball(ctx,px(this.pos(t,l1,l2)),y,COL.fg,10);
    label(ctx,'start',px(0),y-12,COL.faint,11);
    label(ctx,'end',px(end),y+20,COL.faint,11);
  },
  stats(t,v){
    const l1=+v.l1,l2=+v.l2;
    return [['Distance travelled',(l1+l2).toFixed(1)+' m'],
            ['Displacement',fx(l1-l2,1)+' m'],
            ['Distance − |Displacement|',(l1+l2-Math.abs(l1-l2)).toFixed(1)+' m']];
  },
  note:'Set L₁ = L₂ and the displacement collapses to zero while the distance is at its largest. Distance equals |displacement| only when the motion never reverses.'
},

/* 3 ------------------------------------------------------------------ */
speed:{
  title:'Average and instantaneous speed',
  blurb:'Two legs at two different speeds. The average speed is total distance over total time, which is not the mean of the two speeds.',
  formula:'v<sub>avg</sub> = (d<sub>1</sub>+d<sub>2</sub>) ⁄ (t<sub>1</sub>+t<sub>2</sub>)',
  controls:[
    {id:'d1',label:'Leg 1 distance',min:1,max:20,step:.5,val:10,unit:' m'},
    {id:'s1',label:'Leg 1 speed',min:1,max:20,step:.1,val:10,unit:' m/s'},
    {id:'d2',label:'Leg 2 distance',min:1,max:20,step:.5,val:10,unit:' m'},
    {id:'s2',label:'Leg 2 speed',min:1,max:20,step:.1,val:2,unit:' m/s'}
  ],
  T(v){ return +v.d1/+v.s1 + +v.d2/+v.s2; },
  period(v){ return this.T(v); },
  draw(ctx,W,H,t,v){
    const d1=+v.d1,s1=+v.s1,d2=+v.d2,s2=+v.s2;
    const t1=d1/s1, T=t1+d2/s2, D=d1+d2;
    const x = t<t1 ? s1*t : d1+s2*(t-t1);
    const now = t<t1 ? s1 : s2;

    const y=H*0.30, px=track(ctx,W,H,y,0,D,Math.max(1,Math.round(D/8)));
    ctx.strokeStyle=COL.accent; ctx.lineWidth=5; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(px(0),y-14); ctx.lineTo(px(d1),y-14); ctx.stroke();
    ctx.strokeStyle=COL.accent2;
    ctx.beginPath(); ctx.moveTo(px(d1),y-14); ctx.lineTo(px(D),y-14); ctx.stroke();
    ball(ctx,px(x),y,COL.fg,10);

    const P=plot(ctx,{x:20,y:H*0.42,w:W-40,h:H*0.52},[0,T],[0,Math.max(s1,s2)*1.15],'time (s)','speed (m/s)');
    curve(ctx,P,tt=>tt<t1?s1:s2,0,T,COL.accent);
    ctx.setLineDash([5,5]);
    curve(ctx,P,()=>D/T,0,T,COL.good,2);
    ctx.setLineDash([]);
    label(ctx,'average '+(D/T).toFixed(2),P.ix+P.iw-6,P.Y(D/T)-10,COL.good,11,'right');
    ball(ctx,P.X(t),P.Y(now),COL.fg,5);
  },
  stats(t,v){
    const d1=+v.d1,s1=+v.s1,d2=+v.d2,s2=+v.s2, T=d1/s1+d2/s2;
    const now = t<d1/s1 ? s1 : s2;
    return [['Instantaneous speed',now.toFixed(2)+' m/s'],
            ['Average speed',((d1+d2)/T).toFixed(2)+' m/s'],
            ['Mean of the two speeds',((s1+s2)/2).toFixed(2)+' m/s']];
  },
  note:'Equal distances at 10 m/s and 2 m/s average to 3.33 m/s, not 6 m/s. The slow leg eats far more time, so it pulls the average down hard.'
},

/* 4 ------------------------------------------------------------------ */
velocity:{
  title:'Average and instantaneous velocity',
  blurb:'Average velocity is displacement over time, so a round trip can have a large average speed and zero average velocity.',
  formula:'v⃗<sub>avg</sub> = Δx⃗ ⁄ Δt &nbsp;&nbsp;|&nbsp;&nbsp; average speed = distance ⁄ Δt',
  controls:[
    {id:'do',label:'Out distance',min:1,max:20,step:.5,val:12,unit:' m'},
    {id:'vo',label:'Out speed',min:1,max:15,step:.1,val:6,unit:' m/s'},
    {id:'db',label:'Return distance',min:0,max:20,step:.5,val:12,unit:' m'},
    {id:'vb',label:'Return speed',min:1,max:15,step:.1,val:3,unit:' m/s'}
  ],
  T(v){ return +v.do/+v.vo + +v.db/+v.vb; },
  period(v){ return this.T(v); },
  draw(ctx,W,H,t,v){
    const dO=+v.do,vO=+v.vo,dB=+v.db,vB=+v.vb;
    const t1=dO/vO, T=t1+dB/vB, end=dO-dB;
    const x = t<t1 ? vO*t : dO - vB*(t-t1);
    const vel = t<t1 ? vO : -vB;
    const lo=Math.min(0,end)-1, hi=dO+1;
    const y=H*0.28, px=track(ctx,W,H,y,lo,hi,Math.max(1,Math.round((hi-lo)/8)));
    ball(ctx,px(x),y,COL.fg,10);
    arrow(ctx,px(x),y-26,px(x)+clamp(vel*7,-60,60),y-26,vel>=0?COL.accent:COL.hard,3);
    arrow(ctx,px(0),y+30,px(end),y+30,COL.good,3.5,10);
    label(ctx,'net displacement '+fx(end,1)+' m',(px(0)+px(end))/2,y+47,COL.good,12);

    const ymax=Math.max(vO,vB)*1.2;
    const P=plot(ctx,{x:20,y:H*0.42,w:W-40,h:H*0.52},[0,T],[-ymax,ymax],'time (s)','velocity (m/s)');
    curve(ctx,P,tt=>tt<t1?vO:-vB,0,T,COL.accent);
    ctx.setLineDash([5,5]); curve(ctx,P,()=>end/T,0,T,COL.good,2); ctx.setLineDash([]);
    label(ctx,'v avg '+fx(end/T,2),P.ix+P.iw-6,P.Y(end/T)-10,COL.good,11,'right');
    ball(ctx,P.X(t),P.Y(vel),COL.fg,5);
  },
  stats(t,v){
    const dO=+v.do,vO=+v.vo,dB=+v.db,vB=+v.vb, T=dO/vO+dB/vB, end=dO-dB;
    return [['Average velocity',fx(end/T,2)+' m/s'],
            ['Average speed',((dO+dB)/T).toFixed(2)+' m/s'],
            ['Instantaneous velocity',fx(t<dO/vO?vO:-vB,2)+' m/s']];
  },
  note:'Make the return distance equal the out distance. Average velocity reads 0 m/s while average speed stays well above zero. That gap is the whole point of the vector definition.'
},

/* 5 ------------------------------------------------------------------ */
accel:{
  title:'Average and instantaneous acceleration',
  blurb:'On a velocity–time graph the average acceleration is the slope of the chord between two instants. The instantaneous acceleration is the slope of the tangent.',
  formula:'a<sub>avg</sub> = Δv ⁄ Δt &nbsp;&nbsp;|&nbsp;&nbsp; a = dv/dt = slope of the v–t tangent',
  controls:[
    {id:'vi',label:'Initial velocity',min:-10,max:10,step:.1,val:2,unit:' m/s'},
    {id:'vf',label:'Final velocity',min:-10,max:10,step:.1,val:8,unit:' m/s'},
    {id:'Tt',label:'Total time',min:1,max:10,step:.1,val:4,unit:' s'},
    {id:'k',label:'Curvature of v(t)',min:-1,max:1,step:.05,val:0.7,unit:''}
  ],
  // v(s) = vi + (vf-vi)*[ (1-k)s + k s^2 ], with s = t/T. Endpoints are fixed,
  // so the chord slope stays exactly (vf-vi)/T whatever k does.
  vel(t,vi,vf,T,k){ const s=t/T; return vi+(vf-vi)*((1-k)*s+k*s*s); },
  slope(t,vi,vf,T,k){ const s=t/T; return (vf-vi)/T*((1-k)+2*k*s); },
  period(v){ return +v.Tt; },
  draw(ctx,W,H,t,v){
    const vi=+v.vi,vf=+v.vf,T=+v.Tt,k=+v.k;
    const lo=Math.min(vi,vf,-1)-2, hi=Math.max(vi,vf,1)+2;
    const P=plot(ctx,{x:16,y:14,w:W-32,h:H-30},[0,T],[lo,hi],'time (s)','velocity (m/s)');

    curve(ctx,P,tt=>this.vel(tt,vi,vf,T,k),0,T,COL.accent,3);

    // chord = average acceleration over the whole interval
    ctx.setLineDash([6,5]); ctx.strokeStyle=COL.good; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(P.X(0),P.Y(vi)); ctx.lineTo(P.X(T),P.Y(vf)); ctx.stroke();
    ctx.setLineDash([]);
    label(ctx,'chord: a avg = '+fx((vf-vi)/T,2), P.X(T*0.5), P.Y((vi+vf)/2)-14, COL.good, 12);

    // tangent at the marker = instantaneous acceleration
    const vNow=this.vel(t,vi,vf,T,k), m=this.slope(t,vi,vf,T,k), dt=T*0.22;
    ctx.strokeStyle=COL.accent2; ctx.lineWidth=2.5;
    ctx.beginPath();
    ctx.moveTo(P.X(Math.max(0,t-dt)),P.Y(vNow+m*(Math.max(0,t-dt)-t)));
    ctx.lineTo(P.X(Math.min(T,t+dt)),P.Y(vNow+m*(Math.min(T,t+dt)-t)));
    ctx.stroke();
    ball(ctx,P.X(t),P.Y(vNow),COL.accent2,6);
    label(ctx,'tangent: a = '+fx(m,2), P.X(t), P.Y(vNow)+22, COL.accent2, 12);
    ball(ctx,P.X(0),P.Y(vi),COL.good,5); ball(ctx,P.X(T),P.Y(vf),COL.good,5);
  },
  stats(t,v){
    const vi=+v.vi,vf=+v.vf,T=+v.Tt,k=+v.k;
    return [['Average acceleration',fx((vf-vi)/T,2)+' m/s²'],
            ['Instantaneous acceleration',fx(this.slope(t,vi,vf,T,k),2)+' m/s²'],
            ['Velocity now',fx(this.vel(t,vi,vf,T,k),2)+' m/s']];
  },
  note:'Drag curvature to 0 and the curve becomes a straight line, so the tangent lies on the chord and the two accelerations agree at every instant. That is uniform acceleration.'
},

/* 6 ------------------------------------------------------------------ */
straight:{
  title:'Motion in a straight line',
  blurb:'Constant acceleration along one axis. The position graph is a parabola, the velocity graph a straight line, and the particle below moves in step with both.',
  formula:'x = ut + ½at² &nbsp;&nbsp;|&nbsp;&nbsp; v = u + at &nbsp;&nbsp;|&nbsp;&nbsp; v² = u² + 2ax',
  controls:[
    {id:'u',label:'Initial velocity u',min:-15,max:15,step:.1,val:10,unit:' m/s'},
    {id:'a',label:'Acceleration a',min:-6,max:6,step:.1,val:-2,unit:' m/s²'},
    {id:'Tw',label:'Time window',min:2,max:12,step:.5,val:8,unit:' s'}
  ],
  period(v){ return +v.Tw; },
  draw(ctx,W,H,t,v){
    const u=+v.u,a=+v.a,T=+v.Tw;
    const X=tt=>u*tt+0.5*a*tt*tt, V=tt=>u+a*tt;
    let xlo=0,xhi=0;
    for(let i=0;i<=60;i++){ const q=X(T*i/60); xlo=Math.min(xlo,q); xhi=Math.max(xhi,q); }
    const pad=Math.max(1,(xhi-xlo)*0.12); xlo-=pad; xhi+=pad;

    const ty=H*0.20, px=track(ctx,W,H,ty,xlo,xhi,Math.max(1,Math.round((xhi-xlo)/8)));
    ball(ctx,px(X(t)),ty,COL.fg,10);
    arrow(ctx,px(X(t)),ty-26,px(X(t))+clamp(V(t)*4,-70,70),ty-26,COL.accent,3);
    label(ctx,'v',px(X(t))+clamp(V(t)*4,-70,70)/2,ty-40,COL.accent,11);
    if(Math.abs(a)>0.05){
      arrow(ctx,px(X(t)),ty+26,px(X(t))+clamp(a*10,-60,60),ty+26,COL.hard,3);
      label(ctx,'a',px(X(t))+clamp(a*10,-60,60)/2,ty+40,COL.hard,11);
    }

    const half=(W-48)/2, gy=H*0.34, gh=H*0.60;
    const P1=plot(ctx,{x:16,y:gy,w:half,h:gh},[0,T],[xlo,xhi],'t (s)','x (m)');
    curve(ctx,P1,X,0,T,COL.accent,2.5);
    ball(ctx,P1.X(t),P1.Y(X(t)),COL.fg,5);

    const vlo=Math.min(u,V(T),0)-2, vhi=Math.max(u,V(T),0)+2;
    const P2=plot(ctx,{x:32+half,y:gy,w:half,h:gh},[0,T],[vlo,vhi],'t (s)','v (m/s)');
    // area under v-t between 0 and t is the displacement
    ctx.fillStyle=COL.accent+'33';
    ctx.beginPath(); ctx.moveTo(P2.X(0),P2.Y(0));
    for(let i=0;i<=60;i++){ const tt=t*i/60; ctx.lineTo(P2.X(tt),P2.Y(V(tt))); }
    ctx.lineTo(P2.X(t),P2.Y(0)); ctx.closePath(); ctx.fill();
    curve(ctx,P2,V,0,T,COL.accent2,2.5);
    ball(ctx,P2.X(t),P2.Y(V(t)),COL.fg,5);
    label(ctx,'shaded area = x',P2.ix+P2.iw/2,P2.iy+10,COL.faint,10);
  },
  stats(t,v){
    const u=+v.u,a=+v.a, x=u*t+0.5*a*t*t, vel=u+a*t;
    return [['Position x',fx(x,2)+' m'],['Velocity v',fx(vel,2)+' m/s'],
            ['Turning point', Math.abs(a)<0.05?'never':'t = '+(-u/a).toFixed(2)+' s']];
  },
  note:'With u = 10 and a = −2 the particle stops at t = 5 s and comes back. Notice x keeps rising until then, because the velocity is still positive.'
},

/* 7 ------------------------------------------------------------------ */
plane:{
  title:'Motion in a plane',
  blurb:'The x and y motions are independent. Each axis obeys the same 1D equations, and the path is whatever the two produce together.',
  formula:'r⃗ = (u<sub>x</sub>t + ½a<sub>x</sub>t²) î + (u<sub>y</sub>t + ½a<sub>y</sub>t²) ĵ',
  controls:[
    {id:'ux',label:'uₓ',min:-10,max:10,step:.1,val:6,unit:' m/s'},
    {id:'uy',label:'u_y',min:-10,max:10,step:.1,val:8,unit:' m/s'},
    {id:'ax',label:'aₓ',min:-4,max:4,step:.1,val:0,unit:' m/s²'},
    {id:'ay',label:'a_y',min:-4,max:4,step:.1,val:-2,unit:' m/s²'}
  ],
  period:()=>6,
  draw(ctx,W,H,t,v){
    const ux=+v.ux,uy=+v.uy,ax=+v.ax,ay=+v.ay,T=6;
    const X=tt=>ux*tt+0.5*ax*tt*tt, Y=tt=>uy*tt+0.5*ay*tt*tt;
    let xlo=0,xhi=0,ylo=0,yhi=0;
    for(let i=0;i<=80;i++){ const q=T*i/80;
      xlo=Math.min(xlo,X(q)); xhi=Math.max(xhi,X(q));
      ylo=Math.min(ylo,Y(q)); yhi=Math.max(yhi,Y(q)); }
    const px=Math.max(2,(xhi-xlo)*.12), py=Math.max(2,(yhi-ylo)*.12);
    const P=plot(ctx,{x:16,y:12,w:W-32,h:H-24},[xlo-px,xhi+px],[ylo-py,yhi+py],'x (m)','y (m)');

    ctx.strokeStyle=COL.line; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(P.X(xlo-px),P.Y(0)); ctx.lineTo(P.X(xhi+px),P.Y(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(P.X(0),P.Y(ylo-py)); ctx.lineTo(P.X(0),P.Y(yhi+py)); ctx.stroke();

    ctx.strokeStyle=COL.faint; ctx.lineWidth=2; ctx.beginPath();
    for(let i=0;i<=120;i++){ const q=T*i/120; i?ctx.lineTo(P.X(X(q)),P.Y(Y(q))):ctx.moveTo(P.X(X(q)),P.Y(Y(q))); }
    ctx.stroke();

    const cx=P.X(X(t)), cy=P.Y(Y(t));
    const vx=ux+ax*t, vy=uy+ay*t, s=Math.min(60/Math.max(1,Math.hypot(vx,vy)),6);
    arrow(ctx,cx,cy,cx+vx*s,cy,COL.accent,2,7);
    arrow(ctx,cx,cy,cx,cy-vy*s,COL.accent,2,7);
    arrow(ctx,cx,cy,cx+vx*s,cy-vy*s,COL.accent2,3,9);
    label(ctx,'v⃗',cx+vx*s*0.55,cy-vy*s*0.55-12,COL.accent2,12,'center','bold');
    ball(ctx,cx,cy,COL.fg,8);
  },
  stats(t,v){
    const vx=+v.ux+ +v.ax*t, vy=+v.uy+ +v.ay*t;
    return [['vₓ',fx(vx,2)+' m/s'],['v_y',fx(vy,2)+' m/s'],
            ['Speed |v⃗|',Math.hypot(vx,vy).toFixed(2)+' m/s']];
  },
  note:'Set both accelerations to zero and the path is a straight line. Set aₓ = 0 and a_y = −9.8 and you have projectile motion, which is the next scene.'
},

/* 8 ------------------------------------------------------------------ */
projectile:{
  title:'Projectile motion',
  blurb:'Horizontally the speed never changes. Vertically gravity pulls at 9.8 m/s². Those two facts alone give the parabola, the range and the time of flight.',
  formula:'x = u cosθ·t &nbsp;&nbsp;|&nbsp;&nbsp; y = h + u sinθ·t − ½gt² &nbsp;&nbsp;|&nbsp;&nbsp; R = u²sin2θ ⁄ g (for h = 0)',
  controls:[
    {id:'u',label:'Launch speed u',min:2,max:40,step:.5,val:20,unit:' m/s'},
    {id:'th',label:'Launch angle θ',min:1,max:89,step:1,val:45,unit:'°'},
    {id:'h0',label:'Launch height h',min:0,max:40,step:.5,val:0,unit:' m'}
  ],
  flight(u,th,h0){
    const uy=u*Math.sin(rad(th));
    return (uy+Math.sqrt(uy*uy+2*G*h0))/G;   // solves h + uy t − ½gt² = 0
  },
  period(v){ return this.flight(+v.u,+v.th,+v.h0); },
  draw(ctx,W,H,t,v){
    const u=+v.u,th=+v.th,h0=+v.h0;
    const ux=u*Math.cos(rad(th)), uy=u*Math.sin(rad(th));
    const T=this.flight(u,th,h0), R=ux*T, Hm=h0+uy*uy/(2*G), tApex=uy/G;
    const X=tt=>ux*tt, Y=tt=>h0+uy*tt-0.5*G*tt*tt;
    const P=plot(ctx,{x:16,y:12,w:W-32,h:H-24},[0,R*1.08],[0,Hm*1.18+1],'horizontal x (m)','height y (m)');

    ctx.fillStyle=COL.line;
    ctx.fillRect(P.ix,P.Y(0),P.iw,Math.max(2,P.iy+P.ih-P.Y(0)));

    ctx.strokeStyle=COL.faint; ctx.lineWidth=2; ctx.beginPath();
    for(let i=0;i<=140;i++){ const q=T*i/140; i?ctx.lineTo(P.X(X(q)),P.Y(Y(q))):ctx.moveTo(P.X(X(q)),P.Y(Y(q))); }
    ctx.stroke();

    ctx.setLineDash([4,4]); ctx.strokeStyle=COL.good; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(P.ix,P.Y(Hm)); ctx.lineTo(P.X(X(tApex)),P.Y(Hm)); ctx.stroke();
    ctx.setLineDash([]);
    label(ctx,'H = '+Hm.toFixed(1)+' m',P.ix+6,P.Y(Hm)-10,COL.good,11,'left');

    const cx=P.X(X(t)), cy=P.Y(Y(t)), vx=ux, vy=uy-G*t;
    const s=Math.min(70/Math.max(1,Math.hypot(vx,vy)),5);
    arrow(ctx,cx,cy,cx+vx*s,cy,COL.accent,2,7);
    arrow(ctx,cx,cy,cx,cy-vy*s,COL.accent,2,7);
    arrow(ctx,cx,cy,cx+vx*s,cy-vy*s,COL.accent2,3,9);
    ball(ctx,cx,cy,COL.accent2,9);
    label(ctx,'R = '+R.toFixed(1)+' m',P.X(R/2),P.Y(0)+14,COL.dim,11);
  },
  stats(t,v){
    const u=+v.u,th=+v.th,h0=+v.h0;
    const ux=u*Math.cos(rad(th)), uy=u*Math.sin(rad(th));
    const T=this.flight(u,th,h0);
    return [['Range',(ux*T).toFixed(2)+' m'],
            ['Max height',(h0+uy*uy/(2*G)).toFixed(2)+' m'],
            ['Time of flight',T.toFixed(2)+' s']];
  },
  note:'With h = 0 the range peaks at θ = 45°, and 30° and 60° give exactly the same range. Raise the launch height and the best angle drops below 45°.'
},

/* 9 ------------------------------------------------------------------ */
frame:{
  title:'Change of frame',
  blurb:'Switch the observer and every velocity shifts by the same amount. Whoever you are watching from is, by definition, standing still.',
  formula:'v⃗<sub>A/B</sub> = v⃗<sub>A/G</sub> − v⃗<sub>B/G</sub>',
  controls:[
    {id:'va',label:'Velocity of A (ground frame)',min:-12,max:12,step:.1,val:6,unit:' m/s'},
    {id:'vb',label:'Velocity of B (ground frame)',min:-12,max:12,step:.1,val:-3,unit:' m/s'},
    {id:'fr',type:'seg',label:'Observer sits on',options:[['g','Ground'],['a','Car A'],['b','Car B']],val:'g'}
  ],
  period:()=>10,
  draw(ctx,W,H,t,v){
    const va=+v.va, vb=+v.vb;
    const vObs = v.fr==='a' ? va : v.fr==='b' ? vb : 0;
    const aS=va-vObs, bS=vb-vObs, gS=-vObs;

    const span=60, wrap=x=>((x+span/2)%span+span)%span-span/2;
    const yA=H*0.30, yB=H*0.68;

    // ground markers, which move too once you leave the ground frame
    ctx.strokeStyle=COL.line; ctx.lineWidth=1;
    for(let m=-30;m<=30;m+=6){
      const x=44+(wrap(m+gS*t)+30)/60*(W-72);
      ctx.beginPath(); ctx.moveTo(x,H*0.05); ctx.lineTo(x,H*0.95); ctx.stroke();
    }
    label(ctx,'ground marks '+(Math.abs(gS)<.05?'still':'drifting at '+fx(gS,1)),W/2,H*0.5,COL.faint,11);

    const pxA=44+(wrap(aS*t)+30)/60*(W-72), pxB=44+(wrap(bS*t)+30)/60*(W-72);
    car(ctx,pxA,yA,'A',COL.accent,aS);
    car(ctx,pxB,yB,'B',COL.good,bS);

    function car(ctx,x,y,name,color,vel){
      ctx.fillStyle=COL.panel; ctx.strokeStyle=color; ctx.lineWidth=2;
      roundRect(ctx,x-46,y-22,92,44,10); ctx.fill(); ctx.stroke();
      label(ctx,name,x,y-6,color,16,'center','bold');
      label(ctx,(Math.abs(vel)<.05?'at rest':fx(vel,1)+' m/s'),x,y+11,COL.dim,11);
      if(Math.abs(vel)>=.05) arrow(ctx,x,y+34,x+clamp(vel*7,-64,64),y+34,color,3);
    }
  },
  stats(t,v){
    const va=+v.va, vb=+v.vb;
    const who={g:'ground',a:'car A',b:'car B'}[v.fr];
    return [['v(A/B)',fx(va-vb,1)+' m/s'],
            ['v(B/A)',fx(vb-va,1)+' m/s'],
            ['Frame','riding on the '+who]];
  },
  note:'Give A and B the same velocity and they freeze relative to each other, however fast the ground rushes past. Two cars side by side on a highway look motionless to each other.'
}

};

/* ---------- shell: tabs, controls, canvas, clock ---------- */

const ORDER=['rest','distance','speed','velocity','accel','straight','plane','projectile','frame'];
let current = new URLSearchParams(location.search).get('t');
if(!SCENES[current]) current = ORDER[0];
let running=true, clock=0, last=performance.now(), vals={};

const $ = id => document.getElementById(id);

function buildTabs(){
  const bar=$('tabs'); if(!bar) return;
  bar.innerHTML = ORDER.map(id=>
    `<button data-id="${id}" class="${id===current?'active':''}">${SCENES[id].title}</button>`).join('');
  bar.onclick = e => {
    const b=e.target.closest('button'); if(!b) return;
    current=b.dataset.id; clock=0; render();
  };
}

function render(){
  const S=SCENES[current];
  vals={}; S.controls.forEach(c=>vals[c.id]=c.val);

  document.title = S.title + ' — Kinematics';
  buildTabs();
  $('blurb').textContent = S.blurb;
  $('formula').innerHTML = S.formula;
  $('note').textContent = S.note;
  $('controls').innerHTML = S.controls.map(c=>
    c.type==='seg'
      ? `<div class="control"><label><span>${c.label}</span></label>
         <div class="seg" data-for="${c.id}">${c.options.map(([val,txt])=>
           `<button data-v="${val}" class="${val===c.val?'on':''}">${txt}</button>`).join('')}</div></div>`
      : `<div class="control"><label><span>${c.label}</span>
         <span class="value" id="${c.id}_v">${(+c.val).toFixed(step2dp(c.step))}${c.unit}</span></label>
         <input id="${c.id}" type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${c.val}"></div>`
  ).join('');

  S.controls.forEach(c=>{
    if(c.type==='seg'){
      const box=document.querySelector(`.seg[data-for="${c.id}"]`);
      box.onclick=e=>{
        const b=e.target.closest('button'); if(!b) return;
        vals[c.id]=b.dataset.v;
        box.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));
        draw();
      };
    }else{
      const el=$(c.id);
      el.oninput=()=>{
        vals[c.id]=el.value;
        $(c.id+'_v').textContent=(+el.value).toFixed(step2dp(c.step))+c.unit;
        draw();
      };
    }
  });
  draw();
}
const step2dp = s => (String(s).split('.')[1]||'').length;

function draw(){
  const c=$('c'); if(!c) return;
  const S=SCENES[current];
  const dpr=window.devicePixelRatio||1, W=c.clientWidth, Hh=c.clientHeight;
  if(c.width!==Math.round(W*dpr)||c.height!==Math.round(Hh*dpr)){
    c.width=Math.round(W*dpr); c.height=Math.round(Hh*dpr);
  }
  const ctx=c.getContext('2d');
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,W,Hh);

  const P=Math.max(0.2,S.period(vals));
  const t=clock%P;
  S.draw(ctx,W,Hh,t,vals);

  $('stats').innerHTML = S.stats(t,vals).map(([k,v])=>
    `<div class="stat"><div class="small">${k}</div><div class="big">${v}</div></div>`).join('');
  $('clockv').textContent = 't = '+t.toFixed(2)+' s  /  '+P.toFixed(2)+' s';
}

function loop(now){
  if(running){ clock += Math.min(0.05,(now-last)/1000); draw(); }
  last=now;
  requestAnimationFrame(loop);
}

window.addEventListener('resize',draw);
document.addEventListener('DOMContentLoaded',()=>{
  $('play').onclick=()=>{ running=!running; $('play').textContent=running?'Pause':'Play'; };
  $('reset').onclick=()=>{ clock=0; render(); };
  $('step').onclick=()=>{ running=false; $('play').textContent='Play'; clock+=0.1; draw(); };
  render();
  requestAnimationFrame(loop);
});
