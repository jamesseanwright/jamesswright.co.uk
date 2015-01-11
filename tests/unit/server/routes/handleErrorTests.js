var handleError = require('../../../../routes/handleError');
var fakeRes = { status: function (code) {}, render: function (view, data) {} };
var mockRender;

describe('the handleError middleware', function () {
	it('should render a error view with the correct HTTP status for the given code', function () {
		sinon.stub(fakeRes, 'status').withArgs('404').returns(fakeRes);
		mockRender = sinon.mock(fakeRes).expects('render').once().withArgs('error/404.html');

		handleError(new Error(404), {}, fakeRes, function () {});

		mockRender.verify();
		fakeRes.status.restore();
	});
});