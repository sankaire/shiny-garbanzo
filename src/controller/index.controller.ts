import * as axios from "axios";

const lastPosted = async (req:any, res:any) =>{
    let result:any
    let storiesArray:[] = []
    try {
        // @ts-ignore
        const data: any = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        const response: [] = data.data.slice(0, 7)
        for (const element of response) {
            // @ts-ignore
            let data: any = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`)
            result = data.data
            // console.log(result)
            // @ts-ignore
            storiesArray.push(result)
        }
        // @ts-ignore
        let lastSevenDaysPost = storiesArray.reverse().filter((items:any)=>{
            let date = new Date(items.time).toLocaleDateString('en-US')
            // @ts-ignore
            let lastWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
            console.log(new Date(lastWeek).toLocaleString('en-US'))
        })
        // @ts-ignore
        return res.json(storiesArray)

    } catch (e) {
        console.log(e.message)
    }
}
const frequentWords = async (req:any, res:any)=>{
    try{
        // @ts-ignore
        let response:any = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
        let data = response.data
        const sliced = data.slice(0, 25)
        let result
        let b = []
        for (const element of sliced) {
            // @ts-ignore
            let data:any = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`)
            result = data.data
            console.log(result)
            b.push(result)
        }
        let titles = b.map(items=>items.title)
        let arr = titles.toString().split(' ')
        let num = 10
        const mostFrequent = (arr:any[] = [], num:number = 1) => {
            const map:any = {};
            let keys:any[] = [];
            for (let i = 0; i < arr.length; i++) {
                if (map[arr[i]]) {
                    map[arr[i]]++;
                } else {
                    map[arr[i]] = 1;
                }
            }
            for (let i in map) {
                keys.push(i);
            }
            keys = keys.sort((a, b) => {

                if (map[a] === map[b]) {

                    if (a > b) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
                else {
                    return map[b] - map[a];
                }
            })
                .slice(0, num);
            return keys;
        };
        return res.json(mostFrequent(arr, num))
    }catch (err){
        console.log(err.message)
    }
}
module.exports = {
    lastPosted,
    frequentWords
}