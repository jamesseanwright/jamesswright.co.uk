var should = require('should'),
	sinon = require('sinon'),
	fs = require('fs'),
	mockViews = ['index.html', 'view1.html'],
	mockReq = { params: {} },
	mockRes = { render: function (view) {} },
	mockRender,
	mockMiddleware = { next: function (data) {} },
	getView;

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
});