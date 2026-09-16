import svgPaths from "./svg-nprob6edui";

function Frame1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] items-start not-italic relative shrink-0 text-center w-full">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[87px] relative shrink-0 text-[#1d3b32] text-[82px] w-full" style={{ fontFeatureSettings: '"dlig" 1' }}>
        Everything You Need to Accept Payments
      </p>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] relative shrink-0 text-[#62636c] text-[26px] w-full">Comprehensive payment infrastructure with global card processing and African mobile money coverage to help you collect, scale, and grow worldwide.</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-center left-1/2 top-[80px] w-[1010px]">
      <Frame1 />
    </div>
  );
}

function Buttons() {
  return (
    <div className="bg-[#d4f291] content-stretch flex items-center justify-center overflow-clip p-[7.637px] relative rounded-[14.099px] shrink-0 size-[70px]" data-name="Buttons">
      <div className="overflow-clip relative shrink-0 size-[42px]" data-name="shield-keyhole-line">
        <div className="absolute inset-[8.75%_16.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="34.65" preserveAspectRatio="none" viewBox="0 0 28.35 34.65" width="28.35">
            <path d={svgPaths.p3585f780} fill="#1E1F24" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[40px] relative shrink-0 text-[#1d3b32] text-[38px] w-full" style={{ fontFeatureSettings: '"dlig" 1' }}>
        Enterprise-Grade Security
      </p>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] relative shrink-0 text-[#62636c] text-[22px] w-full">Bank-level security protocols and compliance standards to protect every transaction and keep customers’ data safe.</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px px-[32px] py-[40px] relative rounded-[16px]">
      <Buttons />
      <Frame2 />
    </div>
  );
}

function Buttons1() {
  return (
    <div className="bg-[#d4f291] content-stretch flex items-center justify-center overflow-clip p-[7.637px] relative rounded-[14.099px] shrink-0 size-[70px]" data-name="Buttons">
      <div className="overflow-clip relative shrink-0 size-[42px]" data-name="flashlight-line">
        <div className="absolute inset-[5%_16.25%_5%_20%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="37.8" preserveAspectRatio="none" viewBox="0 0 26.775 37.8" width="26.775">
            <path d={svgPaths.p28fa2640} fill="#1E1F24" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[40px] relative shrink-0 text-[#1d3b32] text-[38px] w-full" style={{ fontFeatureSettings: '"dlig" 1' }}>
        Lightning-Fast Settlements
      </p>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] relative shrink-0 text-[#62636c] text-[22px] w-full">Get paid faster with automated settlements and real-time transaction processing across all payment methods.</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px px-[32px] py-[40px] relative rounded-[16px]">
      <Buttons1 />
      <Frame3 />
    </div>
  );
}

function Buttons2() {
  return (
    <div className="bg-[#d4f291] content-stretch flex items-center justify-center overflow-clip p-[7.637px] relative rounded-[14.099px] shrink-0 size-[70px]" data-name="Buttons">
      <div className="overflow-clip relative shrink-0 size-[42px]" data-name="global-line">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="31.5" preserveAspectRatio="none" viewBox="0 0 31.5 31.5" width="31.5">
            <path d={svgPaths.p16aa0e80} fill="#1E1F24" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[40px] relative shrink-0 text-[#1d3b32] text-[38px] w-full" style={{ fontFeatureSettings: '"dlig" 1' }}>
        Global Card Coverage + African APMs
      </p>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[normal] relative shrink-0 text-[#62636c] text-[22px] w-full">Accept card payments worldwide and alternative payment methods across key African markets.</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px px-[32px] py-[40px] relative rounded-[16px]">
      <Buttons2 />
      <Frame4 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[192px] top-[378px] w-[1534px]">
      <Frame5 />
      <Frame6 />
      <Frame7 />
    </div>
  );
}

export default function Slide() {
  return (
    <div className="bg-[#f6faee] relative size-full" data-name="Slide 16:9 - 4">
      <Frame />
      <Frame8 />
    </div>
  );
}