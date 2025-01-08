import { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import cn from "classnames";
import CountUp from "react-countup";

import { tips } from "./data";
import { Inputs, Result } from "./types";
import { allowDecimalNumberOnly, allowNumberOnly } from "./utils";
import { iconDollar, iconPerson, logo } from "../../assets/images";
import styles from "./Home.module.scss";

const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>();

  const [result, setResult] = useState<Result>({
    tipPerPerson: 0,
    totalPerPerson: 0,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const bill = Number(data.bill);
    const tip = Number(data.tip === "custom" ? data.customTip || 0 : data.tip);
    const noOfPeople = Number(data.noOfPeople);

    const tipAmount = (bill * tip) / 100;
    const tipPerPerson = +(tipAmount / noOfPeople).toFixed(2);
    const totalPerPerson = +((bill + tipAmount) / noOfPeople).toFixed(2);

    setResult({
      tipPerPerson,
      totalPerPerson,
    });
  };

  useEffect(() => {
    // autofocus on customTip input if 'custom' is selected
    if (watch("tip") === "custom") setFocus("customTip");

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              {tips.map((tip, index) => (
                <label
                  key={index}
                  htmlFor={`tip-${tip}`}
                  className={styles.radioBtn}
                >
                  <input
                    type="radio"
                    id={`tip-${tip}`}
                    {...register("tip")}
                    value={tip}
                  />
                  <span className={styles.displayLabel}>{tip}%</span>
                </label>
              ))}
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
              <CountUp
                className={styles.number}
                prefix="&#36;"
                end={result.tipPerPerson}
                decimals={2}
              />
            </div>
            <div className={styles.value}>
              <div className={styles.label}>
                <span className={styles.hero}>Total</span>
                <span className={styles.sub}>/ person</span>
              </div>
              <CountUp
                className={styles.number}
                prefix="&#36;"
                end={result.totalPerPerson}
                decimals={2}
              />
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
