import GraphCandle from "../GraphCandle";
import GraphHoursLabel from "../GraphHoursLabel";

function Graph({ workingHours, today }) {
  return (
    <div className="col-span-5 flex flex-row justify-around items-end h-full">
      <div className="flex flex-col items-center">
        <div className={`${today === "Monday" ? "" : "invisible"}`}>
          <GraphHoursLabel hours={workingHours.Monday} />
        </div>
        <GraphCandle selected={today==="Monday"?true:false} value={workingHours.Monday} />
        <h1>s</h1>
      </div>

      <div className="flex flex-col items-center">
        <div className={`${today === "Tuesday" ? "" : "invisible"}`}>
          <GraphHoursLabel hours={workingHours.Tuesday} />
        </div>
        <GraphCandle selected={today==="Tuesday"?true:false} value={workingHours.Tuesday} />
        <h1>t</h1>
      </div>

      <div className="flex flex-col items-center">
        <div className={`${today === "Wednesday" ? "" : "invisible"}`}>
          <GraphHoursLabel hours={workingHours.Wednesday} />
        </div>
        <GraphCandle selected={today==="Wednesday"?true:false} value={workingHours.Wednesday} />
        <h1>q</h1>
      </div>

      <div className="flex flex-col items-center">
        <div className={`${today === "Thursday" ? "" : "invisible"}`}>
          <GraphHoursLabel hours={workingHours.Thursday} />
        </div>
        <GraphCandle selected={today==="Thursday"?true:false} value={workingHours.Thursday} />
        <h1>q</h1>
      </div>

      <div className="flex flex-col items-center">
        <div className={`${today === "Friday" ? "" : "invisible"}`}>
          <GraphHoursLabel hours={workingHours.Friday} />
        </div>
        <GraphCandle selected={today==="Friday"?true:false} value={workingHours.Friday} />
        <h1>s</h1>
      </div>
    </div>
  );
}

export default Graph;
