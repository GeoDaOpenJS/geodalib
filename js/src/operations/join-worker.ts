import {runSpatialJoin, SpatialJoinResult, SpatialJoinType} from './join';
import type {CustomEmbindModule} from '../../wasm';
// @ts-expect-error - TS doesn't seem to like .cjs working alongside .d.ts
import geodaAny from '../../wasm/index.cjs';
import {GeometryInput} from '../features/geometry';

const geoda: () => Promise<CustomEmbindModule> = geodaAny;

/**
 * The result return from a web worker of spatial join
 */
export type SpatialJoinWorkerOutput = {
  id: number;
  result: SpatialJoinResult;
};

/**
 * The input for a web worker of spatial join
 */
export type SpatialJoinWorkerInput = {
  id: number;
  source: GeometryInput;
  join: GeometryInput;
  spatialJoinOperation: SpatialJoinType;
  start: number;
  end: number;
};

// Respond to message from parent thread
addEventListener('message', (event: MessageEvent<SpatialJoinWorkerInput>) => {
  const {id, source, join, spatialJoinOperation, start, end} = event.data;

  // worker has it's own geoda WASM instance, so don't use loadWASM() here
  // NOTE: can't do `const wasmInstance = await geoda();` here, because it raises
  // "Uncaught ReferenceError: regeneratorRuntime is not defined" error, and adding
  // "@babel/plugin-transform-runtime" couldn't solve it
  geoda().then(wasmInstance => {
    const joinRelation = runSpatialJoin(
      source,
      join,
      spatialJoinOperation,
      wasmInstance,
      start,
      end
    );

    const result = joinRelation ?? [];
    const output: SpatialJoinWorkerOutput = {result, id};

    // return result
    postMessage(output);

    // close worker
    self.close();
  });
});
