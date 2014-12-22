var should = require('should'),
	sinon = require('sinon'),
	fs = require('fs'),
	mockViews = ['index.html', 'view1.html'],
	mockReq = { params: {} },
	mockRes = { status: function (code) {}, render: function (view) {} },
	mockRender,
	mockStatus,
	mockMiddleware = { next: function (data) {} },
	getView,
	handleError

require('../../utils/polyfills')();

describe('the site\'s routes', function () {
	describe('The getView route', function () {
		beforeEach(function () {
			sinon.mock(fs).expects('readdirSync').once().returns(mockViews);
			getView = require('../../routes/getView');
		});

		afterEach(function () {
			fs.readdirSync.restore();
			delete mockReq.params.viewName;
		});

		it('should render a valid view', function () {
			mockReq.params.viewName = 'view1';
			mockRender = sinon.mock(mockRes).expects('render').once().withArgs(mockReq.params.viewName + '.html');
			getView(mockReq, mockRes, function () {});

			mockRender.verify();
			mockRes.render.restore();
		});

		it('should invoke next for a nonexistent view', function () {
			mockReq.params.viewName = 'view2';
			mockNext = sinon.mock(mockMiddleware).expects('next').once().withArgs(new Error(404));
			getView(mockReq, {}, mockMiddleware.next);

			mockNext.verify();
		});

		it('should render index.html when viewName is falsy', function () {
			mockReq.params.viewName = '';
			mockRender = sinon.mock(mockRes).expects('render').once().withArgs('index.html');
			getView(mockReq, mockRes, function () {});

			mockRender.verify();
			mockRes.render.restore();
		});
	});

	describe('the handleError middleware', function () {
		beforeEach(function () {
			handleError = require('../../routes/handleError');
		});

		it('should render a view with the correct HTTP status for the given code', function () {
			mockStatus = sinon.mock(mockRes).expects('status').once().withArgs(404);
			mockRender = sinon.mock(mockRes).expects('render').once().withArgs('error/404.html');

			handleError(new Error(404), {}, mockRes, function () {});

			mockStatus.verify();
			mockRender.verify();
		});
	});
});