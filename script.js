const P=[
[1,'Lốp Michelin City Grip 80/90-17','tire',485000,'🛞','Lốp không ruột, bám đường tốt cả khi trời mưa. Hợp xe số phổ thông.'],
[2,'Lốp Dunlop Scoot Smart 90/90-14','tire',560000,'🛞','Lốp xe tay ga bền, êm ái, bám đường ổn định.'],
[3,'Nhớt Castrol Power1 10W-40 (1 lít)','oil',135000,'🛢️','Nhớt tổng hợp cho xe số và côn tay, giúp máy êm và bền.'],
[4,'Nhớt Motul Scooter 10W-30 (0,8 lít)','oil',98000,'🛢️','Nhớt chuyên dụng cho xe tay ga, vận hành êm, tiết kiệm xăng.'],
[5,'Bugi NGK CR7HSA','elec',38000,'⚡','Bugi chính hãng, đánh lửa mạnh, khởi động dễ dàng.'],
[6,'Đèn LED pha H4 siêu sáng','elec',220000,'💡','Ánh sáng trắng, chiếu xa, tiết kiệm điện, lắp đặt dễ.'],
[7,'Ắc quy GS GTZ5S 12V-3.5Ah','elec',340000,'🔋','Ắc quy khô, không cần châm nước, đề nổ khỏe.'],
[8,'Bộ nhông sên dĩa DID','brake',420000,'⛓️','Bộ truyền động bền bỉ, vận hành êm, ít giãn xích.'],
[9,'Má phanh đĩa trước (cặp)','brake',85000,'🛑','Phanh ăn, êm, không kêu, độ bền cao.'],
[10,'Mũ bảo hiểm 3/4 có kính','acc',450000,'⛑️','Đạt chuẩn an toàn, lót thoáng khí, kính chống chói.'],
[11,'Găng tay bảo hộ chống trượt','acc',150000,'🧤','Chất liệu thoáng, có đệm bảo vệ, dùng được màn hình cảm ứng.'],
[12,'Gương chiếu hậu chân gập','acc',95000,'🪞','Gương rộng, chống rung, chân gập tiện gửi xe.']
];
const C={tire:'Lốp & vỏ xe',oil:'Dầu nhớt',elec:'Điện & đèn',brake:'Phanh & truyền động',acc:'Phụ kiện & bảo hộ'};
const $=s=>document.querySelector(s),B=document.body,D=$('#dg'),
fmt=n=>n.toLocaleString('vi-VN')+'₫',
nz=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d'),
esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let cat='all',q='',sort='',view='cart',last=null,tm,cart={};
try{cart=JSON.parse(localStorage.getItem('cart'))||{}}catch(e){}
const pic=p=>`<img src="images/${p[0]}.jpg" alt="${p[1]}" loading="lazy" onerror="this.outerHTML='${p[4]}'">`;
const items=()=>Object.keys(cart).map(k=>[P.find(p=>p[0]==k),cart[k]]).filter(x=>x[0]);
const total=()=>items().reduce((s,[p,n])=>s+p[3]*n,0);

