import React, { useMemo, useContext } from 'react';
import { DataGridPro, GridColDef, DataGridProProps, GridValidRowModel } from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import { NodeContext, AuthContext } from '@context/index';
import { buildTree, convertToMuiGridRows } from '@utils/tree';
import { editNode, nodeEditRequesting, addNode, nodePostRequesting } from '@store/node/actions';
import './styles.scss';
/**
 * Home page.
 * @returns {React.FC} Page with Nodes MUI table.
 */
const Home: React.FC = () => {
  const {
    node: { nodes },
    dispatch
  } = useContext(NodeContext);
  const { auth } = useContext(AuthContext);
  const tree = useMemo(() => buildTree(nodes), [nodes]);
  const rows = useMemo(() => convertToMuiGridRows(tree), [tree]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 100,
      editable: true
    }
  ];

  const getTreeDataPath: DataGridProProps['getTreeDataPath'] = (row) => row.hierarchy;

  const processRowUpdate = async (updatedRow: GridValidRowModel, originalRow: GridValidRowModel) => {
    if (!auth.token) return originalRow;

    dispatch(nodeEditRequesting({}));
    const response = await editNode({ id: updatedRow.id, name: updatedRow.name }, auth.token);
    dispatch(response);
    if (!response.payload.error) {
      return updatedRow;
    }
  };

  const handleChildAdd = async (parentId: number | null) => {
    if (!auth.token) return;

    dispatch(nodePostRequesting({}));
    const response = await addNode({ parentId, name: 'Name' }, auth.token);
    dispatch(response);
  };

  return (
    <div className="vh-100 d-flex align-items-center home-page" data-testid="home-page">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <Box sx={{ height: 400, pt: 5, width: '100%' }}>
            <DataGridPro
              treeData
              editMode="row"
              rows={rows}
              columns={columns}
              getTreeDataPath={getTreeDataPath}
              processRowUpdate={processRowUpdate}
              disableChildrenFiltering={true}
              onCellDoubleClick={({ field, id }) => field === '__tree_data_group__' && handleChildAdd(Number(id))}
              onColumnHeaderDoubleClick={() => handleChildAdd(null)}
              sx={{ color: 'inherit' }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Home;
