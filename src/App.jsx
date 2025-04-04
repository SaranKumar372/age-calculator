import image from "./assets/icon-arrow.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [ageYears, setAgeYears] = useState("--");
  const [ageMonths, setAgeMonths] = useState("--");
  const [ageDays, setAgeDays] = useState("--");

  const [dayError, setDayError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);

  function fnday(event) {
    setDay(event.target.value);
    setDayError(event.target.value < 1 || event.target.value > 31);
  }

  function fnmonth(event) {
    setMonth(event.target.value);
    setMonthError(event.target.value < 1 || event.target.value > 12);
  }

  function fnyear(event) {
    setYear(event.target.value);
    setYearError(event.target.value > new Date().getFullYear());
  }

  function calculateAge() {
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    if (!day || !month || !year || dayError || monthError || yearError) {
      return;
    }

    let ageY = today.getFullYear() - birthDate.getFullYear();
    let ageM = today.getMonth() - birthDate.getMonth();
    let ageD = today.getDate() - birthDate.getDate();

    if (ageD < 0) {
      ageM -= 1;
      ageD += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageM < 0) {
      ageY -= 1;
      ageM += 12;
    }

    setAgeYears(ageY);
    setAgeMonths(ageM);
    setAgeDays(ageD);
  }

  return (
    <section>
      <div className="date-input">
        <div className="day">
          <p className="day-heading">DAY</p>
          <input type="number" placeholder="DD" value={day} onChange={fnday} />
          {dayError && <p className="error">Must be a valid day</p>}
        </div>

        <div className="month">
          <p className="month-heading">MONTH</p>
          <input type="number" placeholder="MM" value={month} onChange={fnmonth} />
          {monthError && <p className="error">Must be a valid month</p>}
        </div>

        <div className="year">
          <p className="year-heading">YEAR</p>
          <input type="number" placeholder="YYYY" value={year} onChange={fnyear} />
          {yearError && <p className="error">Must be a valid year</p>}
        </div>
      </div>

      <hr />
      <div className="img" onClick={calculateAge}>
        <img src={image} alt="arrow image" />
      </div>

      <div className="result">
        <p className="year-result"><span>{ageYears}</span> years</p>
        <p className="month-result"><span>{ageMonths}</span> months</p>
        <p className="day-result"><span>{ageDays}</span> days</p>
      </div>
    </section>
  );
}

export default App;
