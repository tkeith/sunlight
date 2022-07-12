import crypto from 'crypto'

describe('check home page', function () {
  this.timeout(30000)
  let page
  before(async () => page = await getPage())

  it('should say hello', async function () {
    await page.goto(baseUrl + '/examples/hello')
    const body = await page.waitForSelector('body')
    const text = await body.evaluate(el => el.textContent)
    expect(text).to.contain('Hello')
  })

})

describe('save and load data via the UI', async function () {
  const text = "random test text " + crypto.randomBytes(32).toString('hex')

  this.timeout(30000)
  let page
  before(async () => page = await getPage())

  beforeEach(function (done) {
    if (this.currentTest.currentRetry() > 0) {
      setTimeout(done, this.currentTest.currentRetry() * 100);
    } else {
      done();
    }
  });

  it('should return the saved value', async function () {
    await page.goto(baseUrl + '/examples')
    const input = await page.waitForSelector('#saveTextMongoSection input')
    await input.click({ clickCount: 3 })
    await page.keyboard.type(text)
    await page.click('#saveTextMongoSection button')
  })

  it('test part 2', async function () {
    this.retries(10);
    const body = await page.waitForSelector('#liveTextMongoSection .liveTextData')
    const bodyText = await body.evaluate(el => el.textContent)
    bodyText.should.contain(text)
  })

})

describe('save and load data via the API', async function () {
  const text = "random test text " + crypto.randomBytes(32).toString('hex')

  it('should return the saved value', async function () {
    await axios.post(baseUrl + '/express/examples/saveText', {
      text: text
    })

    const res = await axios.get(baseUrl + '/express/examples/getText')

    res.data.text.should.contain(text)
  })

  it('should fail to save non-string data', async function () {
    return axios.post(baseUrl + '/express/examples/saveText', {
      text: null
    }).should.be.rejected
  })

  it('should fail to save missing text', async function () {
    return axios.post(baseUrl + '/express/examples/saveText', {}).should.be.rejected
  })

})
