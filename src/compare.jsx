import Node from './node.jsx';
import _ from 'lodash';

module.exports = (src, cmp) => {
  let outputNode = new Node();
  let srcKeys = _.keys(src);
  let cmpKeys = _.keys(cmp);

  outputNode.addFieldPositives(src, cmp);
  return outputNode;
};


//
//
//// Handle null and undefinedness
//if (src[key] === null) {
//  if (cmp[key] === undefined) {
//    outputNode.addFieldNegative({[key]: null});
//    return;
//  } else if (cmp[key] === null) {
//    outputNode.addFieldSame({[key]: null});
//    cmpKeys = this.removeFromKeySetIfDefined(key, cmpKeys);
//    return;
//  } else {
//    outputNode.addFieldDiff({[key]: cmp[key]});
//    cmpKeys = this.removeFromKeySetIfDefined(key, cmpKeys);
//    return;
//  }
//} else {
//  if (cmp[key] === undefined) {
//    outputNode.addFieldNegative({[key]: src[key]});
//    return;
//  } else if (cmp[key] === null) {
//    outputNode.addFieldDiff({[key]: null});
//    cmpKeys = this.removeFromKeySetIfDefined(key, cmpKeys);
//    return;
//  }
//}
//
//// Handle type difference
//let srcFieldType = typeof src[key];
//let cmpFieldType = typeof cmp[key];
//if (srcFieldType === cmpFieldType) {
//  switch (srcFieldType) {
//    case 'string':
//    case 'number':
//    case 'boolean':
//      src[key] !== cmp[key]
//        ? outputNode.addFieldDiff({[key]: cmp[key]})
//        : outputNode.addFieldSame({[key]: cmp[key]});
//      break;
//    case 'object':
//      outputNode.addFieldSame({[key]: this.compare(src[key], cmp[key])});
//      break;
//    default:
//      throw 'we never expect this to happen';
//  }
//} else {
//  outputNode.addFieldDiff({[key]: cmp[key]});
//}