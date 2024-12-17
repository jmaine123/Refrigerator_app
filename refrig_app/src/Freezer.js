// import { useState } from "react";

function Freezer() {
    const greeting = 'This is the freezer';
    // const [itemList, setItemList] = useState([]);
    return (
        <div className="freezer refrig-section">
            <h1>{greeting}</h1>
            {/* <p>{itemList}</p> */}
        </div>
    );
  }

  export default Freezer;