import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {Map, List} from 'immutable';
import {
  Icon
} from '../../src/client/components/helpers/Icon';

describe('Icon', () => {
  describe('Component', () => {
    const shallowRenderer = TestUtils.createRenderer();
    it('should render', () => {
      shallowRenderer.render(
        <Icon />
      );
      const result = shallowRenderer.getRenderOutput();
      expect(result.type).toBe('svg');
    });
  });
});
