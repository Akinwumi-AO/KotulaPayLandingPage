function Content() {
  return (
    <div className="absolute contents left-[80px] top-[307.02px]" data-name="Content">
      <div className="absolute bg-[#99d261] h-[288.535px] left-[80px] top-[307.02px] w-[498.702px]" data-name="Color Container" />
      <div className="absolute bg-[#001c26] h-[288.535px] left-[611.65px] top-[307.02px] w-[105.974px]" data-name="Color Container" />
      <div className="absolute bg-[#04403a] h-[288.535px] left-[736.33px] top-[307.02px] w-[105.974px]" data-name="Color Container" />
      <div className="absolute bg-[#014029] h-[288.535px] left-[862.78px] top-[307.02px] w-[105.974px]" data-name="Color Container" />
      <div className="absolute bg-[#b8f27e] h-[288.535px] left-[988.35px] top-[307.02px] w-[105.974px]" data-name="Color Container" />
      <div className="absolute bg-[#d4f291] h-[288.535px] left-[1113.03px] top-[307.02px] w-[105.974px]" data-name="Color Container" />
      <p className="[word-break:break-word] absolute font-['Circular_Std:Bold',sans-serif] h-[21.373px] leading-[21.373px] left-[80px] not-italic text-[#001c26] text-[16.03px] top-[627.61px] w-[154.063px]">Primary Green</p>
      <p className="[word-break:break-word] absolute font-['Circular_Std:Book',sans-serif] leading-[16.03px] left-[80px] not-italic text-[#001c26] text-[14.249px] top-[609.8px] whitespace-nowrap">#99D261</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.03px] left-[611.65px] not-italic text-[#211f54] text-[14.249px] top-[609.8px] whitespace-nowrap">#001C26</p>
      <p className="[word-break:break-word] absolute font-['Circular_Std:Book',sans-serif] h-[16.03px] leading-[16.03px] left-[736.33px] not-italic text-[#001c26] text-[14.249px] top-[609.8px] w-[62.338px]">#04403A</p>
      <p className="[word-break:break-word] absolute font-['Circular_Std:Book',sans-serif] h-[16.03px] leading-[16.03px] left-[862.78px] not-italic text-[#001c26] text-[14.249px] top-[609.8px] w-[64.119px]">#014029</p>
      <p className="[word-break:break-word] absolute font-['Circular_Std:Book',sans-serif] leading-[16.03px] left-[988.35px] not-italic text-[#001c26] text-[14.249px] top-[609.8px] whitespace-nowrap">#B8F27E</p>
      <p className="[word-break:break-word] absolute font-['Circular_Std:Book',sans-serif] leading-[16.03px] left-[1113.03px] not-italic text-[#001c26] text-[14.249px] top-[609.8px] whitespace-nowrap">#D4F291</p>
    </div>
  );
}

function Wrapper() {
  return (
    <div className="absolute contents left-[80px] top-[80px]" data-name="Wrapper">
      <Content />
      <p className="[word-break:break-word] absolute font-['Circular_Std:Book',sans-serif] h-[92px] leading-[30px] left-[511px] not-italic text-[#6e7191] text-[18px] top-[80px] w-[708px]">{`The Color Palette section of a brand book outlines the colors that are associated with the brand, and how they should be used across various media and contexts. This section is particularly important to ensure that the brand's visual identity.`}</p>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute contents left-[132px] top-[93px]" data-name="Header">
      <p className="[word-break:break-word] absolute font-['Circular_Std:Bold',sans-serif] h-[50px] leading-[50px] left-[132px] not-italic text-[#001c26] text-[38px] top-[93px] w-[294px]">Color Palette</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[80px] top-[80px]">
      <div className="absolute bg-[#99d261] h-[26.381px] left-[80px] rounded-br-[5.276px] rounded-tl-[5.276px] top-[105.06px] w-[7.914px]" />
      <div className="absolute bg-[#99d261] h-[48.144px] left-[91.21px] rounded-br-[5.276px] rounded-tl-[5.276px] top-[94.51px] w-[7.914px]" />
      <div className="absolute bg-[#99d261] h-[76.503px] left-[102.42px] rounded-br-[5.276px] rounded-tl-[5.276px] top-[80px] w-[8.574px]" />
    </div>
  );
}

function Wrapper1() {
  return (
    <div className="absolute contents left-[80px] top-[80px]" data-name="Wrapper">
      <Header />
      <Group />
    </div>
  );
}

function Page() {
  return (
    <div className="absolute bg-white h-[800px] left-[424px] overflow-clip top-[280px] w-[1300px]" data-name="Page 13">
      <Wrapper />
      <Wrapper1 />
    </div>
  );
}

export default function Slide() {
  return (
    <div className="bg-white relative size-full" data-name="Slide 16:9 - 11">
      <Page />
    </div>
  );
}