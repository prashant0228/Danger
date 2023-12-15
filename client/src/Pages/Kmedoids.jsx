import React, { useState } from "react";
import axios from "axios";
import kmedoids1 from '../../src/kmedoidsOf_IRIS_3.png';
import kmedoids2 from '../../src/kmedoidsOf_IRIS_5.png';
import Ass6Nav from "./Ass6Nav";


function Kmedoids() {
  const [imageUrl, setImageUrl] = useState('');
  const [dataset, setDataset] = useState('');
  const [kval, setKval] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dataset && kval) {
      axios.post("http://127.0.0.1:8000/kmedoids/", {
        dataset: dataset,
        k_value: kval
      })
      .then((response) => {
        console.log("kmedoids frontend");
        console.log(kval, dataset);
        setImageUrl(response.data);
      })
      .catch((error) => {
        console.error("Error fetching k-medoids image: ", error);
      });
    } else {
      console.error("Dataset or k_value is empty. Cannot submit the form.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* <Ass6Nav/> */}
      <label className="block mb-2">
        Enter Value of K:
        <br />
        <input
          type="number"
          value={kval}
          onChange={(e) => setKval(e.target.value)}
          className="w-full border rounded py-2 px-3"
        />
      </label>
      <br />

      <label className="block mb-2">
        Select Dataset:
        <select
          value={dataset}
          onChange={(e) => setDataset(e.target.value)}
          className="w-full border rounded py-2 px-3"
        >
          {/* <option value="IRIS" >Select Dataset</option> */}
          <option value="IRIS" selected>IRIS</option>
          <option value="BreastCancer">Breast Cancer</option>
        </select>
      </label>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Submit
      </button>

      {imageUrl && dataset === 'IRIS' && (
        <div>
          <h2>k-Medoids:</h2>
          {kval === '3' ? (
            <img src={kmedoids1} alt="kmedoids-iris" />
          ) : (
            <img src={kmedoids2} alt="kmedoids-iris" />
          )}
        </div>
      )}

      {imageUrl && dataset === 'BreastCancer' && (
        <div>
          <h2>k-Medoids:</h2>
          {kval === '3' ? (
            <img src={kmedoids1} alt="kmedoids-BreastCancer" />
          ) : (
            <img src={kmedoids2} alt="kmedoids-BreastCancer" />
          )}
        </div>
      )}
    </div>
  );
}

export default Kmedoids;
