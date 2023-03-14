const axios = require("axios");

const twitterAPI = axios.create({
    baseURL: 'https://api.twitter.com/2/users',
    headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${'AAAAAAAAAAAAAAAAAAAAANSAfgEAAAAAYbp037LkoqrkOlf6PtAlR3uRXdA%3DmEPLU46ysAupdKfgaB3FYmPwwcS99UxnnbpNxL38nQdIxHHTHK'}`
    },
    timeout: 60 * 1000
});


exports.getFollowers = async (req, res) => {
    try {
        const username = req.params.username;
        console.log(username);
        const response = await twitterAPI.get(`/by/username/${'elonmusk'}`);
        if (response.status !== 200) return 0;
        const {id} = response.data.data;
        console.log(response.data);

        const ta = await twitterAPI(`/${id}/followed_lists?list.fields=created_at,follower_count,id,name`)
        console.log(ta.data);

        const _response = await twitterAPI.get(`/${id}/followers`);
        console.log(_response.data.data);
        if (_response.status !== 200) return 0;

        const {result_count: followers} = _response.data.meta;
        res.status(200).send({status: true, followers: followers});
    } catch (e) {
        res.status(400).send({status: false, message: e});
        console.log(e);
    }

}