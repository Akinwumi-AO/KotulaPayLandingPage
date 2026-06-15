import img425187072Ca1606DfB350404BB7Af203Ecbaab1B11 from "./d2d245a8c04a54ceea084818f962ac820f6a3e33.png";

function Group() {
  return (
    <div className="absolute contents left-[108px] top-[110.7px]">
      <div className="absolute bg-[#99d261] h-[35.614px] left-[108px] rounded-br-[7.123px] rounded-tl-[7.123px] top-[144.53px] w-[10.684px]" />
      <div className="absolute bg-[#99d261] h-[64.995px] left-[123.13px] rounded-br-[7.123px] rounded-tl-[7.123px] top-[130.28px] w-[10.684px]" />
      <div className="absolute bg-[#99d261] h-[103.28px] left-[138.27px] rounded-br-[7.123px] rounded-tl-[7.123px] top-[110.7px] w-[11.574px]" />
    </div>
  );
}

function Page() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-[1080px] left-[calc(50%-0.46px)] overflow-clip top-1/2 w-[1755.082px]" data-name="Page 18">
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[89.1px] left-[171.45px] not-italic text-[#001c26] text-[72.9px] top-[117.45px] whitespace-nowrap">Logo Application</p>
      <Group />
      <div className="-translate-x-1/2 absolute h-[1101.6px] left-[calc(50%-0.04px)] top-[108px] w-[1468.8px]" data-name="425187072_ca1606df-b350-404b-b7af-203ecbaab1b1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img425187072Ca1606DfB350404BB7Af203Ecbaab1B11} />
      </div>
    </div>
  );
}

export default function Slide() {
  return (
    <div className="bg-white relative size-full" data-name="Slide 16:9 - 18">
      <Page />
    </div>
  );
}