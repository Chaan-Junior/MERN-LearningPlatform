import PriceChart from "./PriceChart";
import ManualData from "./ManualData";
import Flexing from "./Flexing";

function ShowFirst() {
  return (
    <div>
      <h1>SUMMARY</h1>
      <br />
      <ManualData />
      <br />
      <h1>LATEST COURSES</h1>
      <br />
      <Flexing />
      <br />
      <h1>STATISTICS</h1>
      <br />
      <PriceChart />

      <br />
    </div>
  );
}

export default ShowFirst;