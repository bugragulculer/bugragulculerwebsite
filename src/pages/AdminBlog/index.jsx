import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AdminNav } from "../../components";
import { removeBlog } from "../../state/actions/blogActions";

const AdminBlog = () => {
  const params = useLocation();
  const dispatch = useDispatch();
  const blogPosts = useSelector((state) => state.blog);

  const handleDelete = (id) => {
    dispatch(removeBlog(id));
  };

  return (
    <div className="admin__page__container">
      <AdminNav location={params.pathname} />

      <div className="admin__blog__posts">
        <div className="admin__blog__posts__header">
          <h2>Blog posts</h2>
          <Link
            to="/admin/add_blog_post"
            className="button--primary button--large"
          >
            Add +
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Blog Post</th>
              <th>Date</th>
              <th>Author</th>
              <th>Tags</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.items.map((e) => (
              <tr key={e.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{e.name}</td>
                <td>{e?.publish || "-"}</td>
                <td>{e?.author || "-"}</td>
                <td>{e.tags.map(e => e.tag + " ")}</td>
                <td>
                  <Link to={`/admin/blog_posts/${e.id}`}>edit</Link>
                  <button onClick={() => handleDelete(e.id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlog;
