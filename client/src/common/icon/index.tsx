import React from 'react';
import styled from 'styled-components';
import inject from '../../utils/dangerouslyInjectHTML';

const iconMap = preval`
  const fs = require('fs');
  const { join, resolve } = require('path');
  const { DOMParser, XMLSerializer } = require('xmldom');

  const iconPath = resolve('public/icons');
  const icons = fs.readdirSync(iconPath);

  const matching = ['g', 'rect', 'polygon', 'path', 'linearGradient', 'stop', 'line', 'defs', 'style', 'circle'];

  function getString(xml) {
    let ViewBox = '';
    let innerHTML = '';
    const content = xml.childNodes.item(0);

    const item = xml.childNodes.item(0);
    const { nodeName } = item;

    if (item.nodeType === 1 && item.attributes.length > 0) {
      for (let j = 0; j < item.attributes.length; j++) {
        const attribute = item.attributes.item(j);

        if (attribute.nodeName === 'viewBox') {

          ViewBox = attribute.nodeValue;
        }
      }
    }

    for (let i = 0; i < content.childNodes.length; i++) {
      const node = content.childNodes.item(i);

      if (matching.includes(node.nodeName)) {
        innerHTML += (new XMLSerializer().serializeToString(node)).trim().replace('xmlns="http://www.w3.org/2000/svg"', '');
      }
    }

    return {
      viewBox: ViewBox,
      innerHTML,
    }
  }

  module.exports = icons.reduce((acc, file) => {
    const fileData = fs.readFileSync(join(iconPath, file), 'utf8')

    const parser = new DOMParser();

    acc[file.slice(0, -4)] = getString(parser.parseFromString(fileData, 'image/svg+xml'));

    return acc;
  }, {})
`;

const Svg = styled.svg`
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: text-top;
  fill: currentColor;
  pointer-events: none;
`;

const Icon: React.SFC<{ name: string }> = ({ name, ...rest }) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox={iconMap[name].viewBox} {...rest} dangerouslySetInnerHTML={inject(iconMap[name].innerHTML)} />
);

export default Icon;
