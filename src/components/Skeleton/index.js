import classes from "./Skeleton.module.css";

const variants = {
  rounded: {
    borderRadius: "var(--global-border-radius)",
  },
  circular: {
    borderRadius: "50%",
  },
};

export default function Skeleton({
  className,
  style,
  width = "100%",
  children,
  height,
  variant = "rounded",
}) {
  return (
    <div
      className={[classes.skeleton, className].join(" ")}
      style={{
        ...style,
        width,
        height: height || "300px",
        backgroundColor: "var(--skeleton-color)",
        borderRadius: variants[variant]?.borderRadius,
      }}
    ></div>
  );
}
