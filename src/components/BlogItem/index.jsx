import React from "react";
import { useSelector } from "react-redux";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthsTR = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const BlogItem = ({ item }) => {
  const date = new Date(item.publish);
  const lang = useSelector((state) => state.lang);

  return (
    <div
      onClick={() => {
        window.location.href = `/blog/${item.id}`;
      }}
      className={`blog__post`}
      key={item?.id}
    >
      <img src={item?.images[0]?.url} alt={item?.name} />
      <h5>{item?.name}</h5>
      <p>
        {lang === "tr"
          ? monthsTR[date.getMonth()] +
            " " +
            date.getDate() +
            ", " +
            date.getFullYear()
          : months[date.getMonth()] +
            " " +
            date.getDate() +
            ", " +
            date.getFullYear()}
      </p>
    </div>
  );
};

export default BlogItem;
