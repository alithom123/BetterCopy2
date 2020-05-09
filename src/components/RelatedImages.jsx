import React from "react";

const RelatedImages = ({ relatedImages }) => {
  return (
    <div>
      {relatedImages
        ? relatedImages.results.map((eImage, i) => {
            return <img src={eImage.urls.regular} alt=""></img>;
          })
        : ""}
    </div>
  );
};

/* {total: 531, total_pages: 54, results: Array(10)}
results: Array(10)
0:
alt_description: "bunch of bananas"
categories: []
color: "#FAC535"
created_at: "2018-08-07T17:06:27-04:00"
current_user_collections: []
description: "going bananas"
height: 5778
id: "Up2PKkq5kk0"
liked_by_user: false
likes: 71
links: {self: "https://api.unsplash.com/photos/Up2PKkq5kk0", html: "https://unsplash.com/photos/Up2PKkq5kk0", download: "https://unsplash.com/photos/Up2PKkq5kk0/download", download_location: "https://api.unsplash.com/photos/Up2PKkq5kk0/download"}
promoted_at: null
sponsorship: null
tags: (3) [{…}, {…}, {…}]
updated_at: "2020-04-28T01:28:36-04:00"
urls:
full: "https://images.unsplash.com/photo-1533675959813-89562fb90120?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEzMzIxOH0"
raw: "https://images.unsplash.com/photo-1533675959813-89562fb90120?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzMzIxOH0"
regular: "https://images.unsplash.com/photo-1533675959813-89562fb90120?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMzIxOH0"
small: "https://images.unsplash.com/photo-1533675959813-89562fb90120?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEzMzIxOH0"
thumb: "https://images.unsplash.com/photo-1533675959813-89562fb90120?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzMzIxOH0"
__proto__: Object
user: {id: "8Wj4U-9tufs", updated_at: "2020-04-27T05:23:36-04:00", username: "abbsjohnson", name: "abbs johnson", first_name: "abbs", …}
width: 3618 */

export default RelatedImages;
