function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-[#99d261] h-[24.212px] left-0 rounded-br-[4.842px] rounded-tl-[4.842px] top-[23px] w-[7.264px]" />
      <div className="absolute bg-[#99d261] h-[44.187px] left-[10.29px] rounded-br-[4.842px] rounded-tl-[4.842px] top-[13.31px] w-[7.264px]" />
      <div className="absolute bg-[#99d261] h-[70.214px] left-[20.58px] rounded-br-[4.842px] rounded-tl-[4.842px] top-0 w-[7.869px]" />
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative size-full">
      <p className="absolute font-['Circular_Std:Medium',sans-serif] leading-[normal] left-[34.13px] not-italic text-[49.683px] text-white top-[17.45px] tracking-[-2.981px]">Kotulapay</p>
      <Group />
    </div>
  );
}