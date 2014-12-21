var should = require('should'),
	sinon = require('sinon'),
	fs = require('fs'),
	mockViews = ['view1.html'],
	mockReq = { params: {} },
	mockRes = { render: function (view) {} },
	mockRender,
	getView;

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
			getView(mockReq, mockRes, function() {});

			mockRender.verify();
		});
	});
});