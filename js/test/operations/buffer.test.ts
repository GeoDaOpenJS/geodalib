import test from 'tape';

import {initWASM, setWASM} from '../../src/init';
import {getBuffersSync, getBufferSync} from '../../src/operations/buffer';
import {DistanceUnit} from '../../src/weights/distance-based-neighbors';
import {polygons, points, lines} from '../spatial-data';

test('Test getBufferSync()', async t => {
  const geoda = await initWASM();
  setWASM(geoda);

  const bufferDistance = 1.0;
  const unit = DistanceUnit.Mile;
  const pointsPerCircle = 2;

  const bufferResults = getBufferSync(polygons[0], bufferDistance, unit, pointsPerCircle);

  const expectedPolygonBufferResult = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0.9855439686644671, 1.0000044048257513],
          [0.9855373962234686, 1.999995510963471],
          [0.9999955198064465, 2.014551149272216],
          [2.0000043736017754, 2.014557837933188],
          [2.0144693367216, 2.00000215993273],
          [2.0144627672973714, 0.9999977547648792],
          [1.9999977599035044, 0.9854420395162252],
          [1.000002131505607, 0.9854487344013106],
          [0.9855439686644671, 1.0000044048257513]
        ]
      ]
    },
    properties: {}
  };
  t.deepEqual(
    bufferResults,
    expectedPolygonBufferResult,
    'should create buffer area for 1 polygon.'
  );

  const mockupPolygonsWithNull = [null, polygons[0]];
  const polyBufferResults = getBuffersSync(
    mockupPolygonsWithNull,
    bufferDistance,
    unit,
    pointsPerCircle
  );
  t.deepEqual(
    polyBufferResults,
    [null, expectedPolygonBufferResult],
    'should create buffer area for 2 polygons.'
  );

  const pointBufferResults = getBuffersSync(points, 5, DistanceUnit.KM, pointsPerCircle);

  const expectedPointBufferResult = [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [0.044872653683921015, 0],
            [-0.02243635123016885, -0.03912115511187723],
            [-0.02243635123016885, 0.03912115511187722],
            [0.044872653683921015, 0]
          ]
        ]
      },
      properties: {}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [0.24488085338781396, 0.20000765281586413],
              [0.17756623861380616, 0.16086795814682678],
              [0.17755286145069427, 0.23912429676351485],
              [0.24488085338781396, 0.20000765281586413]
            ]
          ],
          [
            [
              [1.444917672658771, 0.4000086957614723],
              [1.3775488392708608, 0.36083537276309724],
              [1.3775334553527283, 0.439155746627378],
              [1.444917672658771, 0.4000086957614723]
            ]
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
            [11.045740452766186, 10.999695476516175],
            [10.976868840250145, 10.961011456782392],
            [10.977390715395856, 11.039287928988907],
            [11.045740452766186, 10.999695476516175]
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
            [5.445092104951444, 5.399820094213747],
            [5.3773013650847545, 5.360950111233502],
            [5.377606544038742, 5.4392272952113006],
            [5.445092104951444, 5.399820094213747]
          ]
        ]
      },
      properties: {}
    }
  ];
  t.deepEqual(
    pointBufferResults,
    expectedPointBufferResult,
    'should create buffer area for 4 points(multipoints).'
  );

  const lineBufferResults = getBuffersSync(lines, 5, DistanceUnit.KM, pointsPerCircle);

  const expectedLineBufferResult = [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [0.3999969946919939, 0.44518966631969736],
            [1.2000016281500516, 0.44521407501926297],
            [1.244913050075531, 0.39999767079982984],
            [1.1999972439665636, 0.35478592335236114],
            [1.1999972439665636, 0.35478592335236114],
            [0.40000137732868346, 0.3548103320595976],
            [0.3551125392930059, 0.39999767171972944],
            [0.3999969946919939, 0.44518966631969736]
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
            [9.483548097469146, 9.45516423425805],
            [5.432261005184163, 5.368425973566931],
            [5.368497465181404, 5.367664396069236],
            [5.367735633495972, 5.431573807935373],
            [10.968292547700038, 11.032020032682766],
            [11.03302336738274, 10.969313272619507],
            [1.4335394691730197, 0.36992152250341975],
            [1.370122751306736, 0.366235701396217],
            [1.3664603878635198, 0.4300773500960857],
            [9.483548097469146, 9.45516423425805]
          ]
        ]
      },
      properties: {}
    }
  ];

  t.deepEqual(
    lineBufferResults,
    expectedLineBufferResult,
    'should create buffer area for 2 lines.'
  );

  t.end();
});
