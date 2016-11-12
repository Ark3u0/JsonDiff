import _ from 'lodash';

import ObjectNode from './objectNode.jsx';
import ArrayNode from './arrayNode.jsx';
import pushTag from './pushTag.jsx';

import enumerateType from './enumerateType.jsx';

const compareArrays = (srcArray, cmpArray, isTop) => {
  let outputNode = new ArrayNode({pushTag: pushTag, isTop: isTop});
  let index = 0;

  for (; index < srcArray.length && index < cmpArray.length; index++) {
    const srcElemType = enumerateType(srcArray[index]);
    const cmpElemType = enumerateType(cmpArray[index]);

    if (srcElemType === cmpElemType && srcElemType === 'OBJECT') {
      outputNode.pushSameElem(compareObjects(srcArray[index], cmpArray[index]));
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

const compareObjects =  (src, cmp, isTop) => {
  let outputNode = new ObjectNode({pushTag: pushTag, isTop: isTop});

  _.forEach(_.keys(src), (key) => {
    const srcType = enumerateType(src[key]);
    const cmpType = enumerateType(cmp[key]);

    if (cmpType === 'UNDEFINED') {
      outputNode.addFieldNegative(key, src[key]);
      return;
    }

    if (srcType === cmpType && srcType === 'OBJECT') {
      outputNode.addFieldSame(key, compareObjects(src[key], cmp[key]));
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

const compare = (src, cmp) => {
  const srcType = enumerateType(src);
  const cmpType = enumerateType(cmp);

  if (srcType === cmpType) {
    switch (srcType) {
      case "OBJECT":
        return compareObjects(src, cmp, true);
      case "ARRAY":
        return compareArrays(src, cmp, true);
      default:
        throw "Top JSON structure must be array or object.";
    }
  }

  let arrayNode = new ArrayNode({pushTag: pushTag});
  arrayNode.pushDiffElem(src, cmp);
  return arrayNode;
};

module.exports = compare;