
import React, { useState } from "react";
import { BusinessHeader } from "./BusinessHeader";
import { BusinessProgress } from "./BusinessProgress";
import { BusinessInput } from "./BusinessInput";
import { BusinessFooter } from "./BusinessFooter";

export const BusinessForm: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    location: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid =
    formData.businessName.trim() !== "" && formData.location.trim() !== "";

  const handleContinue = () => {
    if (isFormValid) {
      console.log("Form submitted:", formData);
      // Handle form submission
    }
  };

  return (
    <div className="bg-[rgba(244,247,255,1)] max-w-[480px] w-full overflow-hidden mx-auto">
      <BusinessHeader />

      <main className="bg-[rgba(244,247,255,1)] flex min-h-[611px] flex-col items-stretch justify-center pl-6 pr-[23px] py-12">
        <BusinessProgress />

        <div className="w-full flex-1 mt-12">
          <h1 className="w-full max-w-[520px] text-2xl text-[rgba(30,43,134,1)] font-bold text-center leading-[34px]">
            Please enter your business name, city and state where it's located.
          </h1>

          <form className="w-full text-[#1e2b86] mt-12">
            <BusinessInput
              label="Business Name"
              placeholder="Your business name"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
            />

            <div className="mt-4">
              <BusinessInput
                label="Location"
                placeholder="City, State"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      </main>

      <BusinessFooter onContinue={handleContinue} isValid={isFormValid} />
    </div>
  );
};
