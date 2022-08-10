import * as express from  'express'
import * as axios from "axios";
const  app = express()

app.get('/ids', async (req:any, res:any)=>{
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
})

const port = 5500
app.listen(port, ()=>console.log('api running on 5500'))