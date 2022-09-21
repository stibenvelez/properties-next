import{ useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import GuestsInput, { GuestsInputProps } from "./GuestsInput";
import ExperiencesDateSingleInput from "./ExperiencesDateSingleInput";
import ButtonSubmit from "./ButtonSubmit";
import moment from "moment";
import { FC } from "react";

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "Tokyo, Jappan";
const defaultDate = moment();
const defaultGuestValue: GuestsInputProps["defaultValue"] = {
  guestAdults: 2,
  guestChildren: 2,
  guestInfants: 1,
};

export interface ExperiencesSearchFormProps {
  haveDefaultValue?: boolean;
}

const ExperiencesSearchForm: FC<ExperiencesSearchFormProps> = ({
  haveDefaultValue,
}) => {
  const [dateValue, setdateValue] = useState<moment.Moment | null>(null);
  const [locationInputValue, setLocationInputValue] = useState("");
  const [guestValue, setGuestValue] = useState({});

  const [dateFocused, setDateFocused] = useState<boolean>(false);
  //

  useEffect(() => {
    if (haveDefaultValue) {
      setdateValue(defaultDate);
      setLocationInputValue(defaultLocationValue);
      setGuestValue(defaultGuestValue);
    }
  }, []);

  //

  const renderForm = () => {
    return (
      <form className="relative flex flex-col w-full mt-8 bg-white divide-y shadow-xl md:flex-row rounded-3xl md:rounded-full dark:shadow-2xl dark:bg-neutral-800 divide-neutral-200 dark:divide-neutral-700 md:divide-y-0">
        <LocationInput
          defaultValue={locationInputValue}
          onChange={(e:any) => setLocationInputValue(e)}
          onInputDone={() => setDateFocused(true)}
        />

        <ExperiencesDateSingleInput
          defaultValue={dateValue}
          onChange={(date) => setdateValue(date)}
          defaultFocus={dateFocused}
          onFocusChange={(focus: boolean) => {
            setDateFocused(focus);
          }}
        />

        <GuestsInput
          defaultValue={guestValue}
          onChange={(data) => setGuestValue(data)}
        />
        {/* BUTTON SUBMIT OF FORM */}
        <div className="flex items-center justify-center px-4 py-4 lg:py-0">
          <ButtonSubmit />
        </div>
      </form>
    );
  };

  return renderForm();
};

export default ExperiencesSearchForm;
