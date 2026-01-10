import { cn } from "@/helper/HelperFunction";
import classes from "./Label.module.css";
export const Label = ({ disabled, labelOnTop, children, ...props }) => {
  return (
    <label
      className={cn(
        classes.labelText,
        disabled && classes.disabled,
        labelOnTop && classes.onTopLabel
      )}
      {...props}
    >
      {children}
    </label>
  );
};
