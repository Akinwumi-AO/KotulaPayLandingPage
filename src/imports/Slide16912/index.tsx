function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10.8px] items-start left-[1111.05px] top-[369.9px] w-[167.4px]">
      <p className="font-['Circular_Std:Book',sans-serif] h-[24.3px] leading-[24.3px] relative shrink-0 text-[#6e7191] text-[21.6px] w-full">Font Name</p>
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[27px] relative shrink-0 text-[#211f54] text-[24.3px] w-full">Circular Std</p>
    </div>
  );
}

function Content() {
  return (
    <div className="[word-break:break-word] absolute contents left-[109.35px] not-italic top-[369.9px]" data-name="Content">
      <div className="absolute font-['Circular_Std:Book',sans-serif] h-[151.2px] leading-[0] left-[1111.05px] text-[#001c26] text-[32.4px] top-[602.1px] w-[535.95px]">
        <p className="leading-[51.3px] mb-0">ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstvwxyz</p>
        <p className="leading-[51.3px]">{`0123456789!”#$%&/()@=?,-`}</p>
      </div>
      <p className="absolute font-['Circular_Std:Bold',sans-serif] h-[27px] leading-[27px] left-[1111.05px] text-[#001c26] text-[24.3px] top-[564.3px] w-[133.65px]">Characters</p>
      <Frame />
      <p className="absolute font-['Circular_Std:Bold',sans-serif] h-[216px] leading-[216px] left-[109.35px] text-[#014029] text-[216px] top-[556.2px] tracking-[-8.1px] w-[816.75px]">AaBbCc</p>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute contents left-[178.2px] top-[125.55px]" data-name="Header">
      <p className="[word-break:break-word] absolute font-['Circular_Std:Bold',sans-serif] h-[67.5px] leading-[67.5px] left-[178.2px] not-italic text-[#001c26] text-[51.3px] top-[125.55px] w-[396.9px]">Typography</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[108px] top-[108px]">
      <div className="absolute bg-[#99d261] h-[35.614px] left-[108px] rounded-br-[7.123px] rounded-tl-[7.123px] top-[141.83px] w-[10.684px]" />
      <div className="absolute bg-[#99d261] h-[64.995px] left-[123.14px] rounded-br-[7.123px] rounded-tl-[7.123px] top-[127.58px] w-[10.684px]" />
      <div className="absolute bg-[#99d261] h-[103.28px] left-[138.27px] rounded-br-[7.123px] rounded-tl-[7.123px] top-[108px] w-[11.574px]" />
    </div>
  );
}

function Wrapper() {
  return (
    <div className="absolute contents left-[108px] top-[108px]" data-name="Wrapper">
      <Header />
      <Group />
    </div>
  );
}

function Page() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-[1080px] left-[calc(50%+0.5px)] overflow-clip top-1/2 w-[1755px]" data-name="Page 14">
      <Content />
      <p className="[word-break:break-word] absolute font-['Circular_Std:Book',sans-serif] h-[117.45px] leading-[40.5px] left-[109.35px] not-italic text-[#6e7191] text-[24.3px] top-[299.7px] w-[846.45px]">The Typography section of a brand book outlines the fonts and typography that are associated with the brand, and how they should be used across various media and contexts.</p>
      <Wrapper />
    </div>
  );
}

export default function Slide() {
  return (
    <div className="bg-white relative size-full" data-name="Slide 16:9 - 12">
      <Page />
    </div>
  );
}