import { useSelector } from "react-redux";
import Tour from "./Tour";

function Tours() {
  const { data } = useSelector((state) => state.tour);
  return (
    <section>
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <div>
         
      </div>
    </section>
  );
}

export default Tours;
