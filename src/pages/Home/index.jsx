import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BlogList } from "../../components";
import { Helmet } from "react-helmet";
import {
  LogoWhite,
  LogoDark,
  ArrowRight,
  ArrowRightLight,
  community2,
  blog,
  content,
  course,
  bugraoffice,
} from "../../assets";
import { LottieIcon } from "../../components";
import i18next from "../../i18n/i18n";
import { setLoading } from "../../state/actions/miscActions";
import { getAllBlog } from "../../state/actions/blogActions";
import { getAllTags } from "../../state/actions/tagsActions";

const Home = () => {
  const blogPosts = useSelector((state) => state.blog);
  const lang = useSelector((state) => state.lang);
  const theme = useSelector((state) => state.theme);
  const [tab, setTab] = useState("blog");
  const dispatch = useDispatch();

  const fetchBlog = () => {
    dispatch(getAllBlog());
    dispatch(getAllTags());
  };
  useEffect(() => {
    fetchBlog();

    window.scrollTo(0, 0);
    return () => dispatch(setLoading(false));
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Bugra Gulculer</title>
        <meta
          name="description"
          content="Home of Bugra Gulculer, Front-end Developer, Designer and Content Creator"
        />
        <html lang={lang} amp />

        <meta property="og:title" content="Bugra Gulculer" />
        <meta
          property="og:description"
          content="Home of Bugra Gulculer, Front-end Developer, Designer and Content Creator"
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Buğra Gülcüler" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bugra Gulculer" />
        <meta
          name="twitter:description"
          content="Home of Bugra Gulculer, Front-end Developer, Designer and Content Creator"
        />
        <meta name="twitter:site" content="@bugragulculer" />
        <meta name="twitter:creator" content="@bugragulculer" />
      </Helmet>
      <main className="header__containers">
        <section className="bugra__intro">
          <img src={bugraoffice} alt="bugra at office" />
          <div>
            <img
              src={theme === "dark" ? LogoWhite : LogoDark}
              alt="Bugra Gulculer Logo"
            />
            <h3>{i18next.t("home.heroSection.header")}</h3>
            <a
              href="https://medium.com/@bugragulculer"
              className="button--primary button--large"
            >
              {i18next.t("home.heroSection.primary-button")}
            </a>
            <a
              href="https://www.youtube.com/channel/UCbxvcNnIvtiF_1VZKMPyWCA"
              className={`button--outline button--large`}
            >
              {i18next.t("home.heroSection.secondary-button")}
            </a>
          </div>
        </section>
        <section className={`introduction introduction--${theme}`}>
          <div className="introduction__wrapper">
            <div>
              <h2>{i18next.t("home.introduction.header")}</h2>
              <h3>{i18next.t("home.introduction.paragraph")}</h3>
            </div>
            <div className="introduction__video">
              <iframe
                src="https://www.youtube.com/embed/F_hwsZcm2j4"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                title="video"
              />
            </div>
          </div>
          <a href="/about" className={`button--primary button--large`}>
            {i18next.t("home.introduction.action")}
            <LottieIcon icon={ArrowRightLight} size={32} />
          </a>
        </section>
        <section className={`blog__section blog__section--${theme}`}>
          <div className="blog__section__details">
            <div>
              <h2>{i18next.t("home.blogSection.header")}</h2>
              <h3>{i18next.t("home.blogSection.subheader")}</h3>
            </div>
            <a href="/blog" className={`button--primary button--large`}>
              {i18next.t("home.blogSection.action")}
              <LottieIcon icon={ArrowRightLight} size={32} />
            </a>
          </div>
          <BlogList
            data={blogPosts.items.filter((blog) => blog.language === lang)}
            itemCount={3}
          />
        </section>
        <section className="blog__featured__wrapper">
          {blogPosts.items
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
        </section>
        <section className={`problem__solution problem__solution--${theme}`}>
          <div className="problem__solution__details">
            <div className="content__wrapper">
              <div>
                <h2>{i18next.t("home.youtube.header")}</h2>
                <h3>{i18next.t("home.youtube.subheader")}</h3>
              </div>
              <iframe
                src="https://www.youtube.com/embed/F_hwsZcm2j4"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                title="video"
              />
            </div>
            <div className="button--outline button--large">
              {i18next.t("home.problemSolution.action")}
              {theme === "light" ? (
                <LottieIcon icon={ArrowRight} size={32} />
              ) : (
                <LottieIcon icon={ArrowRightLight} size={32} />
              )}
            </div>
          </div>
        </section>
        <section>
          <form
            action="https://youtube.us4.list-manage.com/subscribe/post?u=202596093129dd9f85893dc69&amp;id=de8bc456c2"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            class="validate"
            target="_blank"
            novalidate
            className="newsletter__form"
          >
            <h2>{i18next.t("home.newsletter.header")}</h2>
            <h3>{i18next.t("home.newsletter.subheader")}</h3>
            <div class="mc-field-group">
              <label for="mce-NAME">{i18next.t("home.newsletter.name")}</label>
              <input
                type="text"
                value=""
                name="NAME"
                className=""
                id="mce-NAME"
                placeholder={i18next.t("home.newsletter.nameholder")}
              />
            </div>
            <div class="mc-field-group">
              <label for="mce-EMAIL">
                {i18next.t("home.newsletter.email")}
              </label>
              <input
                type="email"
                value=""
                name="EMAIL"
                className="required email"
                id="mce-EMAIL"
                placeholder={i18next.t("home.newsletter.emailholder")}
              />
            </div>
            <div id="mce-responses" class="clear foot">
              <div class="response" id="mce-error-response"></div>
              <div class="response" id="mce-success-response"></div>
            </div>

            <button type="submit" className="button--primary button--large">
              {i18next.t("home.newsletter.join")}
            </button>
          </form>
        </section>
        <section className={`discord__section discord__section--${theme}`}>
          <div className="discord__section__details">
            <div>
              <h2>{i18next.t(`home.discord.header`)}</h2>
              <h3>{i18next.t(`home.discord.subheader`)}</h3>
              <Link to="/discord" className={`button--primary button--large`}>
                {i18next.t(`home.discord.action`)}
                <LottieIcon icon={ArrowRightLight} size={32} />
              </Link>
            </div>
            <div>
              <img src={community2} alt="" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
