import { Source } from "../database/models/Source";
import axios from "axios";
import { RSS } from "../database/models/RSS";
import { AppDataSource } from "../database/dbContext";
import * as cheerio from "cheerio";

export class News {
  constructor() {}

  async GetRSS() {
    try {
      return await this.FetchRSS();
    } catch (err) {
      console.log("GetRSS Failed" + err);
    }
  }

  async FetchRSS() {
    try {
      let AllRSS: RSS[] = [];
      //1-get links
      let rsslinks = await this.GetSources();
      //2-iterate over links and fetch rss
      for (let i = 0; i < rsslinks.length; i++) {
        let rsslink = rsslinks[i].url;
        let response = await axios.get(rsslink);
        let rssData = htmlparser2.parseFeed(response.data);
        const feeditemsxml = cheerio.load(response.data);
        let links: string[] = [];
        let thumbnaillink = feeditemsxml("media\\:thumbnail, enclosure").each(
          (index, value) => {
            let link = feeditemsxml(value).attr("url");
            console.log("thumb url = " + link);
            links.push(link);
          },
        );
        for (let i = 0; i < 5; i++) {
          let feeditem = rssData.items[i];
          let newfeed: RSS = {
            title: feeditem.title,
            imageUrl: links[i],
            published: feeditem.pubDate.toDateString(),
            source: rssData.title,
            url: feeditem.link,
          };
          AllRSS.push(newfeed);
        }
      }
      return AllRSS;
    } catch (err) {
      console.log(err);
    }
  }

  async AddLink(url: string) {
    try {
      let newsource = new Source(url);
      await AppDataSource.manager.save(newsource);
      console.log("Adding Link Successful");
    } catch (err) {
      console.log("Adding Link FAILED: " + err);
    }
  }

  async GetSources() {
    try {
      return await AppDataSource.manager.find(Source);
    } catch (err) {
      console.log("Get Links Failed: " + err);
    }
  }

  async DeleteLinks() {
    try {
      await AppDataSource.manager.clear(Source);
      console.log("Deleted All Links");
    } catch (err) {
      console.log("Deleting All Links failed: " + err);
    }
  }

  async DeleteLinkFromDatabase(id: number) {
    try {
      await AppDataSource.manager.delete(Source, id);
      console.log("Deleted saved source successfully");
    } catch (err) {
      console.log("Deleting saved source FAILED " + err);
    }
  }
}

export const newsService = new News();
