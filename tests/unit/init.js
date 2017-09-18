'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { JSDOM } = require('jsdom');

global.chai = chai;
global.sinon = sinon;

chai.should();
chai.use(chaiAsPromised);

global.createDom = function createDom(body = '') {
    const dom = new JSDOM(`
        <html>
            <head></head>
            <body>${body}</body>
        </html>
    `);

    global.window = dom.window;
    global.document = dom.window.document;
};

global.destroyDom = function destroyDom() {
    global.window.close();
    delete global.window;
    delete global.document;
};