var fs = require('fs');
var handleError = require('../../../../routes/handleError');
var fakeRes = { status: function (code) {}, render: function (view, data) {} };
var mockRes;

describe('the handleError middleware', function () {
	before(function () {
		sinon.stub(fs, 'readdirSync')
			.returns(['404.html', 'all.html']);
	});

	after(function () {
		fs.readdirSync.restore();
	});

	beforeEach(function () {
		mockRes = sinon.mock(fakeRes);
	});

	afterEach(function () {
		mockRes.restore();
		fakeRes.status.restore();
	});

	it('should render a error view with the correct HTTP status for the given code', function () {
		sinon.stub(fakeRes, 'status').withArgs('404').returns(fakeRes);
		mockRes.expects('render').once().withArgs('error/404.html');

		handleError(new Error(404), {}, fakeRes, function () {});

		mockRes.verify();
	});

	it('should render a generic view when one for the status code cannot be found', function () {
		sinon.stub(fakeRes, 'status').withArgs('500').returns(fakeRes);
		mockRes.expects('render').once().withArgs('error/all.html');

		handleError(new Error(500), {}, fakeRes, function () {});

		mockRes.verify();
	});
});