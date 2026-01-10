"use client";
import Select, { components } from "react-select";
import VirtualizedSelect from "react-select-virtualized";
import classes from "./DropDown.module.css";
import PropTypes from "prop-types";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Label } from "../Label";
export const DropDown = ({
  options,
  label,
  labelTwo,
  customStyle,
  disabled,
  value,
  setter,
  noBorder,
  placeholder,
  placeholderColor = "var(--placeholder-color)",
  isMulti,
  style,
  leftIcon,
  Components,
  labelClassName,
  labelStyle,
  indicatorColor = "var(--black-color)",
  indicatorIcon,
  optionLabel,
  optionValue,
  singleValueColor = "var(--black-color)",
  customClassName = "DropdownOptionContainer",
  className,
  isSearchable,
  CustomOption,
  squared = false,
  error,
  errorText,
  isVirtualized = false,
  menuPlacement = "auto",
  variant = "primary",
  ref,
  ...props
}) => {
  const DropdownIndicator = (props) => {
    return (
      <>
        <style>
          {`
            .DropdownOptionContainer__indicator{
            padding: 2px;
            border-radius: 8px;
            height:30px;
            width:30px;

            display:flex;
            align-items:center;
            justify-content:center;
            }
          `}
        </style>
        <components.DropdownIndicator {...props}>
          {props?.selectProps?.menuIsOpen ? (
            indicatorIcon ? (
              indicatorIcon
            ) : (
              <IoIosArrowUp
                size={18}
                color={
                  variant === "transparent"
                    ? "var(--white-color)"
                    : indicatorColor
                }
              />
            )
          ) : indicatorIcon ? (
            indicatorIcon
          ) : (
            <IoIosArrowDown
              size={18}
              color={
                variant === "transparent"
                  ? "var(--white-color)"
                  : indicatorColor
              }
            />
          )}
        </components.DropdownIndicator>
      </>
    );
  };

  const dropDownStyle = {
    control: (styles, { isFocused, isDisabled, isSelected }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? "var(--disabled-input-color)"
        : variant === "transparent"
          ? "transparent"
          : "transparent",
      padding: leftIcon ? "6px 13px 6px 24px" : "6px 13px 6px 8px",
      color: "var(--text-color)",
      boxShadow: "none",
      fontFamily: "var(--ff-primary-reg)",
      fontSize: "var(--fs-base)",
      letterSpacing: "1.4",
      cursor: "pointer",
      borderRadius: "var(--input-border-radius)",
      textTransform: "capitalize",
      border: error
        ? "1px solid red"
        : variant === "transparent"
          ? "1px solid var(--white-color)"
          : "1px solid var(--input-border-color)",
      opacity: isDisabled ? 0.6 : 1,
      ...customStyle,

      ":hover": {
        ...styles[":hover"],
        border:
          variant === "transparent" ? "1px solid var(--white-color)" : "1px solid var(--input-border-color)",
      },
      ":placeholder": {
        ...styles[":placeholder"],
        color: "var(--text-color)",
        fontWeight: "700",
        fontFamily: "var(--ff-primary-bold)",
        opacity: 0.4,
      },
      ":active": {
        ...styles[":active"],
        borderColor: "var(--primary-color)",
      },
    }),

    menu: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "var(--input-background-color)",
      borderRadius: "var(--input-border-radius)",
      border: "1px solid var(--border-color)",
      zIndex: 10,
    }),

    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        fontFamily: "var(--ff-primary-med)",
        color:
          variant === "transparent" ? "var(--white-color)" : placeholderColor,
        opacity: 0.4,
      };
    },

    singleValue: (provided) => ({
      ...provided,
      color:
        variant === "transparent" ? "var(--white-color)" : singleValueColor,
    }),

    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected && "var(--primary-color)",
        color: isSelected && "var(--white-color)",
        padding: "8px 12px",
        fontFamily: "var(--ff-primary-reg)",
        textTransform: "capitialize",

        ":active": {
          ...styles[":active"],
          color: "#fff",
          backgroundColor:
            "color-mix(in srgb, var(--primary-color) 100%, white)",
        },
        ":hover": {
          ...styles[":hover"],
          backgroundColor:
            "color-mix(in srgb, var(--primary-color) 50%, white)",
          cursor: "pointer",
        },
      };
    },

    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "var(--main-color)",
        borderRadius: "var(--global-border-radius)",
        padding: "1px 10px",
        fontFamily: "var(--ff-primary-reg)",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "#fff",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      fontSize: "var(--fs-base)",
      color: "#fff",
      ":hover": {
        color: "#fff",
      },
    }),
  };

  return (
    <div
      className={`${[classes.Container, className ? className : ""].join(" ")}`}
    >
      <style>{`
        .DropdownOptionContainer__menu {
          margin: 0px;
          border: 0px;
          z-index: 1100 !important;
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
        }
      `}</style>
      {label && (
        <Label
          htmlFor={`dropdown${label}`}
          disabled={disabled}
          style={{ ...labelStyle }}
        >
          {label} {labelTwo && labelTwo}
        </Label>
      )}

      <div className={`${[classes.dropdownContainer].join(" ")}`}>
        {!isVirtualized ? (
          <Select
            inputId={`dropdown${label}`}
            value={value}
            onChange={(e) => {
              setter(e);
            }}
            className={`${[classes.reactSelect].join(" ")}`}
            isMulti={isMulti}
            isSearchable={isSearchable}
            isDisabled={disabled}
            placeholder={placeholder}
            options={options}
            styles={{ ...dropDownStyle, ...style }}
            isClearable={false}
            classNamePrefix={customClassName}
            menuPlacement={menuPlacement}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: (e) => DropdownIndicator(e),
              ...(CustomOption && { Option: CustomOption }),
              ...Components,
            }}
            getOptionLabel={(option) => {
              return optionLabel ? option[optionLabel] : option.label;
            }}
            getOptionValue={(option) =>
              optionValue ? option[optionValue] : option.value
            }
            ref={ref}
            {...props}
          />
        ) : (
          <VirtualizedSelect
            inputId={`dropdown${label}`}
            value={value}
            onChange={(e) => {
              setter(e);
            }}
            className={`${[classes.reactSelect].join(" ")}`}
            isMulti={isMulti}
            isSearchable={isSearchable}
            isDisabled={disabled}
            placeholder={placeholder}
            formatOptionLabel={(option) => {
              return optionLabel ? option[optionLabel] : option.label;
            }}
            formatOptionValue={(option) => {
              return optionValue ? option[optionValue] : option.value;
            }}
            options={options}
            styles={{ ...dropDownStyle, ...style }}
            isClearable={false}
            classNamePrefix={customClassName}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: (e) => DropdownIndicator(e),
              ...(CustomOption && { Option: CustomOption }),
              ...Components,
            }}
            getOptionLabel={(option) => {
              return optionLabel ? option[optionLabel] : option.label;
            }}
            getOptionValue={(option) =>
              optionValue ? option[optionValue] : option.value
            }
            {...props}
          />
        )}
        {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}
        {error && <p className={classes.errorText}>{errorText}</p>}
      </div>
    </div>
  );
};

DropDown.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  labelTwo: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.object.isRequired,
  setter: PropTypes.object,
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  customStyle: PropTypes.object,
  style: PropTypes.object,
  Components: PropTypes.object,
  labelClassName: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
};

DropDown.defaultProps = {
  placeholder: "sdsad",
  value: "aaaa",
  disabled: false,
  isMulti: false,
  options: [],
  Components: {},
};
