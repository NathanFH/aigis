import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import '../src/assets/CustomNode.css';
import './Header.css';
import Header from "./Header"; 
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge as rfAddEdge,
  type Node,
   type Connection,
  type Edge,
  type NodeChange,
  type EdgeChange,
  //ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

let id = 0;

function CustomNode({ data, selected }: NodeProps) {
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (data.onDescriptionChange) {
      data.onDescriptionChange(e.target.value);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className={`custom-node ${selected ? 'selected' : ''}`}>
        {data.label}
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
      </div>

     <input
        type="text"
        value={data.description || ''}
        onChange={handleDescriptionChange}
        placeholder="Text"
        style={{
          marginTop: 6,
          width: '100%',
          fontSize: 12,
          padding: 0,
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          textAlign: 'center',
          color: '#FFFF',
          cursor: 'text',
        }}
      />
    </div>
  );
}

const nodeTypes = { custom: CustomNode };


function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [FirstNode, setFirstNode] = useState(true);



  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

     const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = { ...params, id: `e-${params.source}-${params.target}` };
      setEdges((eds) => rfAddEdge(newEdge, eds));
    },
    [setEdges]
  );


const AddNode = () => {
  const nodeId = `${id++}`; 

  const NewNode: Node = {
    id: nodeId,
    position: {
      x: 100,
      y: 100,
    },
    data: {
      label: `New Node ${id - 1}`,
      description: '',
      onDescriptionChange: (newDesc: string) => {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === nodeId
              ? { ...n, data: { ...n.data, description: newDesc } }
              : n
          )
        );
      },
    },
    type: 'custom',
  };

  setNodes((nds) => [...nds, NewNode]);
  setFirstNode(false);
};

 const deleteNode = () => {
    const selectedNodes = nodes.filter((node) => node.selected);
    const selectedEdges = edges.filter((edge) => edge.selected);

    if (selectedNodes.length === 0 && selectedEdges.length === 0) {
  
      console.warn("Por favor, selecione um nó ou uma aresta para deletar.");
      return;
    }

    const nodeIdsToDelete = new Set(selectedNodes.map(node => node.id));

    setNodes((currentNodes) => currentNodes.filter((node) => !nodeIdsToDelete.has(node.id)));
    

    setEdges((currentEdges) => currentEdges.filter((edge) => {
        const isConnectedToDeletedNode = nodeIdsToDelete.has(edge.source) || nodeIdsToDelete.has(edge.target);
        const isSelectedEdge = selectedEdges.some(selected => selected.id === edge.id);
        return !isConnectedToDeletedNode && !isSelectedEdge;
    }));
  };


  return (
    <div style={{ width: '100%', height: '100vh' }}>
    <Header />

    <div style={{ marginTop: '60px', position: 'relative', height: 'calc(100vh - 60px)' }}>
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
            background: '#03d69d',
            color: 'white',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Add Fist Node
        </button>
      )}

      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 15,
          left: 15,
          display: 'flex',
          gap: '10px',
        }}
      >
        <button
          onClick={AddNode}
          style={{
            padding: '8px 12px',
            borderRadius: '5px',
            background: '#03d69d',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Adicionar Nó
        </button>
        <button
          onClick={deleteNode}
          style={{
            padding: '8px 12px',
            borderRadius: '5px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Deletar Selecionado
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        deleteKeyCode={['Backspace', 'Delete']}
      >
        <Controls />
        <MiniMap
        position="bottom-right" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  </div>
  );
}



export default App;
