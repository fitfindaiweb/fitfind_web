// import classes from "./loader.module.css";

// export const Loader = ({ className }) => {
//   return (
//     <div className={`${classes.loaderContainer} ${className || ""}`}>
//       <div className={classes.loaderBox}>
//         <div className={classes.diamondContainer}>
//           <div className={classes.diamondGroup1}>
//             <div className={`${classes.diamond} ${classes.diamond1}`}></div>
//             <div className={`${classes.diamond} ${classes.diamond2}`}></div>
//             <div className={`${classes.diamond} ${classes.diamond3}`}></div>
//           </div>

//           <div className={classes.diamondGroup2}>
//             <div className={`${classes.diamond} ${classes.diamond4}`}></div>
//             <div className={`${classes.diamond} ${classes.diamond5}`}></div>
//             <div className={`${classes.diamond} ${classes.diamond6}`}></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import classes from "./loader.module.css";

export const Loader = ({ className }) => {
  return (
    <div className={`${classes.loaderContainer} ${className || ""}`}>
      <div className={classes.loaderBox}>
        <div className="d-flex gap-2">
          <div className={`${classes.loader} ${className || ""}`}></div>
          <div className={`${classes.loader1} ${className || ""}`}></div>
        </div>
      </div>
    </div>
  );
};
