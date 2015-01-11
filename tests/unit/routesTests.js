var fs = require('fs'),
	gitHubModel = require('../../models/gitHubModel'),
	mockGitHubModel,
	mockHttp,
	mockViews = ['index.html', 'view1.html'],
	mockReq = { params: {} },
	mockRes = { status: function (code) {}, render: function (view, data) {} },
	mockRender,
	mockStatus,
	mockMiddleware = { next: function (data) {} },
	getView,
	handleError,
	getProjects;

require('../../utils/polyfills')();

describe('the site\'s routes', function () {
	afterEach(function () {
		delete mockReq.params.viewName;

		if (fs.readdirSync.restore) {
			fs.readdirSync.restore();
		}

		if (mockRes.render.restore) {
			mockRes.render.restore();
		}
		
		if (mockRes.status.restore) {
			mockRes.status.restore();
		}
	});		

	

	describe('the handleError middleware', function () {
		beforeEach(function () {
			handleError = require('../../routes/handleError');
		});

		it('should render a error view with the correct HTTP status for the given code', function () {
			mockStatus = sinon.mock(mockRes).expects('status').once().withArgs('404').returns(mockRes);
			mockRender = sinon.mock(mockRes).expects('render').once().withArgs('error/404.html');

			handleError(new Error(404), {}, mockRes, function () {});

			mockStatus.verify();
			mockRender.verify();
		});
	});

	describe('the getProjects route', function () {
		beforeEach(function () {
			getProjects = require('../../routes/getProjects');
		});

		it('should retrieve projects from the GitHub model', function () {
			mockGitHubModel = sinon.mock(gitHubModel).expects('getRepos').once().promisify(['repo one', 'repo two']);
			mockRender = sinon.mock(mockRes).expects('render').once().withArgs('projects.html', { repos: ['repo one', 'repo two'] });

			getProjects({}, mockRes, function () {});

			return mockGitHubModel.firstCall.returnValue.then(function () {
				mockRender.verify();
			});
		});
	});
});