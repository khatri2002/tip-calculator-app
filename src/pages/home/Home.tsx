import { SubmitHandler, useForm } from "react-hook-form";
import { iconDollar, iconPerson, logo } from "../../assets/images";
import styles from "./Home.module.scss";
import cn from "classnames";
import { Inputs } from "./types";
import { useEffect, useRef } from "react";

const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data);
    const bill = Number(data.bill);
    const tip =
      data.tip !== "custom"
        ? Number(data.tip)
        : data.customTip
          ? Number(data.customTip)
          : 0;
    console.log(tip);
  };

  const allowDecimalNumberOnly = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, "");
    const parts = e.currentTarget.value.split(".");
    if (parts.length > 2)
      e.currentTarget.value = parts[0] + "." + parts.slice(1).join("");
  };

  const allowNumberOnly = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
  };

  useEffect(() => {
    if (watch("tip") === "custom") setFocus("customTip");
  }, [watch("tip")]);

  return (
    <main className={styles.main}>
      <img src={logo} alt="logo" />
      <div className={styles.container}>
        <form className={styles.form}>
          <div
            className={cn({
              [styles.field]: true,
              [styles.error]: errors.bill,
            })}
          >
            <div className={styles.heading}>
              <label className={styles.label} htmlFor="bill">
                Bill
              </label>
              <span className={styles.errorText}>{errors.bill?.message}</span>
            </div>
            <div className={styles.input}>
              <img className={styles.icon} src={iconDollar} alt="icon-dollor" />
              <input
                type="text"
                id="bill"
                placeholder="0"
                {...register("bill", {
                  required: { value: true, message: "Required field" },
                  pattern: {
                    value: /^(?!\.$).+$/,
                    message: "Invalid number",
                  },
                  validate: (val) => {
                    return Number(val) === 0 ? "Can't be zero" : true;
                  },
                })}
                onInput={allowDecimalNumberOnly}
              />
            </div>
          </div>
          <div
            className={cn({
              [styles.field]: true,
              [styles.error]: errors.customTip,
            })}
          >
            <div className={styles.heading}>
              <span className={styles.label}>Select Tip %</span>
              <span className={styles.errorText}>
                {errors.customTip?.message}
              </span>
            </div>
            <div className={styles.tipsContainer}>
              <label htmlFor="5" className={styles.radioBtn}>
                <input type="radio" id="5" {...register("tip")} value="5" />
                <span className={styles.displayLabel}>5%</span>
              </label>
              <label htmlFor="10" className={styles.radioBtn}>
                <input type="radio" id="10" {...register("tip")} value="10" />
                <span className={styles.displayLabel}>10%</span>
              </label>
              <label htmlFor="15" className={styles.radioBtn}>
                <input type="radio" id="15" {...register("tip")} value="15" />
                <span className={styles.displayLabel}>15%</span>
              </label>
              <label htmlFor="25" className={styles.radioBtn}>
                <input type="radio" id="25" {...register("tip")} value="25" />
                <span className={styles.displayLabel}>25%</span>
              </label>
              <label htmlFor="50" className={styles.radioBtn}>
                <input type="radio" id="50" {...register("tip")} value="50" />
                <span className={styles.displayLabel}>50%</span>
              </label>
              <div className={styles.customWrapper}>
                <label
                  htmlFor="custom"
                  className={cn({
                    [styles.radioBtn]: true,
                    [styles.customBtn]: true,
                    [styles.hide]: watch("tip") === "custom",
                  })}
                >
                  <input
                    type="radio"
                    id="custom"
                    {...register("tip")}
                    value="custom"
                  />
                  <span className={styles.displayLabel}>Custom</span>
                </label>
                <input
                  className={cn({
                    [styles.customInput]: true,
                    [styles.show]: watch("tip") === "custom",
                  })}
                  type="text"
                  id="customTip"
                  placeholder="0"
                  {...register("customTip", {
                    pattern: {
                      value: /^(?!\.$).+$/,
                      message: "Invalid number",
                    },
                  })}
                  onInput={allowDecimalNumberOnly}
                />
              </div>
            </div>
          </div>
          <div
            className={cn({
              [styles.field]: true,
              [styles.error]: errors.noOfPeople,
            })}
          >
            <div className={styles.heading}>
              <label className={styles.label} htmlFor="noOfPeople">
                Number of People
              </label>
              <span className={styles.errorText}>
                {errors.noOfPeople?.message}
              </span>
            </div>
            <div className={styles.input}>
              <img className={styles.icon} src={iconPerson} alt="icon-person" />
              <input
                type="text"
                id="noOfPeople"
                placeholder="0"
                {...register("noOfPeople", {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                  validate: (val) => {
                    return Number(val) === 0 ? "Can't be zero" : true;
                  },
                })}
                onInput={allowNumberOnly}
              />
            </div>
          </div>
        </form>
        <div className={styles.resultContainer}>
          <div className={styles.values}>
            <div className={styles.value}>
              <div className={styles.label}>
                <span className={styles.hero}>Tip Amount</span>
                <span className={styles.sub}>/ person</span>
              </div>
              <span className={styles.number}>&#36;0.00</span>
            </div>
            <div className={styles.value}>
              <div className={styles.label}>
                <span className={styles.hero}>Total</span>
                <span className={styles.sub}>/ person</span>
              </div>
              <span className={styles.number}>&#36;0.00</span>
            </div>
          </div>
          <button
            className={styles.btn}
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            <span>Reset</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
