'use strict';

const blogModel = require('../../../models/blog');
const jonathan = require('jonathan');

describe('the blog model', function () {
	describe('the get method', function () {
		var mockJonathan;
		
		beforeEach(function () {
			mockJonathan = sinon.mock(jonathan);
		});
		
		afterEach(function () {
			mockJonathan.restore();
		});
		
		it('should get the post from the memcache if possible', function () {
			const post = '# lol';
			const slug = 'lol';
			const key = `post-${slug}`;
			
			mockJonathan.expects('get')
						.withArgs(key)
						.returns(post);
						
			return blogModel.get(slug)
					.then(actualPost => {
						actualPost.should.equal(post);
						mockJonathan.verify();
					});
		});
	})
});	