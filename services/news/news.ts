import axios from "axios";
import { Article } from "../database/models/Article";
import db from "../database/dbContext";
import * as cheerio from "cheerio";
import { Source } from "../database/models/Source";

export const fetchNews = async () => {
  try {
    const sources: Source[] = await getSources();
    if (!sources || sources.length === 0) return [];

    const allArticles = await Promise.all(
      sources.map(async (source) => {
        const response = await axios.get(source.url);
        const isXML = response.headers["content-type"].includes("xml");
        const parsedData = cheerio.load(response.data, { xml: isXML });

        const articles: Article[] = [];

        if (isXML) {
          const items = parsedData("item, entry");

          items.slice(0, 5).each((_, item) => {
            const fetchedArticle = parsedData(item);

            const imageUrl =
              fetchedArticle.find("media\\:thumbnail, enclosure").attr("url") ||
              "";

            articles.push({
              title: fetchedArticle.find("title").text().trim(),
              body: (
                fetchedArticle.find("description").text() ||
                fetchedArticle.find("summary").text()
              ).trim(),
              imageUrl: imageUrl,
              published: fetchedArticle.find("pubDate, updated").text()
                ? new Date(
                    fetchedArticle.find("pubDate, updated").text(),
                  ).toDateString()
                : "",
              source: source.name || "",
              url:
                fetchedArticle.find("link").text() ||
                fetchedArticle.find("link").attr("href") ||
                "",
            });
          });
        } else {
        }

        return articles;
      }),
    );

    return allArticles.flat();
  } catch (err) {
    console.log(err);
  }
};

export const addSource = async (url: string) => {
  try {
    const response = await axios.get(url);

    const parsedData = cheerio.load(response.data);

    const name = parsedData("title").text();

    await db.runAsync(
      `INSERT INTO Sources (name, url) VALUES ('${name}', '${url}')`,
    );

    console.log("Added source successfully: " + name + " - " + url + "");
  } catch (err) {
    console.log("Adding source FAILED: " + err);
  }
};

export const getSources = async () => {
  try {
    const rows = await db.getAllAsync("SELECT * FROM Sources");

    return rows.map((row: any): Source => {
      return {
        id: row.id,
        name: row.name,
        url: row.url,
      };
    });
  } catch (err) {
    console.log("Get Sources Failed: " + err);
  }
};

export const deleteAllSources = async () => {
  try {
    await db.runAsync("DELETE * FROM Sources");

    console.log("Deleted all news sources successfully");
  } catch (err) {
    console.log("Deleting all news sources failed: " + err);
  }
};

export const deleteSourceFromDatabase = async (id: number) => {
  try {
    await db.runAsync(`DELETE FROM Sources WHERE id = ${id}`);

    console.log("Deleted news source successfully");
  } catch (err) {
    console.log("Deleting news source FAILED " + err);
  }
};
