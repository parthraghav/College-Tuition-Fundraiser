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
  const [donorData, setDonorData] = useState<object[]>([]);
  useEffect(() => {
    const usersRef = firebase.db.collection("users");
    let query = usersRef.orderBy("totalPaidAmount", "desc");

    const unsubscribe = query.onSnapshot((snapshot: any) => {
      if (snapshot.size) {
        let donorDataFromSnapshot: any = [];
        snapshot.forEach((doc: { data: () => any }) =>
          donorDataFromSnapshot.push({ ...doc.data() })
        );
        setDonorData(donorDataFromSnapshot);
      } else {
        console.log(snapshot, "something's off");
      }
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
            <h1>Shoutout</h1>
            <h3>To everybody who invested in me</h3>
          </div>

          <div className="resp-table-body">
            {isLoading ? (
              <CircularLoader />
            ) : (
              donorData.map(
                ({ name, totalPaidAmount, anonymous }: any, index: number) => (
                  <DonorEntry
                    key={index}
                    name={anonymous ? "Anonymous" : name}
                    amount={totalPaidAmount}
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
