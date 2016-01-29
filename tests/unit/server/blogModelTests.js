'use strict';

const blogModel = require('../../../models/blog');
const jonathan = require('jonathan');

describe('the blog model', function () {
	describe('the get method', function () {
		const markdown = '# lol';
		const html = '<h1>lol</h1>';
		const slug = 'lol';
		const key = `post-${slug}`;
		const postModel = {};
		
		var mockJonathan;
		var mockBlogModel;
		
		beforeEach(function () {
			mockJonathan = sinon.mock(jonathan);
			mockBlogModel = sinon.mock(blogModel);
		});
		
		afterEach(function () {
			mockJonathan.restore();
			mockBlogModel.restore();
		});
		
		it('should get the post from the memcache if possible', function () {
			mockJonathan.expects('get')
						.withArgs(key)
						.returns(markdown);
						
			return blogModel.get(slug)
					.then(actualPost => {
						actualPost.should.equal(markdown);
						mockJonathan.verify();
					});
		});
		
		it('should build the post from the file system if not cached', function () {
			mockJonathan.expects('get')
						.withArgs(key)
						.returns(null);
						
			mockBlogModel.expects('_getContent')
						 .once()
						 .withArgs(slug)
						 .returns(Promise.resolve(markdown));
						 
			mockBlogModel.expects('_convert')
						 .once()
						 .withArgs(markdown)
						 .returns(Promise.resolve(html));
						 
			mockBlogModel.expects('_buildPost')
						 .once()
						 .withArgs(slug, html)
						 .returns(Promise.resolve(postModel));
						 
			mockBlogModel.expects('_cachePost')
						 .once()
						 .withArgs(key, postModel)
						 .returns(Promise.resolve(postModel));
						 
			return blogModel.get(slug)
					.then(() => {
						mockJonathan.verify();
						mockBlogModel.verify();
					});
		});
	})
});	