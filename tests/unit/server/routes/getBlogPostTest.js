'use strict';

const glob = require('glob');
const jonathan = require('jonathan');
const getBlogPost = require('../../../../routes/getBlogPost');

describe.skip('the getBlogPost route', function () {
	const mockJonathan = sinon.mock(jonathan);
	const response = {
		render: function () {}
	};
	const mockResponse = sinon.mock(response);
	const slug = 'slug';
	const post = 'post';

	afterEach(function () {
		mockJonathan.restore();
		mockResponse.restore();
	});

	it('should retrieve a post from Jonathan if possible', function () {
		const request = {
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
