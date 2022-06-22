import React from "react";
import { bugra, toolsy, producter, tokentree } from "../../assets";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import InstagramFeed from "react-ig-feed";
import "react-ig-feed/dist/index.css";
import { camera } from "../../assets";
import { ReactComponent as YouTube } from "../../assets/icons/youtube.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import { ReactComponent as Instagram } from "../../assets/icons/youtube.svg";
import { BlogList } from "../../components";
import { Link } from "react-router-dom";
import i18next from "../../i18n/i18n";

const About = () => {
  const lang = useSelector((state) => state.lang);
  const blogPosts = useSelector((state) => state.blog);
  return (
    <div className="about" key={lang}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About me | Bugra Gulculer</title>
        <meta
          name="description"
          content="About Bugra Gulculer, Front-end Developer skills, Designer portfolio and Contents he has created"
        />
        <html lang={lang} amp />
      </Helmet>
      <header className={`about__header`}>
        <img src={bugra} alt="Header" />
        <div className="header__text">
          <h1>{i18next.t("about.greeting")}</h1>
          <h2>{i18next.t("about.intro")}</h2>
        </div>
      </header>
      <section className="about__subheader">
        <h3>{i18next.t("about.intro2")}</h3>
        <p>{i18next.t("about.intro3")}</p>
      </section>
      <section>
        <div className={`abilities`}>
          {MyAbilities.map((e, index) => (
            <div className="abilities__half" key={e.header}>
              <h2>{e.header}</h2>
              <p>{e.desc}</p>
              <h3>{e.topic1}</h3>
              <p>{e.item1}</p>
              <h3>{e.topic2}</h3>
              {e.item2.map((f) => (
                <p key={f}>{f}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
      <h2>{i18next.t("about.projects.projects")}</h2>
      <section className="project">
        <div>
          <h2>Toolsy</h2>
          <p>{i18next.t("about.projects.toolsy")}</p>
        </div>
        <img src={toolsy} alt="" />
      </section>
      <section className="project project--reverse">
        <img src={tokentree} alt="" />
        <div>
          <h2>TokenTree</h2>
          <p>{i18next.t("about.projects.tokentree")}</p>
        </div>
      </section>
      <section className="project">
        <div>
          <h2>Producter</h2>
          <p>{i18next.t("about.projects.producter")}</p>
        </div>
        <img src={producter} alt="" />
      </section>
      <section className="professional__buttons">
        <a href="https://github.com/bugragulculer">
          ⌨️
          {" " + i18next.t("about.buttons.github")}
        </a>
        <a href="https://dribbble.com/BugraGulculer">
          🎨
          {" " + i18next.t("about.buttons.dribbble")}
        </a>
      </section>
      <div className="content__page">
        <header>
          <img src={camera} alt="" />
          <div>
            <h1>{i18next.t("about.content.header")}</h1>
            <p>{i18next.t("about.content.paragraph")}</p>
          </div>
        </header>
        <main>
          <section>
            <h2>
              <YouTube />
              YouTube
            </h2>
            <p>{i18next.t("about.content.youtubeP")}</p>
          </section>
          <h2>{i18next.t("about.content.videos")}</h2>
          <section className="youtube__videos">
            <iframe
              src="https://www.youtube.com/embed/I8IYOnclUac"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
            />
            <iframe
              src="https://www.youtube.com/embed/L9VOdPZv_X8"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
            />
          </section>
          <section className="blog__section">
            <h2>{i18next.t("about.content.read")}</h2>
            <p>{i18next.t("about.content.readP")}</p>
            <div>
              <BlogList
                data={blogPosts.items.filter((blog) => blog.language === lang)}
                itemCount={6}
              />
            </div>
            <Link to="/blog" className="button--primary button--large">
              {i18next.t("about.content.readButton")}
            </Link>
          </section>
          <section className="social__media">
            <h2>{i18next.t("about.content.socialMedia")}</h2>
            <div className="social__media__channels">
              <div>
                <h3>
                  <Twitter />
                  Twitter
                </h3>
                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName="BugraGulculer"
                  options={{ height: 600, width: 400 }}
                />
              </div>
              <div>
                <h3>
                  <Instagram />
                  Instagram
                </h3>
                <InstagramFeed
                  token="IGQVJYeU5MaEtJbHFnblpOMHFCbmJUNWR1ZAXp5Vm9jVEEzQ0VNanpSRjN5UHlybmtmUUVBM3ktLTNnTXVqSGJCXzd4aXRraTNqWmFpTmdsNjloZA1htUmlaVzllUHFVWDRPMkd3QnA2eTFkZAXFtVUpTMgZDZD"
                  counter="6"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const MyAbilities = [
  {
    header: i18next.t("about.designer.header"),
    desc: i18next.t("about.designer.paragraph"),
    topic1: i18next.t("about.designer.secondHeader"),
    item1: i18next.t("about.designer.secondSubheader"),
    topic2: i18next.t("about.designer.thirdHeader"),
    item2: [
      "Affinity Designer",
      "Adobe Photoshop",
      "Figma",
      "Webflow",
      "Invision",
      "Pen & Paper",
    ],
  },
  {
    header: i18next.t("about.developer.header"),
    desc: i18next.t("about.developer.paragraph"),
    topic1: i18next.t("about.developer.secondHeader"),
    item1: i18next.t("about.developer.secondSubheader"),
    topic2: i18next.t("about.developer.thirdHeader"),
    item2: ["Terminal", "GitHub", "Storybook", "Visual Studio Code", "Codepen"],
  },
];

export default About;
