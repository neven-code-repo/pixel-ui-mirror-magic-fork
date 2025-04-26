import React from "react";

export const BusinessHeader: React.FC = () => {
  return (
    <nav className="bg-white flex items-center overflow-hidden text-xs font-medium whitespace-nowrap justify-center px-6 py-2">
      <div className="self-stretch flex min-w-60 w-full max-w-[1200px] items-center gap-9 justify-between flex-1 shrink basis-[0%] my-auto">
        <button
          className="rounded bg-gray-100 border self-stretch flex items-center gap-1 text-[#1e2b86] justify-center w-[78px] my-auto px-3 py-2 border-[rgba(226,232,246,0.7)] border-solid"
          onClick={() => window.history.back()}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb46b2bac58dac6216876295a6986ff8c85edae0?placeholderIfAbsent=true"
            alt="Back"
            className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
          />
          <span className="self-stretch my-auto">Back</span>
        </button>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cbfa1b5a7690d400fe92066bab1120b6fa5581c5?placeholderIfAbsent=true"
          alt="Logo"
          className="aspect-[2.33] object-contain w-[114px] self-stretch shrink-0 my-auto"
        />

        <div className="rounded bg-[rgba(243,244,246,0)] border self-stretch flex items-center gap-1 text-[#182b58] justify-center w-[78px] my-auto px-3 py-2 border-[rgba(226,232,246,0)] border-solid">
          <div className="self-stretch flex w-4 shrink-0 h-4 my-auto" />
          <div className="self-stretch my-auto">Back</div>
        </div>
      </div>
    </nav>
  );
};
