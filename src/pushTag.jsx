import enumerateType from './enumerateType.jsx';
import ObjectNode from './objectNode.jsx';
import ArrayNode from './arrayNode.jsx';

const pushTag = (tag, field) => {
  const fieldType = enumerateType(field);
  let node;
  if (fieldType === 'OBJECT') {
    node = new ObjectNode({pushTag: pushTag});
    _.each(_.keys(field), (key) => {
      let subfieldType = enumerateType(field[key]);
      if (subfieldType === 'OBJECT' || subfieldType === 'ARRAY') {
        node.addField(tag, key, pushTag(tag, field[key]));
      } else {
        node.addField(tag, key, field[key]);
      }
    });
  }
  if (fieldType === 'ARRAY') {
    node = new ArrayNode({pushTag: pushTag});
    _.each(field, (element) => {
      let subfieldType = enumerateType(element);
      if (subfieldType === 'OBJECT' || subfieldType === 'ARRAY') {
        node.pushElement(tag, pushTag(tag, element));
      } else {
        node.pushElement(tag, element);
      }
    });

  }
  return node ? node : field;
};

module.exports = pushTag;