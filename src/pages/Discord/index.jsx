import React, { useState } from "react";
import { discordColor } from "../../assets/";
import { community, friends } from "../../assets";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import i18next from "../../i18n/i18n";

const Discord = () => {
  const lang = useSelector((state) => state.lang);
  return (
    <main className="discord__container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Discord Community | Bugra Gulculer</title>
        <meta
          name="description"
          content="About Discord Community of Bugra Gulculer"
        />
        <html lang={lang} amp />
        <base target="_blank" href="http://localhost:3000/discord" />
      </Helmet>
      <header className="discord__header">
        <div>
          <h2>{i18next.t("discord.header")}</h2>
          <h3>{i18next.t("discord.subheader")}</h3>
        </div>
        <img src={discordColor} alt="" />
      </header>
      <section className="discord__details">
        <img src={community} alt="" />
        <div>
          <h2>{i18next.t("discord.reasons")}</h2>
          <h3>{i18next.t("discord.firstQuestion")}</h3>
          <p>{i18next.t("discord.firstP")}</p>
          <h3>{i18next.t("discord.secondQuestion")}</h3>
          <p>{i18next.t("discord.secondP")}</p>
        </div>
      </section>
      <section className="discord__quick__look">
        <h2>{i18next.t("discord.allCategories")}</h2>
        <h3>{i18next.t("discord.action")}</h3>
        <div className="list__items">
          <DiscordTab
            title={i18next.t("discord.tabs.first")}
            desc={i18next.t("discord.tabs.firstDesc")}
          />
          <DiscordTab
            title={i18next.t("discord.tabs.second")}
            desc={i18next.t("discord.tabs.secondDesc")}
          />
          <DiscordTab
            title={i18next.t("discord.tabs.third")}
            desc={i18next.t("discord.tabs.thirdDesc")}
          />
          <DiscordTab
            title={i18next.t("discord.tabs.fourth")}
            desc={i18next.t("discord.tabs.fourthDesc")}
          />
          <DiscordTab
            title={i18next.t("discord.tabs.fifth")}
            desc={i18next.t("discord.tabs.fifthDesc")}
          />
          <DiscordTab
            title={i18next.t("discord.tabs.sixth")}
            desc={i18next.t("discord.tabs.sixthDesc")}
          />
          <DiscordTab
            title={i18next.t("discord.tabs.seventh")}
            desc={i18next.t("discord.tabs.seventhDesc")}
          />
          <DiscordTab
            title={i18next.t("discord.tabs.eight")}
            desc={i18next.t("discord.tabs.eightDesc")}
          />
        </div>
      </section>
      <section className="join__discord">
        <img src={friends} alt="" />
        <div>
          <h2>{i18next.t("discord.finalCall")}</h2>
          <a
            href={
              lang === "tr"
                ? "https://discord.gg/nS3b5mGWhu"
                : "https://discord.gg/u98MXhXrxw"
            }
            className="button--primary button--large"
          >
            {i18next.t("discord.joinCall")}
          </a>
        </div>
      </section>
    </main>
  );
};

export default Discord;

function DiscordTab({ title, desc }) {
  const [tab, setTab] = useState(false);
  return (
    <button onClick={() => setTab(!tab)} className="discord__tab">
      <h2>{title}</h2>
      {tab && <p>{desc}</p>}
    </button>
  );
}
