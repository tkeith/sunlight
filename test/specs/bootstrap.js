import puppeteer from 'puppeteer'
import { expect } from 'chai'
import axios from 'axios'

global.baseUrl = 'http://localhost:8000'
global.expect = expect
global.axios = axios

let browser = null

const puppeteerOpts = {
  headless: false
}

if (process.env.CHROMIUM_INSIDE_DOCKER) {
  puppeteerOpts.executablePath = '/usr/bin/chromium'
  puppeteerOpts.args = ['--no-sandbox', '--disable-setuid-sandbox']
}

async function closeBrowser() {
  if (browser === null) {
    return
  }
  await browser.close()
  browser = null
}

global.getPage = async () => {
  await closeBrowser()
  browser = await puppeteer.launch(puppeteerOpts)
  const page = await browser.newPage()
  return page
}

after(async function () {
  await closeBrowser()
})
