import { Award, TrendingUp, Coins, Clock, LucideIcon } from 'lucide-react';

const stats: { icon: LucideIcon; figure: string; label: string }[] = [
  { icon: Award,      figure: '99.99%', label: 'Platform Uptime' },
  { icon: TrendingUp, figure: '$2.5B+', label: 'Processed Annually' },
  { icon: Coins,      figure: '135+',   label: 'Currencies Supported' },
  { icon: Clock,      figure: '24/7',   label: 'Support Available' },
];

function StatCard({ icon: Icon, figure, label }: typeof stats[0]) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-[#e6eced] bg-[rgba(238,250,250,0.9)] px-5 py-6">
      <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[14px] bg-[#1d3b32]">
        <Icon className="size-6 text-[#d4f291]" />
      </div>
      <div>
        <p className="text-2xl font-bold leading-tight text-[#1e1f24] md:text-[1.75rem]">
          {figure}
        </p>
        <p className="text-base text-[#62636c] md:text-lg">{label}</p>
      </div>
    </div>
  );
}

export function BuiltForScale() {
  return (
    <section className="bg-[#e5f2f6] py-14 lg:py-20">
      <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">

        <div className="mx-auto mb-10 max-w-[760px] text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#001c26] md:text-4xl">
            Built for Scale
          </h2>
          <p className="text-lg text-[#62636c] leading-relaxed">
            Powering businesses worldwide with reliable, enterprise-grade payment
            infrastructure for global card processing and African mobile money.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

      </div>
    </section>
  );
}
