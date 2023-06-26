import React, { useMemo, useContext } from 'react';
import { DataGridPro, GridColDef, DataGridProProps, GridValidRowModel } from '@mui/x-data-grid-pro';
import { NodeContext, AuthContext } from '@context/index';
import { buildTree, convertToMuiGridRows } from '@utils/tree';
import { editNode, nodeEditRequesting } from '@store/node/actions';
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
      width: 300,
      editable: true
    }
  ];

  const getTreeDataPath: DataGridProProps['getTreeDataPath'] = (row) => row.hierarchy;

  const handleRowSelection = (e, b) => {
    console.log(e);
    console.log(b);
  };

  const processRowUpdate = async (updatedRow: GridValidRowModel, originalRow: GridValidRowModel) => {
    if (!auth.token) return originalRow;

    dispatch(nodeEditRequesting({}));
    const response = await editNode({ id: updatedRow.id, name: updatedRow.name }, auth.token);
    dispatch(response);
    if (!response.payload.error) {
      return updatedRow;
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center home-page" data-testid="home-page">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <DataGridPro
            treeData
            editMode="row"
            rows={rows}
            columns={columns}
            getTreeDataPath={getTreeDataPath}
            processRowUpdate={processRowUpdate}
            onRowSelectionModelChange={handleRowSelection}
            sx={{ color: 'inherit' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
