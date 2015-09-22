import {Map, fromJS} from 'immutable';

const ensureEntryIsValidAndImmutable =
  entry => {
    const result = fromJS(entry);

    // Check entry type.
    if (typeof entry !== 'object' || entry === null) {
      throw new Error(
        `entry expected and object, instead received ${entry === null ? 'null' : typeof entry}.`
      );
    }

    // Check conversion type.
    if (!Map.isMap(result)) {
      throw new Error(
        `Conversion of entry expected to be a Map, ` +
        `instead result in ${result.constructor.name}.`
      );
    }

    // Check shape.
    const id = result.get('id');
    if (!result.has('id')) {
      throw new Error(
        `entry -> id expected to be defined.`
      );
    }

    if (typeof id === 'object') {
      throw new Error(
        `entry -> id expected to be a string or a number, instead received ${typeof id}.`
      );
    }

    if (!result.get('id').trim().length > 0) {
      throw new Error(
        `entry -> id can not be empty.`
      );
    }

    return result;
  };

export default ensureEntryIsValidAndImmutable;
