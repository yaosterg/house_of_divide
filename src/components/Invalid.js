import React from "react";

export default function Invalid(props) {
  const { message } = props;
  return message ===
    "Welcome to the page that does not exist. You have entered an invalid URL" ||
    message === "This campus does not exist. Why you so lost?" ? (
    <div>
      <img src="https://pics.me.me/thumb_you-lost-bro-yeah-you-lost-you-lost-bro-yeah-50216839.png"></img>
      <p>{message}</p>
    </div>
  ) : (
    <div>
      <img
        src="https://i0.wp.com/www.alittlebithuman.com/wp-content/uploads/2021/11/jackie-chan-confused.png"
        width="600"
        height="600"
      ></img>
      <p>{message}</p>
    </div>
  );
}
