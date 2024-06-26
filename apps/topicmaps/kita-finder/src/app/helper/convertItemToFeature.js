import Color from 'color';
import React from 'react';
import { addSVGToProps } from 'react-cismap/tools/svgHelper';

import { getColorForProperties } from './styler';
import { constants } from './constants';

const getSignature = (properties) => {
  if (properties.signatur) {
    return properties.signatur;
  } else if (properties.mainlocationtype.signatur) {
    return properties.mainlocationtype.signatur;
  }
  return 'Platz.svg'; //TODO sinnvoller default
};

const convertItemToFeature = async (itemIn, poiColors) => {
  let clonedItem = JSON.parse(
    JSON.stringify({
      ...itemIn,
      mainlocationtype: {
        id: -99,
        name: 'Kita',
        signatur: 'child.svg',
        lebenslagen: ['Kinderbetreuung'],
      },
      info: `Kindertageseinrichtung mit ${itemIn.plaetze} Plätzen in ${
        constants.TRAEGERTEXT[itemIn.traegertyp]
      }`,
    })
  );

  let item = await addSVGToProps(clonedItem, (i) => getSignature(i));
  const headerColor = Color(getColorForProperties(item, poiColors));

  const info = {
    header: 'Kita',
    title: item.name,
    additionalInfo: item.info,
    subtitle: item?.adresse,
  };
  item.info = info;
  item.color = headerColor;
  const id = item.id;
  const type = 'Feature';
  const selected = false;
  const geometry = item.geojson;
  const text = item.name;

  return {
    id,
    text,
    type,
    selected,
    geometry,
    crs: {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:EPSG::25832',
      },
    },
    properties: item,
  };
};

export default convertItemToFeature;

export const getConvertItemToFeatureWithPOIColors = (poiColors) => {
  return async (itemIn) => {
    return await convertItemToFeature(itemIn, poiColors);
  };
};
