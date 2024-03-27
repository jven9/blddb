"use client";
import React, { useEffect, useState } from "react";
import codeConverter from "@/utils/codeConverter";
import { useTranslation } from "react-i18next";

const Code = () => {
  const { t } = useTranslation();
  const faces = [
    "face-u white",
    "face-l orange",
    "face-f green",
    "face-r red",
    "face-b blue",
    "face-d yellow",
  ];
  const letteringSchemes = codeConverter.letteringSchemes;
  const [inputValues, setInputValues] = useState("");

  useEffect(() => {
    const initialInputValues = codeConverter.initialInputValues;
    const storedValues = localStorage.getItem("code");
    if (storedValues) {
      setInputValues(storedValues);
    } else {
      setInputValues(initialInputValues);
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    const updatedValues =
      inputValues.substring(0, index) +
      (value[0]?.toUpperCase() ?? " ") +
      inputValues.substring(index + 1);
    setInputValues(updatedValues);
    localStorage.setItem("code", updatedValues);
  };

  return (
    <section className="pb-[120px] pt-[100px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-10/12">
            <h2 className="mb-8 text-center text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
              {t("code.title")}
            </h2>
            <div className="mb-5">
              Lettering Scheme Setting:
              {Object.entries(letteringSchemes).map(([scheme, value]) => (
                <div
                  key={scheme}
                  className="mb-1 ml-4 mt-1 inline-block cursor-pointer rounded-sm border-2 border-black bg-white px-4 py-2 text-base font-semibold text-black duration-300 ease-in-out hover:text-primary dark:border-white dark:bg-dark dark:text-white dark:hover:text-primary"
                  onClick={() => {
                    setInputValues(value);
                    localStorage.setItem("code", value);
                  }}
                >
                  {scheme} Lettering Scheme
                </div>
              ))}
            </div>
            <div className="parent-container">
              <div className="cube">
                {faces.map((face, faceIndex) => (
                  <div className={`face ${face}`} key={faceIndex}>
                    {Array.from({ length: 9 }).map((_, cellIndex) => (
                      <div className="part" key={faceIndex * 9 + cellIndex}>
                        {!(cellIndex === 4) && (
                          <input
                            type="text"
                            className="uppercase"
                            onFocus={(e) => e.target.select()}
                            maxLength={1}
                            value={(
                              inputValues[faceIndex * 9 + cellIndex] ?? ""
                            ).trim()}
                            onChange={(e) =>
                              handleChange(
                                faceIndex * 9 + cellIndex,
                                e.target.value ?? "",
                              )
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Code;
