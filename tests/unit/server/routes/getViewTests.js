var fs = require('fs');
var getView;
var fakeReq = { params: {} };
var fakeRes = { status: function (code) {}, render: function (view, data) {} };
var fakeMiddleware = { next: function (data) {} };
var fakeViews = ['index.html', 'view1.html'];
var mockRender;

describe('The getView route', function () {
	sinon.stub(fs, 'readdirSync').returns(fakeViews);
	getView = require('../../../../routes/getView');

	after(function () {
		fs.readdirSync.restore();
	});

	afterEach(function () {
		delete fakeReq.params.viewName;
	});

	it('should render a valid view', function () {
		fakeReq.params.viewName = 'view1';
		mockRender = sinon.mock(fakeRes).expects('render').once().withArgs(fakeReq.params.viewName + '.html');
		getView(fakeReq, fakeRes, function () {});

		mockRender.verify();
		fakeRes.render.restore();
	});

	it('should invoke next for a nonexistent view', function () {
		var mockNext = sinon.mock(fakeMiddleware).expects('next').once().withArgs(new Error(404));

		fakeReq.params.viewName = 'view2';
		getView(fakeReq, {}, fakeMiddleware.next);

		mockNext.verify();
		fakeMiddleware.next.restore();
	});

	it('should render index.html when viewName is falsy', function () {
		fakeReq.params.viewName = '';
		mockRender = sinon.mock(fakeRes).expects('render').once().withArgs('index.html');
		getView(fakeReq, fakeRes, function () {});

		mockRender.verify();
		fakeRes.render.restore();
	});
});