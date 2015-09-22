import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {Map, List} from 'immutable';
import {
  Feed
} from '../../src/client/components/helpers/Feed';

describe('Feed', () => {
  describe('Component', () => {
    const shallowRenderer = TestUtils.createRenderer();
    it('should render', () => {
      shallowRenderer.render(
        <Feed entry={new Map()}/>
      );
      const result = shallowRenderer.getRenderOutput();
      expect(result.type).toBe('div');
    });
  });
});
