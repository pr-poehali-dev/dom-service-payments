import { useState } from 'react';
import Icon from '@/components/ui/icon';

type TabId = 'home' | 'payments' | 'history' | 'bills' | 'notifications' | 'profile' | 'support';
type PayTarget = { title: string; amount: number };
type PayStage = 'confirm' | 'processing' | 'success';

function PaymentSheet({ target, onClose }: { target: PayTarget; onClose: () => void }) {
  const [stage, setStage] = useState<PayStage>('confirm');

  const pay = () => {
    setStage('processing');
    setTimeout(() => setStage('success'), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={stage !== 'processing' ? onClose : undefined}>
      <div className="w-full max-w-md rounded-t-3xl bg-card p-6 pb-8 animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {stage === 'confirm' && (
          <>
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-muted" />
            <p className="text-sm text-muted-foreground">Оплата услуги</p>
            <h3 className="text-xl font-extrabold">{target.title}</h3>
            <div className="my-5 flex items-baseline justify-between rounded-2xl bg-accent px-4 py-4">
              <span className="text-sm font-medium text-accent-foreground">Сумма к оплате</span>
              <span className="text-2xl font-extrabold text-primary">{target.amount.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border p-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-muted"><Icon name="CreditCard" size={18} /></span>
              <div className="flex-1">
                <p className="text-sm font-semibold">Карта •• 4523</p>
                <p className="text-xs text-muted-foreground">Демо-режим · деньги не списываются</p>
              </div>
              <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
            </div>
            <button onClick={pay} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-semibold text-primary-foreground transition-transform active:scale-95">
              <Icon name="Lock" size={18} /> Оплатить {target.amount.toLocaleString('ru-RU')} ₽
            </button>
            <button onClick={onClose} className="mt-2 w-full py-2 text-sm font-medium text-muted-foreground">Отмена</button>
          </>
        )}
        {stage === 'processing' && (
          <div className="flex flex-col items-center py-10">
            <span className="mb-5 grid h-16 w-16 animate-spin place-items-center rounded-full border-4 border-muted border-t-primary" />
            <p className="text-lg font-bold">Обрабатываем платёж…</p>
            <p className="text-sm text-muted-foreground">Пожалуйста, подождите</p>
          </div>
        )}
        {stage === 'success' && (
          <div className="flex flex-col items-center py-8">
            <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary"><Icon name="Check" size={36} /></span>
            <p className="text-lg font-extrabold">Оплачено успешно</p>
            <p className="text-sm text-muted-foreground">{target.title} · {target.amount.toLocaleString('ru-RU')} ₽</p>
            <p className="mt-1 text-xs text-muted-foreground/70">Демо-платёж · чек отправлен на почту</p>
            <button onClick={onClose} className="mt-6 w-full rounded-2xl bg-primary py-4 font-semibold text-primary-foreground transition-transform active:scale-95">Готово</button>
          </div>
        )}
      </div>
    </div>
  );
}

const NAV: { id: TabId; label: string; icon: string }[] = [
  { id: 'home', label: 'Главная', icon: 'House' },
  { id: 'payments', label: 'Платежи', icon: 'CreditCard' },
  { id: 'history', label: 'История', icon: 'Clock' },
  { id: 'bills', label: 'Счета', icon: 'FileText' },
  { id: 'notifications', label: 'Уведомления', icon: 'Bell' },
];

const SERVICES = [
  { name: 'Электроэнергия', icon: 'Zap', amount: 1240, color: 'bg-amber-50 text-amber-600', due: '10 июля' },
  { name: 'Холодная вода', icon: 'Droplets', amount: 680, color: 'bg-sky-50 text-sky-600', due: '10 июля' },
  { name: 'Отопление', icon: 'Flame', amount: 2150, color: 'bg-orange-50 text-orange-600', due: '15 июля' },
  { name: 'Газ', icon: 'Wind', amount: 420, color: 'bg-rose-50 text-rose-600', due: '15 июля' },
  { name: 'Домашний интернет', icon: 'Wifi', amount: 700, color: 'bg-violet-50 text-violet-600', due: '20 июля', auto: true },
  { name: 'Кабельное ТВ', icon: 'Tv', amount: 350, color: 'bg-emerald-50 text-emerald-600', due: '20 июля', auto: true },
];

const HISTORY = [
  { name: 'Электроэнергия', date: '10 июня', amount: 1180 },
  { name: 'Домашний интернет', date: '05 июня', amount: 700, auto: true },
  { name: 'Кабельное ТВ', date: '05 июня', amount: 350, auto: true },
  { name: 'Отопление', date: '02 июня', amount: 1890 },
];

const NOTIFICATIONS = [
  { icon: 'CheckCircle2', color: 'text-primary', title: 'Автоплатёж выполнен', text: 'Интернет 700 ₽ списан по расписанию', time: '2 ч назад' },
  { icon: 'AlertCircle', color: 'text-amber-500', title: 'Приближается срок', text: 'Отопление — оплатите до 15 июля', time: 'вчера' },
  { icon: 'FileText', color: 'text-sky-500', title: 'Новая квитанция', text: 'Квитанция за июль готова', time: '2 дня назад' },
];

