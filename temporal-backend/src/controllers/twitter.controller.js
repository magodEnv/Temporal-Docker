import {
    getTweets_,
    createTweet_,
    updateTweet_,
    deleteTweet_
} from "../persintence/repository/twitter.repository.js";

export async function createTweet(req, res) {
    const { nombre, token } = req.body;
    const twitter = {
        nombre,
        token,
    }
    createTweet_(twitter).then(
        (data) => {
            res.status(200).json({ status: true, data: data });
        }, (error) => {
            res.status(400).json({ status: false, error: error.message });
        }
    )
}

export async function getTweets(req, res) {
    getTweets_().then(data => {
        res.status(200).json({ status: true, data: data })
    }, error => {
        res.status(400).json({ status: false, error: error.message })
    })
};

export async function updateTweet(req, res) {
    const { id } = req.params;
    const { nombre, token } = req.body;
    const twitter = {
        id,
        nombre,
        token,
    };
    updateTweet_(twitter).then(
        (msg) => {
            res.status(200).json({ status: true, msg: msg });
        }, (error) => {
            res.status(400).json({ status: false, error: error.message });
        }
    );
}

export async function deleteTweet(req, res) {
    const { id } = req.params;
    deleteTweet_(id).then(msg => {
        res.status(200).json({ status: true, msg: msg });
    }, error => {
        res.status(400).json({ status: false, error: error.message });
    });
}