import Node from './node.jsx';
import _ from 'lodash';
import enumerateType from './enumerateType.jsx';

module.exports = (src, cmp) => {
  let outputNode = new Node();

  _.forEach(_.keys(src), (key) => {
    const srcType = getFieldType(src, key);
    const cmpType = getFieldType(cmp, key);

    if (cmpType === 'UNDEFINED') {
      outputNode.addFieldNegative({[key]: src[key]});
      return;
    }

    if (srcType === cmpType && srcType === 'OBJECT') {
      return;
    }

    if (srcType === cmpType && srcType === 'ARRAY') {
      return;
    }

    outputNode.compareAndAddNonObjectField(key, src, cmp);
  });

  outputNode.addFieldPositives(src, cmp);
  return outputNode;
};

const getFieldType = (json, key) => {
  return enumerateType(json[key]);
};