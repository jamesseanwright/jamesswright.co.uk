var getProjects = require('../../../../routes/getProjects');
var gitHubModel = require('../../../../models/gitHub');
var fakeRes = { status: function (code) {}, render: function (view, data) {} };

describe('the getProjects route', function () {
	afterEach(function () {
		fakeRes.render.restore();
		gitHubModel.getRepos.restore();
		gitHubModel.getForks.restore();
	});

	it('should retrieve projects from the GitHub model', function () {
		sinon.stub(gitHubModel, 'getRepos')
			.returns(Promise.resolve(['repo one']));

		sinon.stub(gitHubModel, 'getForks')
			.returns(Promise.resolve(['fork one']));

		var mockRender = sinon.mock(fakeRes)
			.expects('render')
			.once()
			.withArgs('projects.html', { 
				repos: ['repo one'],
				forks: ['fork one']
			});

		return getProjects({}, fakeRes, function () {})
			.then(function () {
				mockRender.verify();
			});
	});
});