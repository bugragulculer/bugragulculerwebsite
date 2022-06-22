import React, { useState, useEffect } from "react";
import Output from "editorjs-react-renderer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useBlog, useOuterClick } from "../../hooks";
import {
  addBlogFavorite,
  removeBlogFavorite,
} from "../../state/actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import { BlogList } from "../../components";
import { LottieIcon } from "../../components";
import {
  heartColor,
  shareLottie,
  heartBlack,
  heartWhite,
  copyLight,
  copyDark,
} from "../../assets";
import { Helmet } from "react-helmet";

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

const BlogPost = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);
  const lang = useSelector((state) => state.lang);
  const products = useSelector((state) => state.product);
  const blogPosts = useSelector((state) => state.blog);
  const theme = "dark";
  const { blog, isLoading, error } = useBlog(params.id);
  const [isFavorited, setIsFavorited] = useState(
    profile?.blogFavorites?.includes(blog.id) || false
  );
  const [shareMenu, setShareMenu] = useState(false);

  const handleFavorite = (state) => {
    isFavorited === false
      ? dispatch(addBlogFavorite(blog.id))
      : dispatch(removeBlogFavorite(blog.id));
    setIsFavorited(state);
  };

  const handleShare = () => {
    setShareMenu(!shareMenu);
  };

  const shareRef = useOuterClick(() => setShareMenu(false));
  const date = new Date(blog.publish);

  useEffect(() => {
    lang !== blog.language && navigate("/blog");
  }, [lang]);

  return (
    !isLoading && (
      <div className="blog__post__container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{blog.name} | Bugra Gulculer</title>
          <meta
            name="description"
            content={blog.description.blocks[0].data.text}
          />
          <html lang={lang} amp />
        </Helmet>
        <main>
          <h3>
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
          </h3>
          <h1>{blog.name}</h1>
          <AdsHeader />
          <img src={blog.images[0]?.url} alt={blog.name} />
          <div className="blog__body">
            <Output data={blog.description} />
          </div>
          {/*<div className="blog__actions">
            <button onClick={() => handleFavorite(!isFavorited)}>
              {isFavorited ? (
                <LottieIcon icon={heartColor} size={36} />
              ) : theme === "dark" ? (
                <LottieIcon icon={heartBlack} size={36} />
              ) : (
                <LottieIcon icon={heartWhite} size={36} />
              )}
            </button>
            <button onClick={() => handleShare()} ref={shareRef}>
              <LottieIcon icon={shareLottie} size={36} />
              {shareMenu && (
                <div className="share__menu">
                  <button>
                    {theme === "dark" ? (
                      <LottieIcon icon={copyDark} />
                    ) : (
                      <LottieIcon icon={copyLight} />
                    )}
                  </button>

                  <a href="https://twitter.com/share?hashtags=awesome,sharing&text=My Page Title or Something Else to share&via=MyTwitterHandle">
                    Twitter
                  </a>
                  <button>instagram</button>
                  <button>facebook</button>
                </div>
              )}
            </button>
          </div>*/}
          <AdsFooter />
        </main>
        <div className="blog__content">
          <h2>Similar Articles</h2>
          <BlogList
            data={blogPosts.items
              .filter((blog) => blog.language === lang)
              .filter((item) => item.id !== blog.id)}
            itemCount={3}
          />
        </div>
      </div>
    )
  );
};

class AdsHeader extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          backgroundColor: "red",
          height: "100%",
        }}
        data-ad-client="ca-pub-4110233041469780"
        data-ad-slot="7875768160"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    );
  }
}

class AdsFooter extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        class="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          backgroundColor: "red",
          height: "100%",
        }}
        data-ad-client="ca-pub-4110233041469780"
        data-ad-slot="6203593849"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    );
  }
}

export default BlogPost;
