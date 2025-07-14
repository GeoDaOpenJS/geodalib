// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import { describe, it, expect } from '@jest/globals';
import { getBuffers } from '../../src/geometry/buffer';
import { Feature } from 'geojson';
import { DistanceUnit } from '@geoda/common';

const INPUT_POLYGONS: Feature[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [0, 0],
        ],
      ],
    },
    properties: {},
  },
];

describe('Spatial Buffer', () => {
  it('should get polygon buffer correctly', async () => {
    const result = await getBuffers({
      geoms: INPUT_POLYGONS,
      bufferDistance: 1,
      distanceUnit: DistanceUnit.Mile,
    });

    expect(result).toEqual([
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-0.014442727975676917, 0.000006649720917714471],
              [-0.014444919393973077, 0.9999933223301116],
              [-0.012512301488899258, 1.007265472064619],
              [-0.007225769708447682, 1.0125901703398952],
              [-0.0000023123234567101747, 1.0145401160009748],
              [1.0000021338030345, 1.0145512719216712],
              [1.0072280339103032, 1.0126018185286545],
              [1.012518290709113, 1.0072775887228411],
              [1.014456143849096, 1.000004405798303],
              [1.0144539541133624, -0.000004434348837579876],
              [1.0125159991627464, -0.007278271059367159],
              [1.0072256380560085, -0.012602599465781931],
              [0.9999999280681093, -0.014551310676353478],
              [-1.0769617064809722e-7, -0.014540151298219811],
              [-0.007223373518255638, -0.012590948099311128],
              [-0.012510008615829626, -0.007266152161274633],
              [-0.014442727975676917, 0.000006649720917714471],
            ],
          ],
        },
        properties: {},
      },
    ]);
  });
});
