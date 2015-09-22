import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {Map, List} from 'immutable';
import {
  Card
} from '../../src/client/components/helpers/Card';

describe('Card', () => {
  describe('Component', () => {
    const shallowRenderer = TestUtils.createRenderer();
    it('should render', () => {
      shallowRenderer.render(
        <Card entry={new Map()}/>
      );
      const result = shallowRenderer.getRenderOutput();
      expect(result.type).toBe('div');
    });
  });
});
