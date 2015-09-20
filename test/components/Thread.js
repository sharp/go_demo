import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {Map, List} from 'immutable';
import {Thread} from '../../src/client/components/helpers/Thread';

// TODO: should test throw react-css-module ?

describe('Thread', () => {
  describe('Component', () => {
    const shallowRenderer = TestUtils.createRenderer();
    it('should render', () => {
      shallowRenderer.render(
        <Thread />
      );
      const result = shallowRenderer.getRenderOutput();
      expect(result.type).toBe('div');
    });
    it('should handle invalid props -> type', () => {
      shallowRenderer.render(
        <Thread type="__what_ever__" entries={['a']}/>
      );
      const result = shallowRenderer.getRenderOutput();
      expect(result.props.children.length).toBe(1);
      expect(result.props.children[0]).toBe(null);
    });
    it('should handle missing props -> entries', () => {
      shallowRenderer.render(
        <Thread type="even_a_valid_one"/>
      );
      const result = shallowRenderer.getRenderOutput();
      expect(result.props.children).toEqual([]);
    });

    it('should handle empty props -> entries', () => {
      shallowRenderer.render(
        <Thread entries={[]}/>
      );
      const result = shallowRenderer.getRenderOutput();
      expect(result.props.children).toEqual([]);
    });
    it('should handle props -> entries', () => {
      shallowRenderer.render(
        <Thread entries={['a', 'b', 'c']}/>
      );
      const result = shallowRenderer.getRenderOutput();
      expect(result.props.children.length).toBe(3);
    });
    it('should handle immutable props -> entries', () => {
      shallowRenderer.render(
        <Thread entries={List(['a', 'b', 'c'])}/>
      );
      const result = shallowRenderer.getRenderOutput();
      expect(result.props.children.size).toBe(3);
    });
  });
});
