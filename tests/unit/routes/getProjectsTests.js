var getProjects = require('../../../routes/getProjects');
var gitHubModel = require('../../../models/gitHubModel');
var fakeRes = { status: function (code) {}, render: function (view, data) {} };

describe('the getProjects route', function () {
	it('should retrieve projects from the GitHub model', function () {
		var mockGitHubModel = sinon.mock(gitHubModel).expects('getRepos').once().promisify(['repo one', 'repo two']);
		var mockRender = sinon.mock(fakeRes).expects('render').once().withArgs('projects.html', { repos: ['repo one', 'repo two'] });

		getProjects({}, fakeRes, function () {});

		return mockGitHubModel.firstCall.returnValue.then(function () {
			mockRender.verify();
			mockGitHubModel.verify();
			fakeRes.render.restore();
			gitHubModel.getRepos.restore();
		});
	});
});