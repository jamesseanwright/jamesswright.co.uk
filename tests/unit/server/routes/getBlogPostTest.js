var glob = require('glob');
var jonathan = require('jonathan');
var getBlogPost = require('../../../../routes/getBlogPost');

// these tests are dependent upon private methods and variables
// need to determine how to expose them
describe.skip('the getBlogPost route', function () {
	var mockJonathan = sinon.mock(jonathan);
	var response = {
		render: function () {}
	};
	var mockResponse = sinon.mock(response);
	var slug = 'slug';
	var post = 'post';

	afterEach(function () {
		mockJonathan.restore();
		mockResponse.restore();
	});

	it('should retrieve a post from Jonathan if possible', function () {
		var request = {
			params: {
				slug: slug
			}
		};

		mockJonathan.expects('get')
			.once()
			.withArgs('post-' + slug)
			.returns(post);

		mockResponse.expects('render')
			.once()
			.withArgs('blog/post.html', sinon.match({ post: post }));

		getBlogPost(request, response);
		mockJonathan.verify();
	});
});
