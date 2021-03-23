import React, { useState, useEffect } from "react";
import "./FollowedCommerces.scss";
import { getUser } from "../../service/user.service";
import CommerceCard from "../../components/CommerceCard/CommerceCard";
import Empty from "../../components/Empty/Empty";
import SimpleHeader from "../../components/SimpleHeader/SimpleHeader";

const FollowedCommerces = () => {
  const [commerces, setCommerces] = useState([]);
  useEffect(() => {
    getUser().then(
      ({
        data: {
          user: { following },
        },
      }) => {
        setCommerces([...following]);
      }
    );
  });
  return (
    <main className="followedCommerces" style={{ marginTop: "100px" }}>
      <SimpleHeader title="Tus comercios favoritos" />
      <article className="commercesList">
        {commerces.length > 0 ? (
          commerces.map((commerce) => (
            <CommerceCard
              commerce={commerce}
              key={commerce._id}
              cssClass="commerceCard"
            />
          ))
        ) : (
          <Empty txt="Aún no sigues a ningún comercio" />
        )}
      </article>
    </main>
  );
};

export default FollowedCommerces;
