import React from "react";

const RelatedImages = ({ relatedImages }) => {
  // const renderImageGrid = () => {
  //   for (let i = 0; i < 3; i++) {
  //     return <p></p>;
  //   }
  // };

  // var rows = [];
  // for (var i = 0; i < 9; i++) {
  //   // note: we add a key prop here to allow react to uniquely identify each
  //   // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
  //   rows.push(<div className="" key={i} />);
  // }
  // return <tbody>{rows}</tbody>;

  //* https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
  //* https://medium.com/sovtech-insights/how-to-generate-bootstrap-or-any-grids-dynamically-in-react-23df139199a8

  return (
    <>
      <div>
        {relatedImages
          ? relatedImages.results.map((eImage, i) => {
              return (
                <img
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                  src={eImage.urls.regular}
                  alt=""
                ></img>
              );
            })
          : ""}
      </div>

      {/* TODO: How do I render this as a grid using loops? */}
      {/* <div className="container">{renderImageGrid(relatedImages)}</div> */}
      {/* Show images in a grid like ideo method cards https://www.amazon.com/IDEO-Method-Cards-Inspire-Design/dp/0954413210?utm_source=zapier.com&utm_medium=referral&utm_campaign=zapier */}

{/*         <div className="row">
          <div className="col">
            <img
              alt=""
              src={relatedImages.results[0].urls.regular}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            ></img>
          </div>
          <div className="col">
            <img
              alt=""
              src={relatedImages.results[1].urls.regular}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            ></img>
          </div>
          <div className="col">
            <img
              alt=""
              src={relatedImages.results[2].urls.regular}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            ></img>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <img
              alt=""
              src={relatedImages.results[3].urls.regular}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            ></img>
          </div>
          <div className="col">
            <img
              alt=""
              src={relatedImages.results[4].urls.regular}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            ></img>
          </div>
          <div className="col">
            <img
              alt=""
              src={relatedImages.results[5].urls.regular}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            ></img>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <img
              alt=""
              src={relatedImages.results[6].urls.regular}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            ></img>
          </div>
          <div className="col">
            <img
              alt=""
              src={relatedImages.results[7].urls.regular}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            ></img>
          </div>
          <div className="col">
            <img
              alt=""
              src={relatedImages.results[8].urls.regular}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            ></img>
          </div>
        </div> */}
    </>
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