export default function Index() {
  const [tab, setTab] = useState<TabId>('home');
  const [pay, setPay] = useState<PayTarget | null>(null);
  const total = SERVICES.reduce((s, x) => s + x.amount, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-md pb-28">
        {/* Header */}
        <header className="flex items-center justify-between px-5 pt-8 pb-4">
          <div>
            <p className="text-sm text-muted-foreground">Добрый день</p>
            <h1 className="text-2xl font-extrabold tracking-tight">Единый счёт</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setTab('notifications')} className="relative grid h-11 w-11 place-items-center rounded-full bg-card shadow-sm">
              <Icon name="Bell" size={20} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <button onClick={() => setTab('profile')} className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground font-bold">А</button>
          </div>
        </header>

        {tab === 'home' && <Home total={total} onPayAll={() => setPay({ title: 'Все услуги (июль)', amount: total })} onPayOne={(t) => setPay(t)} />}
        {tab === 'payments' && <Payments onPay={(t) => setPay(t)} />}
        {tab === 'history' && <History />}
        {tab === 'bills' && <Bills total={total} onPay={() => setPay({ title: 'Квитанция за июль', amount: total })} />}
        {tab === 'notifications' && <Notifications />}
        {tab === 'profile' && <Profile onSupport={() => setTab('support')} />}
        {tab === 'support' && <Support onBack={() => setTab('profile')} />}
      </div>

      {/* Bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t border-border bg-card/90 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-2">
          {NAV.map((n) => {
            const active = tab === n.id;
            return (
              <button key={n.id} onClick={() => setTab(n.id)} className="flex flex-1 flex-col items-center gap-1 py-1.5">
                <span className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                  <Icon name={n.icon} size={18} />
                </span>
                <span className={`text-[10px] font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}>{n.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {pay && <PaymentSheet target={pay} onClose={() => setPay(null)} />}
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl bg-card p-5 shadow-sm ${className}`}>{children}</div>;
}

function Home({ total, onPayAll, onPayOne }: { total: number; onPayAll: () => void; onPayOne: (t: PayTarget) => void }) {
  return (
    <div className="space-y-5 px-5 animate-fade-in">
      <Card className="bg-primary text-primary-foreground">
        <p className="text-sm/relaxed opacity-80">К оплате в этом месяце</p>
        <p className="mt-1 text-4xl font-extrabold tracking-tight">{total.toLocaleString('ru-RU')} ₽</p>
        <button onClick={onPayAll} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/15 py-3.5 font-semibold backdrop-blur transition-transform active:scale-95 hover:bg-white/25">
          <Icon name="Wallet" size={18} /> Оплатить всё
        </button>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="flex items-center gap-3 bg-accent">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Icon name="Repeat" size={18} /></span>
          <div>
            <p className="text-sm font-bold">2 автоплатежа</p>
            <p className="text-xs text-muted-foreground">активны</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-sky-600"><Icon name="FileText" size={18} /></span>
          <div>
            <p className="text-sm font-bold">6 счетов</p>
            <p className="text-xs text-muted-foreground">в июле</p>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 px-1 text-lg font-bold">Услуги</h2>
        <div className="space-y-2.5">
          {SERVICES.map((s) => (
            <ServiceRow key={s.name} s={s} onPay={() => onPayOne({ title: s.name, amount: s.amount })} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceRow({ s, onPay }: { s: (typeof SERVICES)[number]; onPay: () => void }) {
  return (
    <button onClick={onPay} className="flex w-full items-center gap-3 rounded-2xl bg-card p-3.5 text-left shadow-sm transition-transform active:scale-[0.98]">
      <span className={`grid h-11 w-11 place-items-center rounded-xl ${s.color}`}>
        <Icon name={s.icon} size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate font-semibold">{s.name}</p>
          {s.auto && <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">АВТО</span>}
        </div>
        <p className="text-xs text-muted-foreground">до {s.due}</p>
      </div>
      <p className="font-bold">{s.amount} ₽</p>
    </button>
  );
}

function Payments({ onPay }: { onPay: (t: PayTarget) => void }) {
  return (
    <div className="space-y-5 px-5 animate-fade-in">
      <h2 className="text-xl font-extrabold">Платежи</h2>
      <Card className="bg-gradient-to-br from-primary to-emerald-400 text-primary-foreground">
        <div className="flex items-center gap-2 text-sm opacity-90">
          <Icon name="Repeat" size={16} /> Автоплатежи по расписанию
        </div>
        <p className="mt-2 text-sm/relaxed opacity-80">Списываем сумму сами — без вашего участия. Вы всегда вовремя.</p>
      </Card>

      <div>
        <h3 className="mb-3 text-sm font-bold text-muted-foreground">АКТИВНЫЕ АВТОПЛАТЕЖИ</h3>
        <div className="space-y-2.5">
          {SERVICES.filter((s) => s.auto).map((s) => (
            <div key={s.name} className="flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-sm">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${s.color}`}><Icon name={s.icon} size={20} /></span>
              <div className="flex-1">
                <p className="font-semibold">{s.name}</p>
                <p className="text-xs text-muted-foreground">каждое 5-е число · {s.amount} ₽</p>
              </div>
              <div className="relative h-6 w-11 rounded-full bg-primary">
                <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold text-muted-foreground">РАЗОВАЯ ОПЛАТА</h3>
        <div className="space-y-2.5">
          {SERVICES.filter((s) => !s.auto).map((s) => (
            <div key={s.name} className="flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-sm">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${s.color}`}><Icon name={s.icon} size={20} /></span>
              <p className="flex-1 font-semibold">{s.name}</p>
              <button onClick={() => onPay({ title: s.name, amount: s.amount })} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform active:scale-95">{s.amount} ₽</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function History() {
  return (
    <div className="space-y-4 px-5 animate-fade-in">
      <h2 className="text-xl font-extrabold">История</h2>
      <Card className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Оплачено в июне</p>
          <p className="text-2xl font-extrabold">4 120 ₽</p>
        </div>
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary"><Icon name="TrendingUp" size={22} /></span>
      </Card>
      <div className="space-y-2.5">
        {HISTORY.map((h, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-sm">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Icon name="Check" size={18} /></span>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold">{h.name}</p>
                {h.auto && <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">АВТО</span>}
              </div>
              <p className="text-xs text-muted-foreground">{h.date}</p>
            </div>
            <p className="font-bold text-muted-foreground">−{h.amount} ₽</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Bills({ total, onPay }: { total: number; onPay: () => void }) {
  return (
    <div className="space-y-4 px-5 animate-fade-in">
      <h2 className="text-xl font-extrabold">Счета</h2>
      <Card className="border border-border">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="font-bold">Квитанция за июль</p>
            <p className="text-xs text-muted-foreground">ул. Космонавтов, 12, кв. 45</p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">Ожидает</span>
        </div>
        <div className="space-y-2 pt-4">
          {SERVICES.map((s) => (
            <div key={s.name} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{s.name}</span>
              <span className="font-semibold">{s.amount} ₽</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="font-bold">Итого</span>
          <span className="text-lg font-extrabold text-primary">{total.toLocaleString('ru-RU')} ₽</span>
        </div>
        <button onClick={onPay} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 font-semibold text-primary-foreground transition-transform active:scale-95">
          <Icon name="Wallet" size={18} /> Оплатить квитанцию
        </button>
      </Card>
    </div>
  );
}

function Notifications() {
  return (
    <div className="space-y-4 px-5 animate-fade-in">
      <h2 className="text-xl font-extrabold">Уведомления</h2>
      <div className="space-y-2.5">
        {NOTIFICATIONS.map((n, i) => (
          <div key={i} className="flex gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <Icon name={n.icon} size={22} className={n.color} />
            <div className="flex-1">
              <p className="font-semibold">{n.title}</p>
              <p className="text-sm text-muted-foreground">{n.text}</p>
              <p className="mt-1 text-xs text-muted-foreground/70">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Profile({ onSupport }: { onSupport: () => void }) {
  const items = [
    { icon: 'MapPin', label: 'Мои адреса' },
    { icon: 'CreditCard', label: 'Способы оплаты' },
    { icon: 'Repeat', label: 'Автоплатежи' },
    { icon: 'Settings', label: 'Настройки' },
    { icon: 'Headphones', label: 'Поддержка', action: onSupport },
  ];
  return (
    <div className="space-y-4 px-5 animate-fade-in">
      <Card className="flex items-center gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">А</span>
        <div>
          <p className="text-lg font-bold">Анна Смирнова</p>
          <p className="text-sm text-muted-foreground">+7 900 123-45-67</p>
        </div>
      </Card>
      <Card className="p-2">
        {items.map((it, i) => (
          <button key={it.label} onClick={it.action} className={`flex w-full items-center gap-3 px-3 py-3.5 text-left ${i < items.length - 1 ? 'border-b border-border' : ''}`}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-foreground"><Icon name={it.icon} size={18} /></span>
            <span className="flex-1 font-medium">{it.label}</span>
            <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
          </button>
        ))}
      </Card>
    </div>
  );
}

function Support({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-4 px-5 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
        <Icon name="ChevronLeft" size={18} /> Назад
      </button>
      <h2 className="text-xl font-extrabold">Поддержка</h2>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: 'MessageCircle', label: 'Чат с оператором' },
          { icon: 'Phone', label: 'Позвонить' },
          { icon: 'Mail', label: 'Написать письмо' },
          { icon: 'HelpCircle', label: 'Вопросы и ответы' },
        ].map((c) => (
          <Card key={c.label} className="flex flex-col items-center gap-2 py-6 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary"><Icon name={c.icon} size={22} /></span>
            <p className="text-sm font-semibold">{c.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}