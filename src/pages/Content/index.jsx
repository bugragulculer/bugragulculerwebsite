import React from "react";
import { Link } from "react-router-dom";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import InstagramFeed from "react-ig-feed";
import "react-ig-feed/dist/index.css";
import { ReactComponent as YouTube } from "../../assets/icons/youtube.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import { ReactComponent as Instagram } from "../../assets/icons/youtube.svg";
import { BlogList } from "../../components";
import { useSelector } from "react-redux";
import { camera } from "../../assets";
import { Helmet } from "react-helmet";

const Content = () => {
  const blogPosts = useSelector((state) => state.blog);
  const lang = useSelector((state) => state.lang);
  return (
    <div className="content__page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Content | YouTube, Blog, Social Media | Bugra Gulculer</title>
        <meta
          name="description"
          content="Content of Bugra Gulculer | YouTube Videos, Blog Posts, Articles, Twitter, Instagram, TikTok"
        />
        <html lang={lang} amp />
        <base target="_blank" href="http://localhost:3000" />
      </Helmet>
      <header>
        <img src={camera} alt="" />
        <div>
          <h1>My Content</h1>
          <p>
            I publish different types of content, from Youtube videos to blog
            posts.
          </p>
        </div>
      </header>
      <main>
        <section>
          <h2>
            <YouTube />
            YouTube
          </h2>
          <p>
            I publish videos on my YouTube Channel about programming,
            technology, software and lifestyle.
          </p>
        </section>
        <h2>My Latest Videos</h2>
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
          <h2>Do you prefer reading?</h2>
          <p>
            I publish blog posts on different topics. Here are some examples!
          </p>
          <div>
            <BlogList data={blogPosts.items} itemCount={6} />
          </div>
          <Link to="/blog" className="button--primary button--large">
            All Articles
          </Link>
        </section>
        <section className="social__media">
          <h2>Follow me on Social Media</h2>
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
  );
};

export default Content;
