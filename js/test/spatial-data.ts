import {Feature, Polygon, Point, MultiPoint, LineString} from 'geojson';

export const polygons: Feature<Polygon>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [1.0, 1.0],
          [1.0, 2.0],
          [2.0, 2.0],
          [2.0, 1.0],
          [1.0, 1.0]
        ]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [6.0, 6.0],
          [8.0, 6.0],
          [8.0, 8.0],
          [6.0, 8.0],
          [6.0, 6.0]
        ]
      ]
    },
    properties: {}
  }
];

const polygonWithHole: Feature<Polygon>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [1.0, 0.0],
          [1.0, 2.0],
          [3.0, 2.0],
          [3.0, 0.0],
          [1.0, 0.0]
        ],
        [
          [1.2, 0.2],
          [2.5, 0.2],
          [2.5, 2.5],
          [1.2, 2.5],
          [1.2, 0.2]
        ]
      ]
    },
    properties: {}
  }
];

const twoPolygons: Feature<Polygon>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0.0, 0.0],
          [0.0, 1.0],
          [1.0, 1.0],
          [1.0, 0.0],
          [0.0, 0.0]
        ]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [1.0, 0.0],
          [1.0, 1.0],
          [2.0, 1.0],
          [2.0, 0.0],
          [1.0, 0.0]
        ]
      ]
    },
    properties: {}
  }
];

const twoOverlappedPolygons: Feature<Polygon>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0.0, 0.0],
          [0.0, 1.0],
          [1.0, 1.0],
          [1.0, 0.0],
          [0.0, 0.0]
        ]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0.5, 0.5],
          [0.5, 1.5],
          [1.5, 1.5],
          [1.5, 0.5],
          [0.5, 0.5]
        ]
      ]
    },
    properties: {}
  }
];

export const polygonData = {
  polygonWithHole,
  twoPolygons,
  twoOverlappedPolygons
};

export const points: Feature<Point | MultiPoint>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0.0, 0.0]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'MultiPoint',
      coordinates: [
        [0.2, 0.2],
        [1.4, 0.4]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [11.0, 11.0]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [5.4, 5.4]
    },
    properties: {}
  }
];

export const lines: Feature<LineString>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [0.4, 0.4],
        [1.2, 0.4]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [1.4, 0.4],
        [11.0, 11.0],
        [5.4, 5.4]
      ]
    },
    properties: {}
  }
];

const twoPolygonsJoin: Feature<Polygon>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0.0, 0.0],
          [0.0, 1.0],
          [1.0, 1.0],
          [1.0, 0.0],
          [0.0, 0.0]
        ]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [5.0, 5.0],
          [7.0, 5.0],
          [7.0, 7.0],
          [5.0, 7.0],
          [5.0, 5.0]
        ]
      ]
    },
    properties: {}
  }
];

export const joinTestData = {
  twoPolygons: twoPolygonsJoin,
  points,
  lines,
  polygons
};

export const joinTestDataCrosses = {
  twoPolygons: joinTestData.twoPolygons,
  polygons: joinTestData.polygons,
  lines: joinTestData.lines,
  points: joinTestData.points
};

const pointsEqual: Feature<Point | MultiPoint>[] = [
  joinTestData.points[0],
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0.2, 0.2]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [1.4, 0.4]
    },
    properties: {}
  },
  joinTestData.points[2],
  joinTestData.points[3]
];

const linesEquals: Feature<LineString>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [0.4, 0.0],
        [1.2, 0.0]
      ]
    },
    properties: {}
  },
  joinTestData.lines[1]
];

const linesIntersects: Feature<LineString>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [0.4, 0.4],
        [0.2, 0.2]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [1.4, 0.4],
        [11.0, 11.0],
        [5.4, 5.4]
      ]
    },
    properties: {}
  }
];

export const joinTestDataEquals = {
  twoPolygons: joinTestData.twoPolygons,
  points: pointsEqual,
  lines: linesEquals
};

const pointsIntersects: Feature<Point>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0.4, 0.4]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0.2, 0.2]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [1.4, 0.4]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [11.0, 11.0]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [5.4, 5.4]
    },
    properties: {}
  }
];

const secondTwoPolygonsIntersects: Feature<Polygon>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [1.0, 1.0],
          [1.0, 2.0],
          [2.0, 2.0],
          [2.0, 1.0],
          [1.0, 1.0]
        ]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [6.0, 6.0],
          [7.0, 6.0],
          [7.0, 7.0],
          [6.0, 7.0],
          [6.0, 6.0]
        ]
      ]
    },
    properties: {}
  }
];

export const joinTestDataIntersects = {
  twoPolygons: joinTestData.twoPolygons,
  polygons: joinTestData.polygons,
  lines: linesIntersects,
  points: pointsIntersects,
  secondTwoPolygons: secondTwoPolygonsIntersects
};

const linesOverlaps: Feature<LineString>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [0.4, 0.0],
        [1.2, 0.0]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [1.4, 0.4],
        [11.0, 11.0],
        [5.4, 5.4]
      ]
    },
    properties: {}
  }
];

const pointsOverlaps: Feature<Point>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0.0, 0.0]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0.2, 0.2]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [1.4, 0.4]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [11.0, 11.0]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [5.4, 5.4]
    },
    properties: {}
  }
];

export const joinTestDataOverlaps = {
  twoPolygons: joinTestData.twoPolygons,
  polygons: joinTestData.polygons,
  lines: linesOverlaps,
  secondLines: joinTestDataIntersects.lines,
  points: pointsOverlaps,
  secondPoints: joinTestDataIntersects.points
};

const thirdPointsTouches: Feature<Point | MultiPoint>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'MultiPoint',
      coordinates: [
        [1.4, 1.4],
        [0.2, 0.2]
      ]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [2.4, 1.4]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [21.0, 21.0]
    },
    properties: {}
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [15.4, 15.4]
    },
    properties: {}
  }
];

const fourthPointsTouches: Feature<Point>[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0.3, 0.3]
    },
    properties: {}
  },
  joinTestDataOverlaps.points[1],
  joinTestDataOverlaps.points[2],
  joinTestDataOverlaps.points[3],
  joinTestDataOverlaps.points[4]
];

export const joinTestDataTouches = {
  twoPolygons: joinTestDataOverlaps.twoPolygons,
  secondTwoPolygons: joinTestDataIntersects.secondTwoPolygons,
  points: joinTestDataOverlaps.points,
  secondPoints: joinTestDataIntersects.points,
  lines: joinTestDataOverlaps.lines,
  secondLines: joinTestDataIntersects.lines,
  thirdPoints: thirdPointsTouches,
  fourthPoints: fourthPointsTouches
};

export const joinTestDataWithin = {
  twoPolygons: joinTestData.twoPolygons,
  secondTwoPolygons: joinTestDataIntersects.secondTwoPolygons,
  points: joinTestDataOverlaps.points,
  secondPoints: joinTestDataTouches.fourthPoints,
  lines: joinTestDataOverlaps.lines,
  secondLines: joinTestDataIntersects.lines
};
