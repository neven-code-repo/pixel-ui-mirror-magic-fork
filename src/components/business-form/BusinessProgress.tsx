import React from "react";

export const BusinessProgress: React.FC = () => {
  return (
    <div className="self-center flex max-w-full w-[342px] flex-col items-stretch text-base text-[rgba(70,90,234,1)] font-normal text-center justify-center">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/27dd57e770f4ebbd7ce7a4071d9047b4d1c407bc?placeholderIfAbsent=true"
        alt="Progress"
        className="aspect-[27.03] object-contain w-full self-center"
      />
      <div className="mt-4">
        <span
          style={{
            fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
            fontWeight: 500,
            lineHeight: "19px",
            color: "rgba(70,90,234,1)",
          }}
        >
          Basic Business Information & Motivation
        </span>
      </div>
    </div>
  );
};
