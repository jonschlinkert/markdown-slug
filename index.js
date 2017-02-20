'use strict';

/**
 * Module dependencies
 */

var extend = require('extend-shallow');
var querystring = require('querystring');
var diacritics = require('diacritics-map');
var stripColor = require('strip-color');

/**
 * Slugify the url part of a markdown link.
 *
 * @name  options.slugify
 * @param  {String} `str` The string to slugify
 * @return {String}
 */

module.exports = function(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  var opts = extend({}, options);
  str = stripColor(str);
  str = str.toLowerCase();

  // `.split()` is sometimes faster than `.replace()`
  str = str.split(' ').join('-');
  str = str.split(/\t/).join('--');
  if (opts.stripHeadingTags === true) {
    str = str.split(/<\/?[^>]+>/).join('');
  }
  str = str.split(/[|$&`~=\\\/@+*!?({[\]})<>=.,;:'"^]/).join('');
  str = str.split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/).join('');
  str = replaceDiacritics(str);
  if (opts.num) {
    str += '-' + opts.num;
  } else if (opts.cache) {
    str = unique(str, opts.cache);
  }
  return querystring.escape(str);
};

function replaceDiacritics(str) {
  return str.replace(/[À-ž]/g, function(ch) {
    return diacritics[ch] || ch;
  });
}

function unique(str, cache) {
  return cache[str] ? (str + '-' + cache[str]++) : ((cache[str] = 1) && str);
}
