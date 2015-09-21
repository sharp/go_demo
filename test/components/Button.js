import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {Map, List} from 'immutable';
import {
  Button
} from '../../src/client/components/helpers/Button';

describe('Button', () => {
  describe('Component', () => {
    const shallowRenderer = TestUtils.createRenderer();
    it('should render', () => {
      shallowRenderer.render(
        <Button entry={new Map()} options={{}}/>
      );
      const result = shallowRenderer.getRenderOutput();
      expect(result.type).toBe('div');
    });
  });
});
