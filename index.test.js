
const { fireEvent, getByText } = require('@testing-library/dom');
require('@testing-library/jest-dom/extend-expect');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })

  it('renders a heading element', () => {
    expect(container.querySelector('h1')).not.toBeNull()
    expect(getByText(container, 'Hello World')).toBeInTheDocument()
  })

  it('renders an input element', () => {
    expect(container.querySelector('input')).not.toBeNull()
    expect(getByLabelText(container, 'Enter your name...')).toBeInTheDocument()
  })

  it('renders a button element', () => {
    expect(container.querySelector('button')).not.toBeNull()
    expect(getByText(container, 'click me')).toBeInTheDocument()
  })

  it('renders a script tag and assertains there is a src tag in the tag', () => {
    expect(container.querySelector('script')).not.toBeNull()
    expect(container).toContainHTML('<script src="./assets/main.js"></script>')
  })

  it('renders a new paragraph via JavaScript when the button is clicked', async () => {
    const button = getByText(container, 'click me')
    
    fireEvent.click(button)
    let generatedParagraphs = container.querySelectorAll('p')
    expect(generatedParagraphs.length).toBe(1)
  })
})