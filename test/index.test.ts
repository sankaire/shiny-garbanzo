const chai = require("chai")
const chaihttp = require("chai-http")
const app = require('../src/index')
// assertation style
chai.should()
chai.use(chaihttp)

// home api tests
describe("frequent words", () => {
    // get home route
    describe("get /words", () => {
        it("should return a json object", done => {
            chai
                .request(app)
                .get("/words")
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.a("array")
                    done()
                })
        })
    })
})
describe('last seven days', ()=>{
    describe('get last/posted',()=>{
        it("should return an array of objects", done => {
            chai
                .request(app)
                .get("/last/posted")
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.a("array")
                    done()
                })
        })
})
})

export {}