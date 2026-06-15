function Header() {
  return (
    <div className="absolute contents left-[179.55px] top-[108px]" data-name="Header">
      <p className="[word-break:break-word] absolute font-['Circular_Std:Bold',sans-serif] h-[67.5px] leading-[67.5px] left-[179.55px] not-italic text-[#001c26] text-[51.3px] top-[108px] w-[421.2px]">Mobile App Logo</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[108px] top-[90.45px]">
      <div className="absolute bg-[#014029] h-[35.614px] left-[108px] rounded-br-[7.123px] rounded-tl-[7.123px] top-[124.28px] w-[10.684px]" />
      <div className="absolute bg-[#014029] h-[64.995px] left-[123.13px] rounded-br-[7.123px] rounded-tl-[7.123px] top-[110.03px] w-[10.684px]" />
      <div className="absolute bg-[#014029] h-[103.28px] left-[138.27px] rounded-br-[7.123px] rounded-tl-[7.123px] top-[90.45px] w-[11.574px]" />
    </div>
  );
}

function Wrapper() {
  return (
    <div className="absolute contents left-[108px] top-[90.45px]" data-name="Wrapper">
      <Header />
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[97.25px] top-[39.59px]">
      <div className="absolute bg-[#b8f580] h-[69.168px] left-[97.25px] rounded-br-[13.834px] rounded-tl-[13.834px] top-[105.3px] w-[20.75px]" />
      <div className="absolute bg-[#b8f580] h-[126.231px] left-[126.65px] rounded-br-[13.834px] rounded-tl-[13.834px] top-[77.63px] w-[20.75px]" />
      <div className="absolute bg-[#b8f580] h-[200.587px] left-[156.04px] rounded-br-[13.834px] rounded-tl-[13.834px] top-[39.59px] w-[22.48px]" />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#001c27] overflow-clip relative rounded-[54px] shrink-0 size-[279.253px]">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[98.64px] top-[39.66px]">
      <div className="absolute bg-[#001c27] h-[69.168px] left-[98.64px] rounded-br-[13.834px] rounded-tl-[13.834px] top-[105.37px] w-[20.75px]" />
      <div className="absolute bg-[#001c27] h-[126.231px] left-[128.04px] rounded-br-[13.834px] rounded-tl-[13.834px] top-[77.69px] w-[20.75px]" />
      <div className="absolute bg-[#001c27] h-[200.587px] left-[157.44px] rounded-br-[13.834px] rounded-tl-[13.834px] top-[39.66px] w-[22.48px]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#d5f391] overflow-clip relative rounded-[54px] shrink-0 size-[279.253px]">
      <Group2 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[98.64px] top-[39.66px]">
      <div className="absolute bg-black h-[69.168px] left-[98.64px] rounded-br-[13.834px] rounded-tl-[13.834px] top-[105.37px] w-[20.75px]" />
      <div className="absolute bg-black h-[126.231px] left-[128.04px] rounded-br-[13.834px] rounded-tl-[13.834px] top-[77.69px] w-[20.75px]" />
      <div className="absolute bg-black h-[200.587px] left-[157.43px] rounded-br-[13.834px] rounded-tl-[13.834px] top-[39.66px] w-[22.48px]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#f8ffe8] overflow-clip relative rounded-[54px] shrink-0 size-[279.253px]">
      <Group3 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[98.64px] top-[39.66px]">
      <div className="absolute bg-[#f8ffe8] h-[69.168px] left-[98.64px] rounded-br-[13.834px] rounded-tl-[13.834px] top-[105.37px] w-[20.75px]" />
      <div className="absolute bg-[#f8ffe8] h-[126.231px] left-[128.04px] rounded-br-[13.834px] rounded-tl-[13.834px] top-[77.69px] w-[20.75px]" />
      <div className="absolute bg-[#f8ffe8] h-[200.587px] left-[157.44px] rounded-br-[13.834px] rounded-tl-[13.834px] top-[39.66px] w-[22.48px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-black overflow-clip relative rounded-[54px] shrink-0 size-[279.253px]">
      <Group4 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[56.962px] items-center left-1/2 top-[calc(50%+85.63px)]">
      <Frame />
      <Frame1 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Page() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#f7f7fc] h-[1080px] left-[calc(50%+0.5px)] overflow-clip top-1/2 w-[1755px]" data-name="Page 10">
      <Wrapper />
      <Frame4 />
    </div>
  );
}

export default function Slide() {
  return (
    <div className="bg-white relative size-full" data-name="Slide 16:9 - 9">
      <Page />
    </div>
  );
}