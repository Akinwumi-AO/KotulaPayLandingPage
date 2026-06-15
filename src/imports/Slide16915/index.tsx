import img396414064115435091 from "./a6dcd5da0a000deaedcacf51705e40e9aa3ece04.png";
import img2624481371514381 from "./168a2d2d4f9c6fd131fd40f3b3e4c330c248328d.png";

function Group() {
  return (
    <div className="absolute contents left-[108px] top-[110.7px]">
      <div className="absolute bg-[#99d261] h-[35.614px] left-[108px] rounded-br-[7.123px] rounded-tl-[7.123px] top-[144.53px] w-[10.684px]" />
      <div className="absolute bg-[#99d261] h-[64.995px] left-[123.13px] rounded-br-[7.123px] rounded-tl-[7.123px] top-[130.28px] w-[10.684px]" />
      <div className="absolute bg-[#99d261] h-[103.28px] left-[138.27px] rounded-br-[7.123px] rounded-tl-[7.123px] top-[110.7px] w-[11.574px]" />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#ddd9d9] left-[202.5px] overflow-clip rounded-[33.75px] size-[651.375px] top-[319.95px]">
      <div className="absolute h-[652.05px] left-[-163.81px] top-0 w-[978.314px]" data-name="396414064_11543509 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img396414064115435091} />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#ddd9d9] left-[901.12px] overflow-clip rounded-[33.75px] size-[651.375px] top-[319.95px]">
      <div className="absolute h-[897.75px] left-[-436.73px] top-[-25.65px] w-[1347.3px]" data-name="26244813_7151438 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img2624481371514381} />
      </div>
    </div>
  );
}

function Page() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-[1080px] left-[calc(50%-0.46px)] overflow-clip top-1/2 w-[1755.082px]" data-name="Page 17">
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[89.1px] left-[171.45px] not-italic text-[#001c26] text-[72.9px] top-[117.45px] whitespace-nowrap">Logo Application</p>
      <Group />
      <Frame />
      <Frame1 />
    </div>
  );
}

export default function Slide() {
  return (
    <div className="bg-white relative size-full" data-name="Slide 16:9 - 15">
      <Page />
    </div>
  );
}