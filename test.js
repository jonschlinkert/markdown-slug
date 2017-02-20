'use strict';

require('mocha');
var assert = require('assert');
var slugify = require('./');

describe('markdown-slug', function() {
  it('should export a function', function() {
    assert.equal(typeof slugify, 'function');
  });

  it('should strip forward slashes in slugs', function() {
    var actual = slugify('Some/Article');
    assert.equal(actual, 'somearticle');
  });

  it('should strip backticks in slugs', function() {
    var actual = slugify('Some`Article`');
    assert.equal(actual, 'somearticle');
  });

  it('should strip CJK punctuations in slugs', function() {
    var actual = slugify('存在，【中文】；《标点》、符号！的标题？');
    assert.equal(actual, '%E5%AD%98%E5%9C%A8%E4%B8%AD%E6%96%87%E6%A0%87%E7%82%B9%E7%AC%A6%E5%8F%B7%E7%9A%84%E6%A0%87%E9%A2%98');
  });

  it('should strip & in slugs', function() {
    var actual = slugify('Foo & Bar');
    assert.equal(actual, 'foo--bar');
  });

  it('should throw an error when value is not a string', function(cb) {
    try {
      slugify();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected a string');
      cb();
    }
  });
});
