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

  it('should return the saved value', async function () {
    await page.goto(baseUrl + '/examples/save-and-load')
    const input = await page.waitForSelector('input')
    await input.click({ clickCount: 3 })
    await page.keyboard.type(text)
    await page.click('button')
    await page.waitForNavigation()

    await page.goto(baseUrl + '/examples/save-and-load')
    const body = await page.waitForSelector('body')
    const bodyText = await body.evaluate(el => el.textContent)
    expect(bodyText).to.contain(text)
  })

})

describe('save and load data via the API', async function () {
  const text = "random test text " + crypto.randomBytes(32).toString('hex')

  it('should return the saved value', async function () {
    await axios.post(baseUrl + '/express/examples/saveText', {
      text: text
    })

    const res = await axios.get(baseUrl + '/express/examples/getText')

    expect(res.data.text).to.contain(text)
  })

})
