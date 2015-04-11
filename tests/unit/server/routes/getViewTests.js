var fs = require('fs');
var getView;
var fakeReq = { params: {} };
var fakeRes = { status: function (code) {}, render: function (view, data) {} };
var fakeMiddleware = { next: function (data) {} };
var fakeViews = ['index.html', 'view1.html'];
var mockRes;
var mockMiddleware;

describe('The getView route', function () {
	before(function () {
		sinon.stub(fs, 'readdirSync').returns(fakeViews);
		getView = require('../../../../routes/getView');
	});

	beforeEach(function () {
		mockRes = sinon.mock(fakeRes);
		mockMiddleware = sinon.mock(fakeMiddleware);
	});

	afterEach(function () {
		mockRes.restore();
		mockMiddleware.restore();
		delete fakeReq.params.viewName;
	});

	after(function () {
		fs.readdirSync.restore();
	});

	it('should render a valid view', function () {
		fakeReq.params.viewName = 'view1';
		mockRes.expects('render').once().withArgs(fakeReq.params.viewName + '.html');
		getView(fakeReq, fakeRes, function () {});

		mockRes.verify();
	});

	it('should invoke next for a nonexistent view', function () {
		mockMiddleware.expects('next').once().withArgs(new Error(404));

		fakeReq.params.viewName = 'view2';
		getView(fakeReq, {}, fakeMiddleware.next);

		mockMiddleware.verify();
	});

	it('should render index.html when viewName is falsy', function () {
		fakeReq.params.viewName = '';
		mockRes.expects('render').once().withArgs('index.html');
		getView(fakeReq, fakeRes, function () {});

		mockRes.verify();
	});
});