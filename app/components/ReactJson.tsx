import type { FC } from 'react';

const ReactJson: FC<any> = (props) => (
  <small>{JSON.stringify({ ...props }, null, 2)}</small>
);

export default ReactJson;