function shop(){
 $('#chips').innerHTML=[['all','Tất cả'],...Object.entries(C)].map(([k,v])=>`<button class="chip${k==cat?' on':''}" data-a="cat" data-i="${k}">${v}</button>`).join('');
 const l=P.filter(p=>(cat=='all'||p[2]==cat)&&nz(p[1]).includes(q));
 if(sort)l.sort((a,b)=>sort=='asc'?a[3]-b[3]:b[3]-a[3]);
 $('#grid').innerHTML=l.map(p=>`<article class="card"><div class="img" data-a="d" data-i="${p[0]}">${pic(p)}</div><div class="in"><small>${C[p[2]]}</small><h3 data-a="d" data-i="${p[0]}">${p[1]}</h3><p>${p[5]}</p><div class="row"><b>${fmt(p[3])}</b><button class="btn" data-a="add" data-i="${p[0]}">Thêm vào giỏ</button></div></div></article>`).join('')||'<p class="mu">Không tìm thấy sản phẩm phù hợp.</p>';
}
function detail(i){
 const p=P.find(p=>p[0]==i);
 D.innerHTML=`<div class="dc"><button class="x" data-a="dc" aria-label="Đóng">✕</button><div class="big-em">${pic(p)}</div><small>${C[p[2]]}</small><h2>${p[1]}</h2><p>${p[5]}</p><p class="mu">✔ Hàng chính hãng · ✔ Bảo hành 3 tháng · ✔ Đổi trả trong 7 ngày</p><div class="row"><b>${fmt(p[3])}</b><button class="btn" data-a="add" data-i="${p[0]}">Thêm vào giỏ</button></div></div>`;
 D.showModal();
}
function toast(m){const t=$('#ts');t.textContent=m;t.classList.add('on');clearTimeout(tm);tm=setTimeout(()=>t.classList.remove('on'),1600)}
function upd(){
 try{localStorage.setItem('cart',JSON.stringify(cart))}catch(e){}
 $('#cnt').textContent=items().reduce((s,x)=>s+x[1],0);
 if(B.classList.contains('open'))drawer();
}
function chg(i,d){cart[i]=(cart[i]||0)+d;if(cart[i]<1)delete cart[i];upd()}
function drawer(){
 const it=items(),t=total(),H=s=>`<div class="dh"><h2>${s}</h2><button class="x" data-a="close" aria-label="Đóng">✕</button></div>`;
 let h;
 if(view=='cart')h=H('Giỏ hàng')+(it.length?`<div class="list">${it.map(([p,n])=>`<div class="li"><span class="em">${pic(p)}</span><div><b>${p[1]}</b><div class="mu">${fmt(p[3])}</div><div class="qty"><button data-a="dec" data-i="${p[0]}" aria-label="Giảm">−</button><span>${n}</span><button data-a="inc" data-i="${p[0]}" aria-label="Tăng">+</button><button class="lk" data-a="del" data-i="${p[0]}">Xóa</button></div></div><b>${fmt(p[3]*n)}</b></div>`).join('')}</div><div class="tot"><span>Tổng cộng</span><b>${fmt(t)}</b></div><button class="btn big" data-a="go">Đặt hàng</button>`:'<p class="mu">Giỏ hàng của bạn đang trống. Hãy chọn vài sản phẩm nhé!</p>');
 else if(view=='form')h=H('Thông tin đặt hàng')+`<form id="f" novalidate><label>Họ và tên<input name="n" autocomplete="name"></label><label>Số điện thoại<input name="p" inputmode="tel" autocomplete="tel"></label><label>Địa chỉ nhận hàng<textarea name="a" rows="2" autocomplete="street-address"></textarea></label><label>Ghi chú (không bắt buộc)<input name="g"></label><label>Hình thức thanh toán<select name="m"><option>Thanh toán khi nhận hàng (COD)</option><option>Chuyển khoản ngân hàng</option></select></label><div class="tot"><span>Tổng thanh toán</span><b>${fmt(t)}</b></div><div id="err" role="alert"></div><button class="btn big">Xác nhận đặt hàng</button><button type="button" class="lk" data-a="back">← Quay lại giỏ hàng</button></form>`;
 else h=H('Đặt hàng thành công')+`<div class="em">✅</div><p>Cảm ơn <b>${esc(last.n)}</b>! Mã đơn hàng của bạn là <b>${last.id}</b>.</p><div class="list">${last.it.map(([n,c,pr])=>`<div class="tot s"><span>${n} × ${c}</span><span>${fmt(pr*c)}</span></div>`).join('')}</div><div class="tot"><span>Tổng thanh toán</span><b>${fmt(last.t)}</b></div><p class="mu">Giao đến: ${esc(last.a)}<br>Thanh toán: ${last.m}<br>Chúng tôi sẽ gọi ${esc(last.p)} để xác nhận đơn trong thời gian sớm nhất.</p><button class="btn big" data-a="close">Tiếp tục mua sắm</button>`;
 $('#dr').innerHTML=h;
}
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-a]');if(!b)return;
 const a=b.dataset.a,i=b.dataset.i;
 if(a=='cat'){cat=i;shop()}
 else if(a=='d')detail(i)
 else if(a=='dc')D.close()
 else if(a=='add'){chg(i,1);toast('Đã thêm vào giỏ hàng');if(D.open)D.close()}
 else if(a=='inc')chg(i,1)
 else if(a=='dec')chg(i,-1)
 else if(a=='del'){delete cart[i];upd()}
 else if(a=='open'){view='cart';drawer();B.classList.add('open')}
 else if(a=='close')B.classList.remove('open')
 else if(a=='go'){view='form';drawer()}
 else if(a=='back'){view='cart';drawer()}
 else if(a=='shop')$('#sp').scrollIntoView({behavior:'smooth'})
});
document.addEventListener('keydown',e=>{if(e.key=='Escape')B.classList.remove('open')});
document.addEventListener('submit',e=>{
 e.preventDefault();
 const f=new FormData(e.target),n=f.get('n').trim(),p=f.get('p').replace(/[\s.\-]/g,''),a=f.get('a').trim(),er=$('#err');
 if(n.length<2){er.textContent='Vui lòng nhập họ và tên.';return}
 if(!/^(0|\+84)\d{9}$/.test(p)){er.textContent='Số điện thoại chưa đúng (ví dụ: 0912345678).';return}
 if(a.length<8){er.textContent='Vui lòng nhập địa chỉ nhận hàng đầy đủ.';return}
 const o={id:'DH'+Date.now().toString(36).toUpperCase().slice(-6),n,p,a,g:f.get('g').trim(),m:f.get('m'),t:total(),it:items().map(([x,c])=>[x[1],c,x[3]]),d:new Date().toISOString()};
 try{const h=JSON.parse(localStorage.getItem('orders')||'[]');h.push(o);localStorage.setItem('orders',JSON.stringify(h))}catch(x){}
 last=o;cart={};view='done';upd();
});
$('#sq').oninput=e=>{q=nz(e.target.value.trim());shop()};
$('#so').onchange=e=>{sort=e.target.value;shop()};
shop();upd();
