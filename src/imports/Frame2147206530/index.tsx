import svgPaths from "./svg-1cagzck5wb";

function LinkButtons() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Link Buttons [1.0]">
      <p className="[word-break:break-word] font-['Helvetica_Neue:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1e1f24] text-[20px] text-right whitespace-nowrap" style={{ fontFeatureSettings: '"dlig" 1' }}>
        Home
      </p>
    </div>
  );
}

function LinkButtons1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Link Buttons [1.0]">
      <p className="[word-break:break-word] font-['Helvetica_Neue:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1e1f24] text-[20px] text-right whitespace-nowrap" style={{ fontFeatureSettings: '"dlig" 1' }}>
        About Us
      </p>
    </div>
  );
}

function LinkButtons2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Link Buttons [1.0]">
      <p className="[word-break:break-word] font-['Helvetica_Neue:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1e1f24] text-[20px] text-right whitespace-nowrap" style={{ fontFeatureSettings: '"dlig" 1' }}>
        Services
      </p>
    </div>
  );
}

function LinkButtons3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Link Buttons [1.0]">
      <p className="[word-break:break-word] font-['Helvetica_Neue:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1e1f24] text-[20px] text-right whitespace-nowrap" style={{ fontFeatureSettings: '"dlig" 1' }}>
        Resources
      </p>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrow-down-s-line">
        <div className="absolute inset-[35.83%_26.13%_35%_26.14%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="7.0002" preserveAspectRatio="none" viewBox="0 0 11.4552 7.0002" width="11.4552">
            <path d={svgPaths.p3289f600} fill="#1E1F24" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LinkButtons4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Link Buttons [1.0]">
      <p className="[word-break:break-word] font-['Helvetica_Neue:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1e1f24] text-[20px] text-right whitespace-nowrap" style={{ fontFeatureSettings: '"dlig" 1' }}>
        FAQs
      </p>
    </div>
  );
}

function LinkButtons5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Link Buttons [1.0]">
      <p className="[word-break:break-word] font-['Helvetica_Neue:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1e1f24] text-[20px] text-right whitespace-nowrap" style={{ fontFeatureSettings: '"dlig" 1' }}>
        Contact
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full">
      <LinkButtons />
      <LinkButtons1 />
      <LinkButtons2 />
      <LinkButtons3 />
      <LinkButtons4 />
      <LinkButtons5 />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4.896px] relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Helvetica_Neue:Medium',sans-serif] leading-[34.271px] not-italic relative shrink-0 text-[#1e1f24] text-[18.403px] text-center tracking-[-0.7344px] whitespace-nowrap" style={{ fontFeatureSettings: '"calt" 0, "liga" 0' }}>
        Sign In
      </p>
    </div>
  );
}

function Buttons() {
  return (
    <div className="relative rounded-[824645.313px] shrink-0 w-full" data-name="Buttons">
      <div className="content-stretch flex gap-[4.896px] items-center justify-center overflow-clip px-[56.624px] py-[14.687px] relative rounded-[inherit] size-full">
        <Text />
      </div>
      <div aria-hidden className="absolute border-2 border-[#cdced7] border-solid inset-0 pointer-events-none rounded-[824645.313px]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4.896px] relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Helvetica_Neue:Medium',sans-serif] leading-[34.271px] not-italic relative shrink-0 text-[#1e1f24] text-[18.403px] text-center tracking-[-0.7344px] whitespace-nowrap" style={{ fontFeatureSettings: '"calt" 0, "liga" 0' }}>
        Get Started
      </p>
    </div>
  );
}

function Buttons1() {
  return (
    <div className="bg-[#289685] content-stretch flex gap-[4.896px] items-center justify-center overflow-clip px-[56.624px] py-[14.687px] relative rounded-[824645.313px] shrink-0 w-full" data-name="Buttons">
      <Text1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0 w-full">
      <Buttons />
      <Buttons1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start justify-center relative shrink-0 w-full">
      <Frame />
      <Frame1 />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[24px] py-[32px] relative rounded-[16px] size-full">
      <Frame3 />
    </div>
  );
}