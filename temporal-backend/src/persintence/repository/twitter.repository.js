import { Twitter } from "../models/Twitter.js";

export async function getTweets_() {
  try {
    const twitter = await Twitter.findAll({
      attributes: ["id", "nombre", "token"],
      order: [["id", "DESC"]],
    });
    return twitter;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while retrieving information from X.");
  }
}

export async function createTweet_(twitter) {
  const { nombre, token } = twitter;
  console.log("twitter:", twitter);
  try {
    const newTwitter = await Twitter.create({
      nombre,
      token,
    });
    return newTwitter;
  } catch (error) {
    throw new Error("An error occurred while creating X data.");
  }
}

export async function updateTweet_(twitter) {
  const { id, nombre, token } = twitter;
  try {
    const twitter_update = await Twitter.findByPk(id);
    if (!twitter_update) {
      throw new Error("X information not found.");
    }
    twitter_update.nombre = nombre;
    twitter_update.token = token;
    await twitter_update.save();
    return twitter_update;
  } catch (error) {
    throw new Error("An error occurred while updating X information.");
  }
}

export async function deleteTweet_(id) {
  try {
    const twitter = await Twitter.findByPk(id);
    if (!twitter) {
      throw new Error("X information not found.");
    }
    await twitter.destroy();
    return "X information successfully removed.";
  } catch (error) {
    throw new Error("An error occurred while deleting information from X.");
  }
}
