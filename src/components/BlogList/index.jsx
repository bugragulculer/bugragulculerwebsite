import React from "react";
import { BlogItem } from "../";

const BlogList = ({ data, itemCount }) => {
  return (
    <div className="blog__posts">
      {itemCount
        ? data.slice(0, itemCount).map((e) => <BlogItem item={e} key={e.id} />)
        : data.map((e) => <BlogItem item={e} key={e.id} />)}
    </div>
  );
};

export default BlogList;
