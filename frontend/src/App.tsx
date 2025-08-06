import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';

let id = 0;

//  const initialNode=() => {
//   return{
//     <button
//           onClick={AddNode}
//           style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           zIndex: 10,
//           padding: '8px 12px',
//           borderRadius: '5px',
//           background: '#007bff',
//           color: 'white',
//           border: 'none',
//           cursor: 'pointer'
//         }}>
//       Add First Node
//     </button>;
//           }
//         };

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [FirstNode, setFirstNode] = useState(true);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

const AddNode = ()=>{
  const NewNode: Node = {
    id: `${id++}`,
    position:{
      x: 100,
      y: 100,
    },
      data: { label: `Novo Nó ${id - 1}`},
      type: 'default',
  };
   setNodes((nds) => [...nds, NewNode]); 
   setFirstNode(false); 
};

  return (
    <div style={{ width: '100vw', height: '100vh' }}>

       {FirstNode && (
        <button
          onClick={AddNode}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            padding: '12px 16px',
            borderRadius: '6px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Add Fist Node
        </button>
      )}

          <button
        onClick={AddNode}
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 10,
          left: 10,
          padding: '8px 12px',
          borderRadius: '5px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Add Node
      </button>


      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default App;
