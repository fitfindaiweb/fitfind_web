import { cn } from "@/helper/HelperFunction";
import classes from "./Separator.module.css";

export default function Separator({type= "vertical"}) {
  return (
    <hr className={cn(classes.separator, classes[type])}/>
  );
}
