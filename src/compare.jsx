import _ from 'lodash';

import ObjectNode from './objectNode.jsx';
import ArrayNode from './arrayNode.jsx';
import pushTag from './pushTag.jsx';

import enumerateType from './enumerateType.jsx';

const compareArrays = (srcArray, cmpArray) => {
  let outputNode = new ArrayNode({pushTag: pushTag});
  let index = 0;

  for (; index < srcArray.length && index < cmpArray.length; index++) {
    const srcElemType = enumerateType(srcArray[index]);
    const cmpElemType = enumerateType(cmpArray[index]);

    if (srcElemType === cmpElemType && srcElemType === 'OBJECT') {
      outputNode.pushSameElem(compare(srcArray[index], cmpArray[index]));
      continue;
    }

    if (srcElemType === cmpElemType && srcElemType === 'ARRAY') {
      outputNode.pushSameElem(compareArrays(srcArray[index], cmpArray[index]));
      continue;
    }

    if (srcArray[index] === cmpArray[index]) {
      outputNode.pushSameElem(srcArray[index]);
      continue;
    }

    outputNode.pushDiffElem(srcArray[index], cmpArray[index]);
  }

  outputNode.pushByDifferenceInLength(srcArray, cmpArray);

  return outputNode;
};

const compare =  (src, cmp) => {
  let outputNode = new ObjectNode({pushTag: pushTag});

  _.forEach(_.keys(src), (key) => {
    const srcType = enumerateType(src[key]);
    const cmpType = enumerateType(cmp[key]);

    if (cmpType === 'UNDEFINED') {
      outputNode.addFieldNegative(key, src[key]);
      return;
    }

    if (srcType === cmpType && srcType === 'OBJECT') {
      outputNode.addFieldSame(key, compare(src[key], cmp[key]));
      return;
    }

    if (srcType === cmpType && srcType === 'ARRAY') {
      outputNode.addFieldSame(key, compareArrays(src[key], cmp[key]));
      return;
    }

    outputNode.compareAndAddNonObjectField(key, src, cmp);
  });

  outputNode.addFieldPositives(src, cmp);
  return outputNode;
};


module.exports = compare;