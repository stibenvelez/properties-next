import { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import ButtonSubmit from "./ButtonSubmit";
import { FC } from "react";
import PropertyTypeSelect from "./PropertyTypeSelect";
import PriceRangeInput from "./PriceRangeInput";

export interface RealEstateSearchFormProps {
  haveDefaultValue?: boolean;
}

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "Tokyo, Jappan";

const RealEstateSearchForm: FC<RealEstateSearchFormProps> = ({
  haveDefaultValue = false,
}) => {
  const [locationInputValue, setLocationInputValue] = useState("");

  //
  useEffect(() => {
    if (haveDefaultValue) {
      setLocationInputValue(defaultLocationValue);
    }
  }, []);
  //

  const renderForm = () => {
    return (
      <form className="relative flex flex-col w-full bg-white divide-y shadow-xl xl:mt-8 lg:flex-row lg:items-center rounded-3xl lg:rounded-full dark:shadow-2xl dark:bg-neutral-800 divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0">
        <LocationInput
          defaultValue={locationInputValue}
          onChange={(e:any) => setLocationInputValue(e)}
        />

        <PropertyTypeSelect />
        <PriceRangeInput />
        {/* BUTTON SUBMIT OF FORM */}
        <div className="px-4 py-4 lg:py-0">
          <ButtonSubmit />
        </div>
      </form>
    );
  };

  return renderForm();
};

export default RealEstateSearchForm;
