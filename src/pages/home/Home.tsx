import { iconDollar, iconPerson, logo } from "../../assets/images";
import styles from "./Home.module.scss";
import cn from "classnames";

const Home = () => {
  return (
    <main className={styles.main}>
      <img src={logo} alt="logo" />
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={cn({ [styles.field]: true, [styles.error]: false })}>
            <div className={styles.heading}>
              <label className={styles.label} htmlFor="bill">
                Bill
              </label>
              <span className={styles.errorText}>Can't be zero</span>
            </div>
            <div className={styles.input}>
              <img className={styles.icon} src={iconDollar} alt="icon-dollor" />
              <input type="text" id="bill" name="bill" placeholder="0" />
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.heading}>
              <span className={styles.label}>Select Tip %</span>
              <span className={styles.errorText}>Can't be zero</span>
            </div>
            <div className={styles.tipsContainer}>
              <label htmlFor="5" className={styles.radioBtn}>
                <input type="radio" id="5" name="tip" />
                <span className={styles.displayLabel}>5%</span>
              </label>
              <label htmlFor="10" className={styles.radioBtn}>
                <input type="radio" id="10" name="tip" />
                <span className={styles.displayLabel}>10%</span>
              </label>
              <label htmlFor="15" className={styles.radioBtn}>
                <input type="radio" id="15" name="tip" />
                <span className={styles.displayLabel}>15%</span>
              </label>
              <label htmlFor="25" className={styles.radioBtn}>
                <input type="radio" id="25" name="tip" />
                <span className={styles.displayLabel}>25%</span>
              </label>
              <label htmlFor="50" className={styles.radioBtn}>
                <input type="radio" id="50" name="tip" />
                <span className={styles.displayLabel}>50%</span>
              </label>
              <div className={styles.customWrapper}>
                <label
                  htmlFor="custom"
                  className={cn({
                    [styles.radioBtn]: true,
                    [styles.customBtn]: true,
                    [styles.hide]: false,
                  })}
                >
                  <input type="radio" id="custom" name="tip" />
                  <span className={styles.displayLabel}>Custom</span>
                </label>
                <input
                  className={cn({
                    [styles.customInput]: true,
                    [styles.show]: false,
                  })}
                  type="text"
                  id="customTip"
                  name="customTip"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
          <div className={cn({ [styles.field]: true, [styles.error]: false })}>
            <div className={styles.heading}>
              <label className={styles.label} htmlFor="noOfPeople">
                Number of People
              </label>
              <span className={styles.errorText}>Can't be zero</span>
            </div>
            <div className={styles.input}>
              <img className={styles.icon} src={iconPerson} alt="icon-person" />
              <input
                type="text"
                id="noOfPeople"
                name="noOfPeople"
                placeholder="0"
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
          <button className={styles.btn} type="button">
            <span>Reset</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
