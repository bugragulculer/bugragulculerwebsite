import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setLoading } from "../../state/actions/miscActions";
import { getAllBlog } from "../../state/actions/blogActions";
import { getAllTags } from "../../state/actions/tagsActions";
import { BlogList } from "../../components";
import { Helmet } from "react-helmet";
import i18next from "../../i18n/i18n";

const Blog = () => {
  const [isFetching, setFetching] = useState(false);
  const lang = useSelector((state) => state.lang);
  const [tag, setTag] = useState("");
  const dispatch = useDispatch();
  const store = useSelector(
    (state) => ({
      blog: state.blog,
      isLoading: state.app.loading,
      tags: state.tags,
    }),
    shallowEqual
  );

  const fetchBlog = () => {
    setFetching(true);
    dispatch(getAllBlog());
    dispatch(getAllTags());
  };

  useEffect(() => {
    fetchBlog();

    window.scrollTo(0, 0);
    return () => dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [store.blog.lastRefKey]);

  const handleTagChange = (item) => {
    item === tag ? setTag("") : setTag(item);
  };

  const filteredPosts =
    tag === ""
      ? store.blog.items
      : store.blog.items.map((item) =>
          item.tags.map((e) => e.id === tag).includes(true)
        );

  return (
    <div className="blog__container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog | Technology, Software | Bugra Gulculer</title>
        <meta
          name="description"
          content="Blog of Bugra Gulculer | Technology, Front-end, React, Software Articles"
        />
        <html lang={lang} amp />
      </Helmet>
      <div className="blog__header">
        <h1>{i18next.t("blog.blogHeader")}</h1>
      </div>
      <div className="blog__tags">
        <h2>{i18next.t("blog.searchBlog")}</h2>
        <div>
          {store.tags.items.map((e) => (
            <button
              className={tag === e.id ? "button--tag--active" : undefined}
              onClick={() => handleTagChange(e.id)}
            >
              {lang === "tr" ? e.etiket : e.tag}
            </button>
          ))}
        </div>
      </div>
      {!isFetching &&
        tag === "" &&
        store.blog.items
          .filter((blog) => blog.isFeatured === "on")
          .filter((blog) => blog.language === lang)
          .slice(0, 1)
          .map((e) => (
            <div className="blog__featured">
              <div>
                <div>
                  <h3>{i18next.t("blog.featuredArticle")}</h3>
                  <h2>{e.name}</h2>
                  <p>{e.publish}</p>
                </div>
                <Link to={`/blog/${e.id}`}>
                  {i18next.t("blog.readFullArticle")}
                </Link>
              </div>
              <div>
                <img src={e.images[0]?.url} alt="" />
              </div>
            </div>
          ))}
      <BlogList
        data={store.blog.items
          .filter((e, index) => filteredPosts[index])
          .sort(
            (a, b) =>
              new Date(b.publish).getTime() - new Date(a.publish).getTime()
          )
          .filter((blog) => blog.language === lang)}
      />
    </div>
  );
};

export default Blog;
