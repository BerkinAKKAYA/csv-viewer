import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CHART_OPTIONS } from "./constants";
import { useRef, useState } from "react";

export default function CsvViewer(props) {
  const fileInput = useRef(null);
  const [chart, setChart] = useState({});

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  function Upload() {
    const file = fileInput?.current?.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const encodedString = event.target.result;
      const parts = encodedString.split(",");
      const base64Data = parts[1];
      const decodedData = atob(base64Data);
      const csvContent = decodedData.split("\r\n").map((x) => x.split(","));
      const tableHeader = csvContent[0];
      const tableRows = csvContent.slice(1);
      console.log({ tableHeader, tableRows });
      setChart({
        labels: tableRows.map((x) => `${x[0]} - ${x[1]}}`),
        datasets: [
          {
            label: tableHeader[2],
            data: tableRows.map((x) => x[2]),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: tableHeader[3],
            data: tableRows.map((x) => x[3]),
            borderColor: "rgba(99, 255, 149)",
            backgroundColor: "rgba(99, 255, 149, 0.5)",
          },
        ],
      });
    });
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <fieldset style={{ maxWidth: 500, margin: "40px auto", padding: 10 }}>
        <legend>CSV:</legend>
        <input
          type="file"
          style={{ marginBottom: 20 }}
          ref={fileInput}
          accept=".csv"
        />
        <button
          style={{ display: "block", padding: 10, width: 200 }}
          onClick={Upload}
        >
          Yükle
        </button>
      </fieldset>
      <hr />

      {chart.labels?.length > 0 && (
        <Line options={CHART_OPTIONS} data={chart} />
      )}
    </div>
  );
}
