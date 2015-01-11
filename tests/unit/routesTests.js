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