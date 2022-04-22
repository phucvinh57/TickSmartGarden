import * as React from "react";
import { DataTable } from "react-native-paper";
import { makeChunks } from '../../components/SliderList/util'


function inferTableLabel(offset, currPageLength, totalLength) {
  return `${offset + 1}-${offset + currPageLength} of ${totalLength}`;
}

const LogTable = ({ itemsPerPage, data, onPageChange }) => {
  console.log(`LogTable({ ${itemsPerPage}, ${data} })`)
  const [chunks, setChunks] = React.useState([[]]);
  const [currPage, setCurrPage] = React.useState(0);
  const [tableLabel, setTableLabel] = React.useState("");

  const handlePageChange = (pageIndex) => {
    setCurrPage(pageIndex)
    onPageChange && onPageChange()
  }
  
  React.useEffect(() => {
    setCurrPage(0);
  }, [itemsPerPage]);

  React.useEffect(() => {
    setChunks(makeChunks(data, itemsPerPage))
  }, [itemsPerPage, data])

  React.useEffect(() => {
    setTableLabel(
      inferTableLabel(
        currPage * itemsPerPage,
        chunks[currPage].length,
        data.length
      )
    );
  }, [itemsPerPage, data, currPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Thời gian</DataTable.Title>
        <DataTable.Title>Hoạt động</DataTable.Title>
      </DataTable.Header>

      {chunks[currPage].map(({ time, activity }, index) => (
        <DataTable.Row key={`Row_${index}`}>
          <DataTable.Cell>{time}</DataTable.Cell>
          <DataTable.Cell>{activity}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={currPage}
        numberOfPages={chunks.length}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        optionsPerPage={3}
        label={tableLabel}
      />
    </DataTable>
  );
};

export default LogTable;
