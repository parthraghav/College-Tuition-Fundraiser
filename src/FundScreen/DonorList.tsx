import React, { useEffect, useState } from "react";
import { withFirebase } from "../Core/Firebase";
import CircularAvatar from "./Avatar";
import "./styles.css";
import CircularLoader from "./CircularLoader";
import { numberWithCommas } from "../Utils";

function DonorEntry({ name, amount, index }: any) {
  return (
    <div className="resp-table-row">
      <div className="table-body-cell">
        <div style={{ display: "flex", alignItems: "center" }}>
          <CircularAvatar name={name} index={index} />
          <span>{name}</span>
        </div>
      </div>
      <div className="table-body-cell">${numberWithCommas(amount / 100)}</div>
    </div>
  );
}

const DonorListBase = ({ firebase }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [donorData, setDonorData] = useState<Object[]>([]);
  useEffect(() => {
    const donorListSnap = firebase.db.collection("info").doc("donorlist");

    const unsubscribe = donorListSnap.onSnapshot((snapshot: any) => {
      const data = snapshot.data();
      const dataArr: any = Object.values(data).sort(
        (a: any, b: any) => b.amount - a.amount
      );
      setDonorData(dataArr);
      // if (snapshot.size) {
      //   let donorDataFromSnapshot: any = [];
      //   snapshot.forEach((doc: { data: () => any }) =>
      //     donorDataFromSnapshot.push({ ...doc.data() })
      //   );
      //   setDonorData(donorDataFromSnapshot);
      // } else {
      //   console.log(snapshot, "something's off");
      // }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [firebase]);

  return (
    <div>
      <div
        style={{
          width: "90%",
          maxWidth: "600px",
          margin: "0px auto",
        }}
      >
        <div className="resp-table">
          <div className="resp-table-caption">
            <h1>Shoutout to {donorData.length} people</h1>
            <h3>Who invested in my future</h3>
          </div>

          <div className="resp-table-body">
            {isLoading ? (
              <CircularLoader />
            ) : (
              donorData.map(
                ({ name, amount, anonymous }: any, index: number) => (
                  <DonorEntry
                    key={index}
                    name={anonymous ? "Anonymous" : name}
                    amount={amount}
                    index={index}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DonorList = withFirebase(DonorListBase);

export default DonorList;
