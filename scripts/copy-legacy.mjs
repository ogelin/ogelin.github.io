import { cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const output = resolve(root, 'dist');
const chapters = [
  '01 - Select et Append', '02 - Basic SVG shapes', '03 - Visualizing data',
  '04 - Scales', '05 - Groups and Axes', '06 - Enter Update Exit',
  '07 - Transitions', '08 - Working with Arrays', '09 - Loading External Datas',
  '10 - Paths', '11 - Arcs & Pie Layout', '12 - Tree & Cluster Layout',
  '13 - Pack & Bubble Layout', '14 - Histogram Layout', '15 - Treemap Layout',
  '16 - Maps in D3',
];

await Promise.all(chapters.map((chapter) =>
  cp(resolve(root, chapter), resolve(output, chapter), { recursive: true })
));
await mkdir(resolve(output, 'd3'), { recursive: true });
await cp(resolve(root, 'index.html'), resolve(output, 'index.html'));
await cp(resolve(root, 'index.html'), resolve(output, 'd3/index.html'));
console.log(`Preserved ${chapters.length} legacy D3 chapters in dist.`);
